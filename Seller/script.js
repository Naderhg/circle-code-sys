// Toggle sidebar on mobile
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            
            // Save preference to local storage
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggleBtn.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Mobile menu toggle
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('show-sidebar');
            document.body.classList.toggle('sidebar-shown');
        });
    }
    
    // Handle product table functionality
    initProductTable();
    
    // Handle shipment form submission
    const shipmentForm = document.getElementById('shipmentForm');
    if (shipmentForm) {
        shipmentForm.addEventListener('submit', handleShipmentSubmit);
    }
    
    // Handle shipment filtering by status
    window.filterShipmentsByStatus = function(status) {
        window.location.href = 'my-shipments.html?status=' + status;
    };
    
    // Handle filter form submission
    const filterForm = document.querySelector('.filter-panel');
    if (filterForm) {
        const applyFilterBtn = filterForm.querySelector('.apply-filter-btn');
        const resetFilterBtn = filterForm.querySelector('.reset-filter-btn');
        
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', function() {
                const status = document.getElementById('status-filter').value;
                const dateFrom = document.getElementById('date-from').value;
                const dateTo = document.getElementById('date-to').value;
                const search = document.getElementById('search-input').value;
                
                let queryParams = [];
                if (status) queryParams.push('status=' + encodeURIComponent(status));
                if (dateFrom) queryParams.push('date_from=' + encodeURIComponent(dateFrom));
                if (dateTo) queryParams.push('date_to=' + encodeURIComponent(dateTo));
                if (search) queryParams.push('search=' + encodeURIComponent(search));
                
                const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
                window.location.href = 'my-shipments.html' + queryString;
            });
        }
        
        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', function() {
                window.location.href = 'my-shipments.html';
            });
        }
    }
    
    // Apply URL parameters to filter form
    function applyUrlParamsToFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const statusFilter = document.getElementById('status-filter');
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        const searchInput = document.getElementById('search-input');
        
        if (statusFilter && urlParams.has('status')) {
            statusFilter.value = urlParams.get('status');
        }
        
        if (dateFrom && urlParams.has('date_from')) {
            dateFrom.value = urlParams.get('date_from');
        }
        
        if (dateTo && urlParams.has('date_to')) {
            dateTo.value = urlParams.get('date_to');
        }
        
        if (searchInput && urlParams.has('search')) {
            searchInput.value = urlParams.get('search');
        }
    }
    
    // Call the function to apply URL parameters to filters
    applyUrlParamsToFilters();
    
    // Table row actions
    const actionBtns = document.querySelectorAll('.action-btn');
    if (actionBtns.length > 0) {
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = this.querySelector('i').classList[1];
                const row = this.closest('tr');
                const shipmentId = row.querySelector('td:first-child').textContent;
                
                // Handle different actions
                if (action === 'fa-eye') {
                    // View shipment details
                    window.location.href = 'shipment-details.html?id=' + shipmentId.substring(1);
                } else if (action === 'fa-edit') {
                    // Edit shipment
                    window.location.href = 'edit-shipment.html?id=' + shipmentId.substring(1);
                } else if (action === 'fa-print') {
                    // Print shipment label
                    alert('Printing shipment label for ' + shipmentId);
                    // Implement print functionality
                }
            });
        });
    }
    
    // Make table rows clickable
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            row.addEventListener('click', function() {
                const shipmentId = this.querySelector('td:first-child').textContent;
                window.location.href = 'shipment-details.html?id=' + shipmentId.substring(1);
            });
        });
    }
    
    // Pagination
    const pageNumbers = document.querySelectorAll('.page-number');
    if (pageNumbers.length > 0) {
        pageNumbers.forEach(pageBtn => {
            pageBtn.addEventListener('click', function() {
                const page = this.textContent;
                // Update URL with page parameter
                const url = new URL(window.location);
                url.searchParams.set('page', page);
                window.location.href = url.toString();
            });
        });
    }
    
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage && activePage.previousElementSibling && activePage.previousElementSibling.classList.contains('page-number')) {
                activePage.previousElementSibling.click();
            }
        });
    }
    
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage && activePage.nextElementSibling && activePage.nextElementSibling.classList.contains('page-number')) {
                activePage.nextElementSibling.click();
            }
        });
    }
});

// Product table functionality
function initProductTable() {
    const productTableBody = document.getElementById('productTableBody');
    const addProductBtn = document.getElementById('addProductBtn');
    
    if (!productTableBody || !addProductBtn) return;
    
    // Add event listener for the "Add Product" button
    addProductBtn.addEventListener('click', addProductRow);
    
    // Add event listeners to existing product row
    addEventListenersToProductRow(document.getElementById('productRow-1'));
    
    // Calculate initial totals
    calculateTotals();
}

// Add a new product row to the table
function addProductRow() {
    const productTableBody = document.getElementById('productTableBody');
    const rowCount = productTableBody.children.length + 1;
    
    const newRow = document.createElement('tr');
    newRow.id = `productRow-${rowCount}`;
    
    newRow.innerHTML = `
        <td><input type="text" class="product-name" required></td>
        <td><input type="number" class="product-qty" min="1" value="1" required></td>
        <td><input type="number" class="product-price" min="0" step="0.01" value="0" required></td>
        <td class="product-total">0.00</td>
        <td><button type="button" class="delete-btn"><i class="fas fa-trash"></i></button></td>
    `;
    
    productTableBody.appendChild(newRow);
    
    // Add event listeners to the new row
    addEventListenersToProductRow(newRow);
    
    // Focus on the product name field
    newRow.querySelector('.product-name').focus();
}

// Add event listeners to a product row
function addEventListenersToProductRow(row) {
    const qtyInput = row.querySelector('.product-qty');
    const priceInput = row.querySelector('.product-price');
    const deleteBtn = row.querySelector('.delete-btn');
    
    // Event listeners for quantity and price inputs
    qtyInput.addEventListener('input', function() {
        updateRowTotal(row);
        calculateTotals();
    });
    
    priceInput.addEventListener('input', function() {
        updateRowTotal(row);
        calculateTotals();
    });
    
    // Event listener for delete button
    deleteBtn.addEventListener('click', function() {
        const productTableBody = document.getElementById('productTableBody');
        
        // Don't delete if it's the only row
        if (productTableBody.children.length > 1) {
            row.remove();
            calculateTotals();
        } else {
            // Clear inputs instead of removing the last row
            row.querySelector('.product-name').value = '';
            qtyInput.value = 1;
            priceInput.value = 0;
            row.querySelector('.product-total').textContent = '0.00';
            calculateTotals();
        }
    });
}

// Update the total for a specific row
function updateRowTotal(row) {
    const qty = parseFloat(row.querySelector('.product-qty').value) || 0;
    const price = parseFloat(row.querySelector('.product-price').value) || 0;
    const total = qty * price;
    
    row.querySelector('.product-total').textContent = total.toFixed(2);
}

// Calculate totals for all products
function calculateTotals() {
    const productTotals = document.querySelectorAll('.product-total');
    let grandTotal = 0;
    
    productTotals.forEach(totalElem => {
        grandTotal += parseFloat(totalElem.textContent) || 0;
    });
    
    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

// Handle shipment form submission
function handleShipmentSubmit(e) {
    e.preventDefault();
    
    // Show loading indicator
    showLoading();
    
    try {
        // Collect form data
        const formData = {
            // Sender details
            sender: {
                name: document.getElementById('senderName').value,
                phone: document.getElementById('senderPhone').value,
                email: document.getElementById('senderEmail').value,
                address: document.getElementById('senderAddress').value
            },
            // Receiver details
            receiver: {
                name: document.getElementById('receiverName').value,
                phone: document.getElementById('receiverPhone').value,
                email: document.getElementById('receiverEmail').value,
                address: {
                    line1: document.getElementById('addressLine1').value,
                    line2: document.getElementById('addressLine2').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zipCode: document.getElementById('zipCode').value,
                    country: document.getElementById('country').value
                }
            },
            // Product items
            items: getProductItems(),
            // Package details
            packageDetails: {
                type: document.getElementById('packageType').value,
                weight: parseFloat(document.getElementById('weight').value) || 0,
                dimensions: {
                    length: parseFloat(document.getElementById('length').value) || 0,
                    width: parseFloat(document.getElementById('width').value) || 0,
                    height: parseFloat(document.getElementById('height').value) || 0
                }
            },
            // Shipping options
            shipping: {
                method: document.getElementById('shippingMethod').value
            }
        };
        
        // Send data to API
        createShipment(formData);
    } catch (error) {
        hideLoading();
        showError('Error creating shipment: ' + error.message);
    }
}

// Get product items from the table
function getProductItems() {
    const items = [];
    const productRows = document.querySelectorAll('#productTableBody tr');
    
    productRows.forEach(row => {
        const name = row.querySelector('.product-name').value;
        const qty = parseInt(row.querySelector('.product-qty').value) || 0;
        const price = parseFloat(row.querySelector('.product-price').value) || 0;
        
        if (name && qty > 0) {
            items.push({
                name,
                quantity: qty,
                price,
                total: qty * price
            });
        }
    });
    
    return items;
}

// Calculate the grand total
function calculateGrandTotal() {
    let total = 0;
    const productTotals = document.querySelectorAll('.product-total');
    
    productTotals.forEach(totalElem => {
        total += parseFloat(totalElem.textContent) || 0;
    });
    
    return total;
}

// Create a shipment via API
function createShipment(shipmentData) {
    // Simulate API call
    console.log('Creating shipment with data:', shipmentData);
    
    // In a real application, you would call the API service
    // Example: shipmentService.createShipment(shipmentData)
    //   .then(response => handleSuccess(response))
    //   .catch(error => handleError(error));
    
    // For demo purposes, simulate a successful response after a delay
    setTimeout(() => {
        hideLoading();
        alert('Shipment created successfully!');
        window.location.href = 'my-shipments.html';
    }, 1500);
}

// API error handling
function showError(message) {
    const errorToast = document.createElement('div');
    errorToast.className = 'error-toast';
    errorToast.textContent = message;
    document.body.appendChild(errorToast);
    
    setTimeout(() => {
        errorToast.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(errorToast);
        }, 500);
    }, 3000);
}

// Show/hide API loading indicator
function showLoading() {
    let loader = document.querySelector('.api-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'api-loader';
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        loader.appendChild(spinner);
        
        document.body.appendChild(loader);
    }
    
    setTimeout(() => {
        loader.classList.add('visible');
    }, 10);
}

function hideLoading() {
    const loader = document.querySelector('.api-loader');
    if (loader) {
        loader.classList.remove('visible');
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 300);
    }
} 