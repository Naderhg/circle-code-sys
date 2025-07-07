/**
 * Shipment Model
 * Represents the data structure for shipments as returned by the API
 */
class ShipmentModel {
    constructor(data = {}) {
        this.id = data.id || '';
        this.trackingNumber = data.trackingNumber || '';
        this.customerName = data.customerName || '';
        this.customerPhone = data.customerPhone || '';
        this.customerEmail = data.customerEmail || '';
        this.customerAddress = data.customerAddress || '';
        this.merchantId = data.merchantId || '';
        this.merchant = data.merchant || null;
        this.agentId = data.agentId || '';
        this.agent = data.agent || null;
        this.zoneId = data.zoneId || '';
        this.zone = data.zone || null;
        this.items = data.items || [];
        this.packageDetails = {
            weight: data.packageDetails?.weight || 0,
            dimensions: data.packageDetails?.dimensions || { length: 0, width: 0, height: 0 },
            description: data.packageDetails?.description || ''
        };
        this.paymentDetails = {
            amount: data.paymentDetails?.amount || 0,
            currency: data.paymentDetails?.currency || 'USD',
            method: data.paymentDetails?.method || 'CASH',
            collectionStatus: data.paymentDetails?.collectionStatus || 'PENDING',
            fees: data.paymentDetails?.fees || 0
        };
        this.dates = {
            created: data.dates?.created ? new Date(data.dates.created) : new Date(),
            pickup: data.dates?.pickup ? new Date(data.dates.pickup) : null,
            delivery: data.dates?.delivery ? new Date(data.dates.delivery) : null,
            expected: data.dates?.expected ? new Date(data.dates.expected) : null
        };
        this.status = data.status || 'NEW';
        this.trackingHistory = data.trackingHistory || [];
        this.notes = data.notes || '';
        this.tags = data.tags || [];
        this.metadata = data.metadata || {};
    }
    
    /**
     * Get tracking history as a formatted array
     * @returns {Array} - Formatted tracking history
     */
    getFormattedTrackingHistory() {
        return this.trackingHistory.map(entry => ({
            ...entry,
            date: new Date(entry.date),
            formattedDate: new Date(entry.date).toLocaleString()
        }));
    }
    
    /**
     * Format dates for display
     * @returns {Object} - Formatted dates
     */
    getFormattedDates() {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return {
            created: this.dates.created ? this.dates.created.toLocaleDateString(undefined, options) : '',
            pickup: this.dates.pickup ? this.dates.pickup.toLocaleDateString(undefined, options) : '',
            delivery: this.dates.delivery ? this.dates.delivery.toLocaleDateString(undefined, options) : '',
            expected: this.dates.expected ? this.dates.expected.toLocaleDateString(undefined, options) : ''
        };
    }
    
    /**
     * Calculate delivery status based on dates and status
     * @returns {string} - Status description
     */
    getDeliveryStatus() {
        const now = new Date();
        
        if (this.status === 'DELIVERED') {
            return 'Delivered';
        }
        
        if (this.status === 'IN_TRANSIT' && this.dates.expected) {
            if (now > this.dates.expected) {
                return 'Delayed';
            } else {
                return 'On Schedule';
            }
        }
        
        return this.status.replace('_', ' ');
    }
    
    /**
     * Check if delivery is delayed
     * @returns {boolean} - True if delivery is delayed
     */
    isDelayed() {
        if (!this.dates.expected || this.status === 'DELIVERED') {
            return false;
        }
        
        return new Date() > this.dates.expected;
    }
    
    /**
     * Convert to plain object for API requests
     * @returns {Object} - Plain object representation
     */
    toApiPayload() {
        return {
            id: this.id,
            trackingNumber: this.trackingNumber,
            customerName: this.customerName,
            customerPhone: this.customerPhone,
            customerEmail: this.customerEmail,
            customerAddress: this.customerAddress,
            merchantId: this.merchantId,
            agentId: this.agentId,
            zoneId: this.zoneId,
            items: this.items,
            packageDetails: this.packageDetails,
            paymentDetails: this.paymentDetails,
            dates: {
                created: this.dates.created ? this.dates.created.toISOString() : null,
                pickup: this.dates.pickup ? this.dates.pickup.toISOString() : null,
                delivery: this.dates.delivery ? this.dates.delivery.toISOString() : null,
                expected: this.dates.expected ? this.dates.expected.toISOString() : null
            },
            status: this.status,
            notes: this.notes,
            tags: this.tags,
            metadata: this.metadata
        };
    }
    
    /**
     * Create a ShipmentModel from API response
     * @param {Object} data - API response data
     * @returns {ShipmentModel} - ShipmentModel instance
     */
    static fromApiResponse(data) {
        return new ShipmentModel(data);
    }
}

export default ShipmentModel; 