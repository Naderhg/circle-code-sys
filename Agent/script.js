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
    
    // Handle filter form submission
    const filterForm = document.querySelector('.filter-panel');
    if (filterForm) {
        const applyFilterBtn = filterForm.querySelector('.apply-filter-btn');
        const resetFilterBtn = filterForm.querySelector('.reset-filter-btn');
        
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', function() {
                const status = document.getElementById('status-filter')?.value || '';
                const dateFilter = document.getElementById('date-filter')?.value || '';
                const search = document.getElementById('search-input')?.value || '';
                
                let queryParams = [];
                if (status) queryParams.push('status=' + encodeURIComponent(status));
                if (dateFilter) queryParams.push('date_filter=' + encodeURIComponent(dateFilter));
                if (search) queryParams.push('search=' + encodeURIComponent(search));
                
                const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
                
                // Determine the current page
                const currentPage = window.location.pathname.split('/').pop();
                window.location.href = currentPage + queryString;
            });
        }
        
        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', function() {
                // Determine the current page
                const currentPage = window.location.pathname.split('/').pop();
                window.location.href = currentPage;
            });
        }
    }
    
    // Apply URL parameters to filter form
    function applyUrlParamsToFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const statusFilter = document.getElementById('status-filter');
        const dateFilter = document.getElementById('date-filter');
        const searchInput = document.getElementById('search-input');
        
        if (statusFilter && urlParams.has('status')) {
            statusFilter.value = urlParams.get('status');
        }
        
        if (dateFilter && urlParams.has('date_filter')) {
            dateFilter.value = urlParams.get('date_filter');
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
                const customer = row.querySelector('td:nth-child(2)').textContent;
                
                // Handle different actions
                if (action === 'fa-eye') {
                    // View delivery details
                    window.location.href = 'delivery-details.html?id=' + shipmentId.substring(1);
                } else if (action === 'fa-check-circle') {
                    // Update delivery status
                    openDeliveryModal(shipmentId, customer);
                } else if (action === 'fa-map-marker-alt') {
                    // View on map
                    alert('Opening map navigation for ' + shipmentId);
                    // Implementation would depend on your mapping solution
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
                window.location.href = 'delivery-details.html?id=' + shipmentId.substring(1);
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

// Delivery status modal functions
function openDeliveryModal(shipmentId, customer) {
    const modal = document.getElementById('statusModal');
    if (modal) {
        document.getElementById('modalTrackingId').textContent = shipmentId;
        document.getElementById('modalCustomer').textContent = customer;
        modal.style.display = 'flex';
    } else {
        // Create modal if it doesn't exist
        createDeliveryModal(shipmentId, customer);
    }
}

function createDeliveryModal(shipmentId, customer) {
    // Create modal dynamically if it doesn't exist in HTML
    const modalDiv = document.createElement('div');
    modalDiv.id = 'statusModal';
    modalDiv.style.display = 'flex';
    modalDiv.style.position = 'fixed';
    modalDiv.style.top = '0';
    modalDiv.style.left = '0';
    modalDiv.style.width = '100%';
    modalDiv.style.height = '100%';
    modalDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modalDiv.style.zIndex = '1000';
    modalDiv.style.justifyContent = 'center';
    modalDiv.style.alignItems = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'var(--card-bg)';
    modalContent.style.borderRadius = 'var(--border-radius)';
    modalContent.style.padding = '20px';
    modalContent.style.width = '400px';
    modalContent.style.maxWidth = '90%';
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3>Update Delivery Status</h3>
            <button onclick="closeDeliveryModal()" style="background: none; border: none; cursor: pointer; font-size: 18px;"><i class="fas fa-times"></i></button>
        </div>
        <div style="margin-bottom: 20px;">
            <p><strong>Tracking ID:</strong> <span id="modalTrackingId">${shipmentId}</span></p>
            <p><strong>Customer:</strong> <span id="modalCustomer">${customer}</span></p>
        </div>
        <div style="margin-bottom: 20px;">
            <label for="newStatus" style="display: block; margin-bottom: 10px;">New Status</label>
            <select id="newStatus" style="width: 100%; padding: 10px; border-radius: var(--border-radius); border: 1px solid var(--border-color);">
                <option value="delivered">Delivered</option>
                <option value="failed">Failed Delivery</option>
            </select>
        </div>
        <div style="margin-bottom: 20px;">
            <label for="statusNotes" style="display: block; margin-bottom: 10px;">Notes</label>
            <textarea id="statusNotes" style="width: 100%; padding: 10px; border-radius: var(--border-radius); border: 1px solid var(--border-color); min-height: 80px;"></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button onclick="closeDeliveryModal()" style="padding: 10px 15px; background-color: var(--light-color); color: var(--text-color); border: none; border-radius: var(--border-radius); cursor: pointer;">Cancel</button>
            <button onclick="updateDeliveryStatus()" style="padding: 10px 15px; background-color: var(--primary-color); color: white; border: none; border-radius: var(--border-radius); cursor: pointer;">Update Status</button>
        </div>
    `;
    
    modalDiv.appendChild(modalContent);
    document.body.appendChild(modalDiv);
}

function closeDeliveryModal() {
    const modal = document.getElementById('statusModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateDeliveryStatus() {
    // API call would go here in a real application
    const modal = document.getElementById('statusModal');
    if (modal) {
        const newStatus = document.getElementById('newStatus').value;
        const notes = document.getElementById('statusNotes').value;
        const trackingId = document.getElementById('modalTrackingId').textContent;
        
        showLoading();
        
        // Simulate API call
        setTimeout(() => {
            hideLoading();
            
            // Show success message
            showSuccess(`Delivery status for ${trackingId} updated to ${newStatus.toUpperCase()}`);
            
            // Close modal
            closeDeliveryModal();
            
            // Reload page to reflect changes after a delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }, 1000);
    }
}

// API loading indicator functions
function showLoading() {
    let loader = document.querySelector('.api-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'api-loader';
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        loader.style.display = 'flex';
        loader.style.justifyContent = 'center';
        loader.style.alignItems = 'center';
        loader.style.zIndex = '9999';
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
        spinner.style.borderRadius = '50%';
        spinner.style.borderTopColor = 'var(--primary-color)';
        spinner.style.animation = 'spin 1s infinite linear';
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        loader.appendChild(spinner);
        document.body.appendChild(loader);
    }
    
    loader.style.opacity = '1';
    loader.style.visibility = 'visible';
}

function hideLoading() {
    const loader = document.querySelector('.api-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 300);
    }
}

// Success and error toast notifications
function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 'var(--danger-color)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = 'var(--border-radius)';
    toast.style.boxShadow = 'var(--box-shadow)';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = '350px';
    toast.style.animation = 'fadeIn 0.3s ease';
    
    toast.textContent = message;
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 3000);
} 