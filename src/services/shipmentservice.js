// Mock data for development
const mockShipments = [
  {
    id: 'SHP-089',
    customerName: 'Emma Johnson',
    createdAt: '2023-10-12T10:30:00Z',
    status: 'pending',
    amount: 87.50
  },
  {
    id: 'SHP-088',
    customerName: 'Michael Brown',
    createdAt: '2023-10-11T14:45:00Z',
    status: 'in-transit',
    amount: 124.99
  },
  {
    id: 'SHP-087',
    customerName: 'Sarah Wilson',
    createdAt: '2023-10-10T09:15:00Z',
    status: 'delivered',
    amount: 56.25
  },
  {
    id: 'SHP-086',
    customerName: 'David Miller',
    createdAt: '2023-10-09T16:20:00Z',
    status: 'delivered',
    amount: 112.75
  },
  {
    id: 'SHP-085',
    customerName: 'Jennifer Taylor',
    createdAt: '2023-10-08T11:05:00Z',
    status: 'returned',
    amount: 93.20
  }
];

export const getShipments = async (page = 1, pageSize = 10, filters = {}) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // Filter shipments based on provided filters
    let filteredShipments = [...mockShipments];
    
    if (filters.status) {
      filteredShipments = filteredShipments.filter(
        s => s.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredShipments = filteredShipments.filter(
        s => s.id.toLowerCase().includes(searchLower) || 
             s.customerName.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const totalItems = filteredShipments.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filteredShipments.slice(start, end);
    
    return {
      data: {
        items,
        currentPage: page,
        pageSize,
        totalItems,
        totalPages
      }
    };
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw error;
  }
};

export const getShipment = async (id) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const shipment = mockShipments.find(s => s.id === id);
    if (!shipment) {
      throw new Error('Shipment not found');
    }
    return { data: shipment };
  } catch (error) {
    console.error(`Error fetching shipment ${id}:`, error);
    throw error;
  }
};

export const createShipment = async (shipmentData) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const newShipment = {
      id: `SHP-${Math.floor(Math.random() * 1000)}`,
      ...shipmentData,
      createdAt: new Date().toISOString()
    };
    mockShipments.unshift(newShipment);
    return { data: newShipment };
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
};

export const updateShipment = async (id, data) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const index = mockShipments.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Shipment not found');
    }
    
    mockShipments[index] = {
      ...mockShipments[index],
      ...data
    };
    
    return { data: mockShipments[index] };
  } catch (error) {
    console.error(`Error updating shipment ${id}:`, error);
    throw error;
  }
};

export const getShipmentStats = async () => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 400));
  
  try {
    const totalShipments = mockShipments.length;
    const inTransitShipments = mockShipments.filter(s => s.status === 'in-transit').length;
    const totalEarnings = mockShipments.reduce((sum, shipment) => sum + shipment.amount, 0);
    
    return {
      data: {
        totalShipments,
        inTransitShipments,
        totalEarnings
      }
    };
  } catch (error) {
    console.error('Error fetching shipment stats:', error);
    throw error;
  }
};

export const exportShipments = async (filters = {}) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 700));
  
  try {
    // Filter shipments based on provided filters
    let filteredShipments = [...mockShipments];
    
    if (filters.status) {
      filteredShipments = filteredShipments.filter(
        s => s.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    // Mock CSV creation
    const csvContent = "id,customer,status,amount\n" + 
      filteredShipments.map(s => `${s.id},${s.customerName},${s.status},${s.amount}`).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `shipments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return { success: true };
  } catch (error) {
    console.error('Error exporting shipments:', error);
    throw error;
  }
};