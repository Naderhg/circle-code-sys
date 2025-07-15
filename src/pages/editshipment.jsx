// src/pages/EditShipment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SellerLayout from '../components/layout/sellerlayout';
import { getShipment, updateShipment } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const EditShipment = () => {
  const [shipmentData, setShipmentData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    originAddress: '',
    destinationAddress: '',
    items: [
      { name: '', quantity: 1, price: 0, weight: 0 }
    ],
    totalAmount: 0,
    status: 'pending'
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
        setShipmentData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShipmentData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...shipmentData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setShipmentData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleAddItem = () => {
    setShipmentData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0, weight: 0 }]
    }));
  };

  const handleRemoveItem = (index) => {
    setShipmentData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    shipmentData.items.forEach(item => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const shipment = {
        ...shipmentData,
        totalAmount: calculateTotalAmount()
      };
      await updateShipment(id, shipment);
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
      <h2>Edit Shipment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={shipmentData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerEmail">Customer Email</label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={shipmentData.customerEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerPhone">Customer Phone</label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={shipmentData.customerPhone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="originAddress">Origin Address</label>
          <textarea
            id="originAddress"
            name="originAddress"
            value={shipmentData.originAddress}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationAddress">Destination Address</label>
          <textarea
            id="destinationAddress"
            name="destinationAddress"
            value={shipmentData.destinationAddress}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label>Items</label>
          {shipmentData.items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                required
              />
              <input
                type="number"
                placeholder="Weight"
                value={item.weight}
                onChange={(e) => handleItemChange(index, 'weight', parseFloat(e.target.value))}
                required
              />
              <button type="button" onClick={() => handleRemoveItem(index)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddItem} className="add-item-btn">
          {/* eslint-disable-next-line no-undef */}
          <FontAwesomeIcon icon={faPlus} /> Add Item
        </button>
        <div className="form-group">
          <label>Total Amount</label>
          <input type="text" value={`$${shipmentData.totalAmount.toFixed(2)}`} readOnly />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={shipmentData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => navigate('/shipments')} className="cancel-btn">
          Cancel
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </SellerLayout>
  );
};

export default EditShipment;