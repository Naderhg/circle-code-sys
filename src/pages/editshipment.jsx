// src/pages/EditShipment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SellerLayout from '../components/Layout/sellerLayout';
import { getShipment, updateShipment } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faPlus, 
  faBox, 
  faUser, 
  faMapMarkerAlt, 
  faTruck,
  faEdit,
  faInfoCircle,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/editshipment.css';

const EditShipment = () => {
  const [shipmentData, setShipmentData] = useState({
    customerName: '',
    status: 'pending',
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
    items: [
      { name: '', quantity: 1, price: 0, weight: 0 }
    ],
    productsCost: 0,
    deliveryCost: 10,
    amount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        setLoading(true);
        const response = await getShipment(id);
        
        // Ensure data has all required fields
        const shipmentWithDefaults = {
          ...shipmentData, // Default values
          ...response.data, // API data
          sender: {
            ...shipmentData.sender,
            ...(response.data.sender || {})
          },
          receiver: {
            ...shipmentData.receiver,
            ...(response.data.receiver || {}),
            name: response.data.customerName || '',
          },
          // Ensure items array exists
          items: response.data.items || [{ name: '', quantity: 1, price: 0, weight: 0 }],
          // Ensure cost fields exist
          productsCost: response.data.productsCost || 0,
          deliveryCost: response.data.deliveryCost || 10
        };
        
        setShipmentData(shipmentWithDefaults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShipmentData();
  }, [id]);

  // Handle input changes for basic fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for nested objects (sender and receiver)
  const handleContactChange = (section, field, value) => {
    setShipmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle item change in products
  const handleItemChange = (index, field, value) => {
    const newItems = [...shipmentData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate product totals
    const productsCost = newItems.reduce((sum, item) => {
      return sum + ((item.quantity || 0) * (item.price || 0));
    }, 0);
    
    setShipmentData(prev => ({
      ...prev,
      items: newItems,
      productsCost: productsCost,
      amount: productsCost + (prev.deliveryCost || 10)
    }));
  };

  // Add a new item row
  const handleAddItem = () => {
    setShipmentData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0, weight: 0 }]
    }));
  };

  // Remove an item row
  const handleRemoveItem = (index) => {
    if (shipmentData.items.length <= 1) {
      return; // Prevent removing the last item
    }
    
    const newItems = shipmentData.items.filter((_, i) => i !== index);
    
    // Recalculate product totals
    const productsCost = newItems.reduce((sum, item) => {
      return sum + ((item.quantity || 0) * (item.price || 0));
    }, 0);
    
    setShipmentData(prev => ({
      ...prev,
      items: newItems,
      productsCost: productsCost,
      amount: productsCost + (prev.deliveryCost || 10)
    }));
  };

  // Update delivery cost
  const handleDeliveryCostChange = (value) => {
    const deliveryCost = parseFloat(value) || 0;
    setShipmentData(prev => ({
      ...prev,
      deliveryCost: deliveryCost,
      amount: prev.productsCost + deliveryCost
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Make sure receiver name is synced with customer name
      const updatedData = {
        ...shipmentData,
        receiver: {
          ...shipmentData.receiver,
          name: shipmentData.customerName
        }
      };
      
      await updateShipment(id, updatedData);
      navigate('/shipments');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <SellerLayout>
      <div className="edit-shipment-container">
        <div className="form-header">
          <FontAwesomeIcon icon={faEdit} /> Edit Shipment #{shipmentData.id}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-sections">
            {/* Shipment Info Section */}
            <div className="form-section">
              <div className="section-title">
                <FontAwesomeIcon icon={faInfoCircle} /> Shipment Information
              </div>
              
              <div className="form-group">
                <label htmlFor="customerName">Customer Name*</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className="form-control"
                  value={shipmentData.customerName || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  className="form-control"
                  value={shipmentData.status || 'pending'}
                  onChange={handleInputChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>
            
            {/* Sender Information */}
            <div className="form-section">
              <div className="section-title">
                <FontAwesomeIcon icon={faUser} /> Sender Information
              </div>
              
              <div className="form-group">
                <label htmlFor="senderName">Name*</label>
                <input
                  type="text"
                  id="senderName"
                  className="form-control"
                  value={shipmentData.sender?.name || ''}
                  onChange={(e) => handleContactChange('sender', 'name', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senderPhone">Phone*</label>
                <input
                  type="tel"
                  id="senderPhone"
                  className="form-control"
                  value={shipmentData.sender?.phone || ''}
                  onChange={(e) => handleContactChange('sender', 'phone', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senderEmail">Email</label>
                <input
                  type="email"
                  id="senderEmail"
                  className="form-control"
                  value={shipmentData.sender?.email || ''}
                  onChange={(e) => handleContactChange('sender', 'email', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senderAddress">Address*</label>
                <textarea
                  id="senderAddress"
                  className="form-control"
                  value={shipmentData.sender?.address || ''}
                  onChange={(e) => handleContactChange('sender', 'address', e.target.value)}
                  rows="3"
                  required
                />
              </div>
            </div>
            
            {/* Receiver Information */}
            <div className="form-section">
              <div className="section-title">
                <FontAwesomeIcon icon={faUser} /> Receiver Information
              </div>
              
              <div className="form-group">
                <label htmlFor="receiverPhone">Phone*</label>
                <input
                  type="tel"
                  id="receiverPhone"
                  className="form-control"
                  value={shipmentData.receiver?.phone || ''}
                  onChange={(e) => handleContactChange('receiver', 'phone', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="receiverEmail">Email</label>
                <input
                  type="email"
                  id="receiverEmail"
                  className="form-control"
                  value={shipmentData.receiver?.email || ''}
                  onChange={(e) => handleContactChange('receiver', 'email', e.target.value)}
                />
              </div>
            </div>
            
            {/* Delivery Address */}
            <div className="form-section">
              <div className="section-title">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Delivery Address
              </div>
              
              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1*</label>
                <input
                  type="text"
                  id="addressLine1"
                  className="form-control"
                  value={shipmentData.receiver?.addressLine1 || ''}
                  onChange={(e) => handleContactChange('receiver', 'addressLine1', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  className="form-control"
                  value={shipmentData.receiver?.addressLine2 || ''}
                  onChange={(e) => handleContactChange('receiver', 'addressLine2', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  value={shipmentData.receiver?.city || ''}
                  onChange={(e) => handleContactChange('receiver', 'city', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State/Province*</label>
                <input
                  type="text"
                  id="state"
                  className="form-control"
                  value={shipmentData.receiver?.state || ''}
                  onChange={(e) => handleContactChange('receiver', 'state', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">Zip/Postal Code*</label>
                <input
                  type="text"
                  id="zipCode"
                  className="form-control"
                  value={shipmentData.receiver?.zipCode || ''}
                  onChange={(e) => handleContactChange('receiver', 'zipCode', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country*</label>
                <select
                  id="country"
                  className="form-control"
                  value={shipmentData.receiver?.country || ''}
                  onChange={(e) => handleContactChange('receiver', 'country', e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="EG">Egypt</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="products-section">
            <div className="section-title">
              <FontAwesomeIcon icon={faBox} /> Products
            </div>
            
            <table className="products-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Product Name</th>
                  <th style={{ width: '15%' }}>Quantity</th>
                  <th style={{ width: '15%' }}>Price ($)</th>
                  <th style={{ width: '15%' }}>Weight (kg)</th>
                  <th style={{ width: '15%' }}>Total</th>
                  <th style={{ width: '5%' }}></th>
                </tr>
              </thead>
              <tbody>
                {shipmentData.items && shipmentData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product name"
                        value={item.name || ''}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10) || 0)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        step="0.01"
                        value={item.price || 0}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        step="0.1"
                        value={item.weight || 0}
                        onChange={(e) => handleItemChange(index, 'weight', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </td>
                    <td>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleRemoveItem(index)}
                        disabled={shipmentData.items.length <= 1}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button
              type="button"
              className="add-item-btn"
              onClick={handleAddItem}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button>
            
            <div className="costs-summary">
              <div className="cost-row">
                <span>Products Cost:</span>
                <span>${shipmentData.productsCost?.toFixed(2)}</span>
              </div>
              <div className="cost-row">
                <span>Delivery Cost:</span>
                <span>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    step="0.01"
                    style={{ width: '80px', display: 'inline-block' }}
                    value={shipmentData.deliveryCost || 0}
                    onChange={(e) => handleDeliveryCostChange(e.target.value)}
                  />
                </span>
              </div>
              <div className="cost-row total">
                <span>Total Cost:</span>
                <span>${shipmentData.amount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="action-buttons">
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </SellerLayout>
  );
};

export default EditShipment;