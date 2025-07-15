// src/pages/ShipmentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SellerLayout from '../components/layout/SellerLayout';
import { getShipment } from '../services/shipmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';

const ShipmentDetails = () => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        setLoading(true);
        const response = await getShipment(id);
        setShipment(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShipmentDetails();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!shipment) {
    return <div className="error-message">Shipment not found.</div>;
  }

  return (
    <SellerLayout>
      <h2>Shipment Details</h2>
      <div className="shipment-details-container">
        <div className="detail-item">
          <span className="label">Tracking ID:</span>
          <span className="value">{shipment.id}</span>
        </div>
        <div className="detail-item">
          <span className="label">Customer:</span>
          <span className="value">{shipment.customerName}</span>
        </div>
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{new Date(shipment.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span className="value">{shipment.status.toUpperCase()}</span>
        </div>
        <div className="detail-item">
          <span className="label">Amount:</span>
          <span className="value">{`$${shipment.totalAmount.toFixed(2)}`}</span>
        </div>
        <div className="detail-item">
          <span className="label">Origin:</span>
          <span className="value">{shipment.originAddress}</span>
        </div>
        <div className="detail-item">
          <span className="label">Destination:</span>
          <span className="value">{shipment.destinationAddress}</span>
        </div>
        <div className="detail-item">
          <span className="label">Items:</span>
          <ul>
            {shipment.items.map((item, index) => (
              <li key={index}>
                {item.name} (Qty: {item.quantity}, Price: ${item.price.toFixed(2)}, Weight: {item.weight}kg)
              </li>
            ))}
          </ul>
        </div>
        <div className="action-buttons">
          <button onClick={() => navigate(`/edit/${id}`)}>
            <FontAwesomeIcon icon={faEdit} /> Edit Shipment
          </button>
          <button onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} /> Print Details
          </button>
        </div>
      </div>
    </SellerLayout>
  );
};

export default ShipmentDetails;