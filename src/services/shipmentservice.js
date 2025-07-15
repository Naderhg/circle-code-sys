// Mock data for development
const mockShipments = [
  {
    id: 'SHP-089',
    customerName: 'Emma Johnson',
    createdAt: '2023-10-12T10:30:00Z',
    status: 'pending',
    amount: 87.50,
    productsCost: 77.50,
    deliveryCost: 10.00,
    sender: {
      name: 'Circle Delivery Co.',
      phone: '+1 (555) 123-4567',
      email: 'info@circledelivery.com',
      address: '123 Main St, New York, NY 10001'
    },
    receiver: {
      name: 'Emma Johnson',
      phone: '+1 (555) 987-6543',
      email: 'emma.johnson@example.com',
      addressLine1: '456 Park Ave, Apt 303',
      addressLine2: 'Manhattan',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'US'
    },
    items: [
      { name: 'Premium Headphones', quantity: 1, price: 59.99, weight: 0.5 },
      { name: 'Phone Charger', quantity: 2, price: 8.75, weight: 0.2 }
    ]
  },
  {
    id: 'SHP-088',
    customerName: 'Michael Brown',
    createdAt: '2023-10-11T14:45:00Z',
    status: 'in-transit',
    amount: 124.99,
    productsCost: 114.99,
    deliveryCost: 10.00,
    sender: {
      name: 'Circle Delivery Co.',
      phone: '+1 (555) 123-4567',
      email: 'info@circledelivery.com',
      address: '123 Main St, New York, NY 10001'
    },
    receiver: {
      name: 'Michael Brown',
      phone: '+1 (555) 234-5678',
      email: 'michael.brown@example.com',
      addressLine1: '789 Broadway',
      addressLine2: '',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'US'
    },
    items: [
      { name: 'Wireless Keyboard', quantity: 1, price: 89.99, weight: 1.2 },
      { name: 'Mouse Pad', quantity: 1, price: 15.00, weight: 0.3 },
      { name: 'USB Cable', quantity: 2, price: 5.00, weight: 0.1 }
    ]
  },
  {
    id: 'SHP-087',
    customerName: 'Sarah Wilson',
    createdAt: '2023-10-10T09:15:00Z',
    status: 'delivered',
    amount: 56.25,
    productsCost: 46.25,
    deliveryCost: 10.00,
    sender: {
      name: 'Circle Delivery Co.',
      phone: '+1 (555) 123-4567',
      email: 'info@circledelivery.com',
      address: '123 Main St, New York, NY 10001'
    },
    receiver: {
      name: 'Sarah Wilson',
      phone: '+1 (555) 876-5432',
      email: 'sarah.wilson@example.com',
      addressLine1: '321 Oak Street',
      addressLine2: 'Apartment 5B',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'US'
    },
    items: [
      { name: 'Desk Lamp', quantity: 1, price: 24.99, weight: 1.5 },
      { name: 'Notebook Set', quantity: 3, price: 7.09, weight: 0.5 }
    ]
  },
  {
    id: 'SHP-086',
    customerName: 'David Miller',
    createdAt: '2023-10-09T16:20:00Z',
    status: 'delivered',
    amount: 112.75,
    productsCost: 102.75,
    deliveryCost: 10.00,
    sender: {
      name: 'Circle Delivery Co.',
      phone: '+1 (555) 123-4567',
      email: 'info@circledelivery.com',
      address: '123 Main St, New York, NY 10001'
    },
    receiver: {
      name: 'David Miller',
      phone: '+1 (555) 345-6789',
      email: 'david.miller@example.com',
      addressLine1: '567 Pine Road',
      addressLine2: '',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'US'
    },
    items: [
      { name: 'Smart Watch', quantity: 1, price: 89.99, weight: 0.3 },
      { name: 'Watch Band', quantity: 2, price: 6.38, weight: 0.1 }
    ]
  },
  {
    id: 'SHP-085',
    customerName: 'Jennifer Taylor',
    createdAt: '2023-10-08T11:05:00Z',
    status: 'returned',
    amount: 93.20,
    productsCost: 83.20,
    deliveryCost: 10.00,
    sender: {
      name: 'Circle Delivery Co.',
      phone: '+1 (555) 123-4567',
      email: 'info@circledelivery.com',
      address: '123 Main St, New York, NY 10001'
    },
    receiver: {
      name: 'Jennifer Taylor',
      phone: '+1 (555) 456-7890',
      email: 'jennifer.taylor@example.com',
      addressLine1: '890 Maple Avenue',
      addressLine2: 'Suite 300',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'US'
    },
    items: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 65.99, weight: 1.0 },
      { name: 'USB Adapter', quantity: 2, price: 8.49, weight: 0.1 },
      { name: 'Extension Cable', quantity: 1, price: 10.23, weight: 0.5 }
    ]
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
    
    // Calculate earnings by status
    const inTransitEarnings = mockShipments
      .filter(s => s.status === 'in-transit')
      .reduce((sum, shipment) => sum + shipment.amount, 0);
      
    const deliveredEarnings = mockShipments
      .filter(s => s.status === 'delivered')
      .reduce((sum, shipment) => sum + shipment.amount, 0);
      
    const returnedEarnings = mockShipments
      .filter(s => s.status === 'returned')
      .reduce((sum, shipment) => sum + shipment.amount, 0);
    
    return {
      data: {
        totalShipments,
        inTransitShipments,
        totalEarnings,
        inTransitEarnings,
        deliveredEarnings,
        returnedEarnings
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