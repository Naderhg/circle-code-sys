// src/pages/CreateShipment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '../components/Layout/sellerLayout';
import { createShipment } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faMapMarkerAlt, 
  faBoxOpen, 
  faPlus, 
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/createshipment.css';

const CreateShipment = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    sender: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    receiver: {
      name: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    products: [
      { name: '', quantity: 1, price: 0, total: 0 }
    ],
    grandTotal: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle input changes for sender and receiver fields
  const handleContactChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };
  
  // Handle product row changes
  const handleProductChange = (index, field, value) => {
    const newProducts = [...formData.products];
    
    // Update the field
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    };
    
    // Recalculate total for this product
    if (field === 'quantity' || field === 'price') {
      const qty = field === 'quantity' ? value : newProducts[index].quantity;
      const price = field === 'price' ? value : newProducts[index].price;
      newProducts[index].total = qty * price;
    }
    
    // Update products and recalculate grand total
    const grandTotal = newProducts.reduce((sum, product) => sum + product.total, 0);
    
    setFormData(prevData => ({
      ...prevData,
      products: newProducts,
      grandTotal
    }));
  };
  
  // Add a new product row
  const addProductRow = () => {
    setFormData(prevData => ({
      ...prevData,
      products: [
        ...prevData.products,
        { name: '', quantity: 1, price: 0, total: 0 }
      ]
    }));
  };
  
  // Remove a product row
  const removeProductRow = (index) => {
    if (formData.products.length === 1) {
      // Don't remove the last row, just clear it
      const clearedProducts = [{ name: '', quantity: 1, price: 0, total: 0 }];
      setFormData(prevData => ({
        ...prevData,
        products: clearedProducts,
        grandTotal: 0
      }));
      return;
    }
    
    const newProducts = formData.products.filter((_, i) => i !== index);
    const grandTotal = newProducts.reduce((sum, product) => sum + product.total, 0);
    
    setFormData(prevData => ({
      ...prevData,
      products: newProducts,
      grandTotal
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Format data for API
      const shipmentData = {
        customerName: formData.receiver.name,
        amount: formData.grandTotal,
        status: 'pending',
        sender: formData.sender,
        receiver: formData.receiver,
        products: formData.products
      };
      
      // Submit to API
      const response = await createShipment(shipmentData);
      
      // Redirect to shipments page on success
      navigate('/shipments', { state: { message: 'Shipment created successfully' } });
    } catch (err) {
      setError('Failed to create shipment. Please try again.');
      console.error('Shipment creation error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SellerLayout>
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <form id="shipmentForm" onSubmit={handleSubmit}>
        {/* Sender Information */}
        <div className="form-section-header">
          <FontAwesomeIcon icon={faUser} /> Sender Information
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="senderName">Name*</label>
              <input 
                type="text" 
                id="senderName" 
                value={formData.sender.name}
                onChange={(e) => handleContactChange('sender', 'name', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="senderPhone">Phone Number*</label>
              <input 
                type="tel" 
                id="senderPhone" 
                value={formData.sender.phone}
                onChange={(e) => handleContactChange('sender', 'phone', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="senderEmail">Email Address</label>
              <input 
                type="email" 
                id="senderEmail"
                value={formData.sender.email}
                onChange={(e) => handleContactChange('sender', 'email', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="senderAddress">Address*</label>
              <input 
                type="text" 
                id="senderAddress" 
                value={formData.sender.address}
                onChange={(e) => handleContactChange('sender', 'address', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Receiver Information */}
        <div className="form-section-header">
          <FontAwesomeIcon icon={faUser} /> Receiver Information
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="receiverName">Name*</label>
              <input 
                type="text" 
                id="receiverName" 
                value={formData.receiver.name}
                onChange={(e) => handleContactChange('receiver', 'name', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="receiverPhone">Phone Number*</label>
              <input 
                type="tel" 
                id="receiverPhone" 
                value={formData.receiver.phone}
                onChange={(e) => handleContactChange('receiver', 'phone', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="receiverEmail">Email Address</label>
              <input 
                type="email" 
                id="receiverEmail"
                value={formData.receiver.email}
                onChange={(e) => handleContactChange('receiver', 'email', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="form-section-header">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Delivery Address
        </div>
        <div className="form-section-content">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="addressLine1">Address Line 1*</label>
              <input 
                type="text" 
                id="addressLine1" 
                value={formData.receiver.addressLine1}
                onChange={(e) => handleContactChange('receiver', 'addressLine1', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input 
                type="text" 
                id="addressLine2"
                value={formData.receiver.addressLine2}
                onChange={(e) => handleContactChange('receiver', 'addressLine2', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City*</label>
              <input 
                type="text" 
                id="city" 
                value={formData.receiver.city}
                onChange={(e) => handleContactChange('receiver', 'city', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="state">State/Province*</label>
              <input 
                type="text" 
                id="state" 
                value={formData.receiver.state}
                onChange={(e) => handleContactChange('receiver', 'state', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="zipCode">Zip/Postal Code*</label>
              <input 
                type="text" 
                id="zipCode" 
                value={formData.receiver.zipCode}
                onChange={(e) => handleContactChange('receiver', 'zipCode', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="country">Country*</label>
              <select 
                id="country" 
                value={formData.receiver.country}
                onChange={(e) => handleContactChange('receiver', 'country', e.target.value)}
                required
              >
                <option value="">Select Country</option>
                <option value="EG">Egypt</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="form-section-header">
          <FontAwesomeIcon icon={faBoxOpen} /> Shipment Details
        </div>
        <div className="form-section-content">
          <div className="shipment-table-container">
            <table className="shipment-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Number of Pieces</th>
                  <th>Price per Piece</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="productTableBody">
                {formData.products.map((product, index) => (
                  <tr key={index} id={`productRow-${index + 1}`}>
                    <td>
                      <input 
                        type="text" 
                        className="product-name" 
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="product-qty" 
                        min="1" 
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10) || 0)}
                        required
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="product-price" 
                        min="0" 
                        step="0.01" 
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </td>
                    <td className="product-total">
                      ${product.total.toFixed(2)}
                    </td>
                    <td>
                      <button 
                        type="button" 
                        className="delete-btn"
                        onClick={() => removeProductRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: "right" }}>Grand Total:</td>
                  <td id="grandTotal">${formData.grandTotal.toFixed(2)}</td>
                  <td>
                    <button 
                      type="button" 
                      id="addProductBtn" 
                      className="add-btn"
                      onClick={addProductRow}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Form Submit Buttons */}
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/shipments')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </SellerLayout>
  );
};

export default CreateShipment;