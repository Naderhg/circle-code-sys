// src/pages/ShipmentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SellerLayout from '../components/Layout/sellerLayout';
import { getShipment } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint, faBarcode, faFileInvoice, faCalendarAlt, faBoxOpen, faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Barcode from 'react-barcode';
import '../assets/styles/shipmentdetails.css';

const ShipmentDetails = () => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentDate] = useState(new Date());

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

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!shipment) {
    return <div className="error-message">Shipment not found.</div>;
  }

  // Calculate product totals
  const productsCost = shipment.productsCost || 
    (shipment.items ? shipment.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0) : 0);
  const deliveryCost = shipment.deliveryCost || 10; // Default delivery cost if not provided
  const totalCost = shipment.amount || productsCost + deliveryCost;

  // Format address
  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return address;
  };

  // Format sender information
  const sender = shipment.sender || {
    name: 'Circle Delivery Co.',
    phone: '+1 (555) 123-4567',
    email: 'info@circledelivery.com',
    address: '123 Main St, City, Country'
  };

  // Format receiver information
  const receiver = shipment.receiver || {
    name: shipment.customerName || 'Customer',
    phone: 'N/A',
    email: 'N/A',
    addressLine1: shipment.destinationAddress || 'N/A'
  };

  return (
    <SellerLayout>
      <h2>Shipment Details</h2>
      
      <div className="action-buttons" style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate(`/edit/${id}`)}>
          <FontAwesomeIcon icon={faEdit} /> Edit Shipment
        </button>
        <button onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} /> Print Bill of Lading
        </button>
      </div>
      
      {/* Bill of Lading - this will be visible both on screen and when printing */}
      <div className="bill-of-lading">
        <div className="bill-header">
          <div className="company-info">
            <h3>Circle Delivery</h3>
            <p>Fast & Reliable Shipping</p>
          </div>
          <div className="bill-title">Bill of Lading</div>
          <div className="bill-date">
            <div>Date: {currentDate.toLocaleDateString()}</div>
            <div>Time: {currentDate.toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="barcode-container">
          <Barcode value={shipment.id} width={1.5} height={50} fontSize={14} />
          <span className="shipment-id">Tracking ID: {shipment.id}</span>
        </div>

        <div className="bill-info">
          <div className="bill-info-section">
            <h3><FontAwesomeIcon icon={faUser} /> Sender Information</h3>
            <div className="bill-info-row">
              <span className="bill-info-label">Name:</span>
              <span className="bill-info-value">{sender.name}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Phone:</span>
              <span className="bill-info-value">{sender.phone}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Email:</span>
              <span className="bill-info-value">{sender.email}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Address:</span>
              <span className="bill-info-value">{formatAddress(sender.address)}</span>
            </div>
          </div>

          <div className="bill-info-section">
            <h3><FontAwesomeIcon icon={faUser} /> Receiver Information</h3>
            <div className="bill-info-row">
              <span className="bill-info-label">Name:</span>
              <span className="bill-info-value">{receiver.name}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Phone:</span>
              <span className="bill-info-value">{receiver.phone}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Email:</span>
              <span className="bill-info-value">{receiver.email}</span>
            </div>
            <div className="bill-info-row">
              <span className="bill-info-label">Address:</span>
              <span className="bill-info-value">{formatAddress(receiver.addressLine1)}</span>
            </div>
          </div>
        </div>

        <div className="bill-info-section">
          <h3><FontAwesomeIcon icon={faBoxOpen} /> Shipment Details</h3>
          <div className="bill-info-row">
            <span className="bill-info-label">Status:</span>
            <span className="bill-info-value">{shipment.status ? shipment.status.toUpperCase() : 'PENDING'}</span>
          </div>
          <div className="bill-info-row">
            <span className="bill-info-label">Created Date:</span>
            <span className="bill-info-value">{new Date(shipment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h3><FontAwesomeIcon icon={faBoxOpen} /> Products</h3>
        <table className="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {shipment.items ? (
              shipment.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name || 'Product'}</td>
                  <td>{item.quantity || 0}</td>
                  <td>${(item.price || 0).toFixed(2)}</td>
                  <td>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="costs-summary">
          <div className="costs-row">
            <span>Products Cost:</span>
            <span>${productsCost.toFixed(2)}</span>
          </div>
          <div className="costs-row">
            <span>Delivery Cost:</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
          <div className="costs-row total">
            <span>Total Cost:</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-box">
            <div className="signature-line">Sender's Signature</div>
          </div>
          <div className="signature-box">
            <div className="signature-line">Receiver's Signature</div>
          </div>
        </div>

        <div className="terms-conditions">
          <p><strong>Terms and Conditions:</strong> This bill of lading is subject to the standard terms and conditions of Circle Delivery. 
          The shipper certifies that the contents of this consignment are properly identified, packaged, and labeled. 
          Circle Delivery is not liable for any damages or delays caused by circumstances beyond our control.</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default ShipmentDetails;