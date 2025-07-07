// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const body = document.querySelector('body');
    
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    // Toggle theme when the button is clicked
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
    
    // Mobile Navigation Toggle
    const menuToggleBtn = document.createElement('button');
    menuToggleBtn.classList.add('menu-toggle-btn');
    menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.top-bar').prepend(menuToggleBtn);
    
    menuToggleBtn.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('show-sidebar');
        body.classList.toggle('sidebar-shown');
        
        // Update the icon based on sidebar state
        if (sidebar.classList.contains('show-sidebar')) {
            menuToggleBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const menuBtn = document.querySelector('.menu-toggle-btn');
        
        if (window.innerWidth < 992) {
            if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
                sidebar.classList.remove('show-sidebar');
                body.classList.remove('sidebar-shown');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Also close sidebar when clicking on overlay
    document.addEventListener('click', function(event) {
        if (body.classList.contains('sidebar-shown') && 
            !document.querySelector('.sidebar').contains(event.target) && 
            !document.querySelector('.menu-toggle-btn').contains(event.target)) {
            body.classList.remove('sidebar-shown');
            document.querySelector('.sidebar').classList.remove('show-sidebar');
            document.querySelector('.menu-toggle-btn').innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Add active class to current page link
    const currentLocation = window.location.href;
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuLinks.forEach(link => {
        if (currentLocation.includes(link.href)) {
            link.parentElement.classList.add('active');
        }
    });
    
    // Add click event to menu links to close sidebar on mobile when clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                document.querySelector('.sidebar').classList.remove('show-sidebar');
                body.classList.remove('sidebar-shown');
                document.querySelector('.menu-toggle-btn').innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Initialize branch management if on branches page
    if (window.location.pathname.includes('branches.html')) {
        initializeBranchManagement();
    }
    
    // Initialize date filter if it exists on the page
    initializeDateFilter();
    
    // Handle URL parameters for shipment filters
    if (window.location.pathname.includes('shipments.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const date = urlParams.get('date');
        const currentFilterElement = document.getElementById('currentFilter');
        
        // Update filter display based on URL parameters
        if (currentFilterElement) {
            // Default text
            let filterText = 'All Shipments';
            
            // Add status filter if present
            if (status) {
                switch(status) {
                    case 'new':
                        filterText = 'New Shipments';
                        break;
                    case 'instock':
                        filterText = 'In Stock Shipments';
                        break;
                    case 'delivered':
                        filterText = 'Delivered Shipments';
                        break;
                    case 'in-transit':
                        filterText = 'In Transit Shipments';
                        break;
                }
            }
            
            // Add date filter if present
            if (date) {
                const dateObj = new Date(date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = dateObj.toLocaleDateString('en-US', options);
                filterText += ` - ${formattedDate}`;
            }
            
            currentFilterElement.textContent = filterText;
        }
        
        // Apply filters to the table
        if (status || date) {
            filterShipmentsTable(status, date);
        }
    }

    // Date Filter Functionality
    function initializeDateFilter() {
        const dateFilterContainer = document.querySelector('.date-filter-container');
        if (!dateFilterContainer) return;
        
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const filterBtn = document.getElementById('applyDateFilter');
        const resetBtn = document.getElementById('resetDateFilter');
        
        // Set default date values if not already set
        if (startDateInput && !startDateInput.value) {
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);
            
            startDateInput.value = formatDateForInput(oneMonthAgo);
            endDateInput.value = formatDateForInput(today);
        }
        
        // Apply date filter from URL parameters if present
        const urlParams = new URLSearchParams(window.location.search);
        const startDate = urlParams.get('startDate');
        const endDate = urlParams.get('endDate');
        
        if (startDate && endDate && startDateInput && endDateInput) {
            startDateInput.value = startDate;
            endDateInput.value = endDate;
            
            // Apply the filter to the table
            filterTableByDateRange(startDate, endDate);
        }
        
        // Add event listeners to filter buttons
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                if (startDateInput && endDateInput) {
                    const start = startDateInput.value;
                    const end = endDateInput.value;
                    
                    if (start && end) {
                        // Update URL with date parameters
                        const url = new URL(window.location.href);
                        url.searchParams.set('startDate', start);
                        url.searchParams.set('endDate', end);
                        window.history.pushState({}, '', url);
                        
                        // Apply filter to table
                        filterTableByDateRange(start, end);
                    }
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Reset date inputs to default values
                const today = new Date();
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                
                if (startDateInput && endDateInput) {
                    startDateInput.value = formatDateForInput(oneMonthAgo);
                    endDateInput.value = formatDateForInput(today);
                }
                
                // Remove date parameters from URL
                const url = new URL(window.location.href);
                url.searchParams.delete('startDate');
                url.searchParams.delete('endDate');
                window.history.pushState({}, '', url);
                
                // Reset table to show all rows
                resetTableDateFilter();
            });
        }
    }
    
    // Helper function to format date for input value (YYYY-MM-DD)
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Function to filter table by date range
    function filterTableByDateRange(startDateStr, endDateStr) {
        const tables = document.querySelectorAll('.data-table');
        if (!tables.length) return;
        
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999); // Include the entire end date
        
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            let dateColumnIndex = findDateColumnIndex(table);
            
            if (dateColumnIndex === -1) return; // No date column found
            
            rows.forEach(row => {
                const dateCell = row.querySelector(`td:nth-child(${dateColumnIndex + 1})`);
                if (!dateCell) return;
                
                const rowDate = parseDate(dateCell.textContent.trim());
                if (!rowDate) return;
                
                if (rowDate >= startDate && rowDate <= endDate) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
        
        // Update stats if available
        updateStats();
    }
    
    // Function to reset table date filter
    function resetTableDateFilter() {
        const tables = document.querySelectorAll('.data-table');
        if (!tables.length) return;
        
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.display = '';
            });
        });
        
        // Update stats if available
        updateStats();
    }
    
    // Helper function to find the date column index in a table
    function findDateColumnIndex(table) {
        const headerCells = table.querySelectorAll('thead th');
        let dateColumnIndex = -1;
        
        // First try to find a column with "Date" in the header
        headerCells.forEach((cell, index) => {
            if (cell.textContent.trim().toLowerCase().includes('date')) {
                dateColumnIndex = index;
            }
        });
        
        // If no date column found, try to find a column with date-formatted content
        if (dateColumnIndex === -1) {
            const firstRow = table.querySelector('tbody tr');
            if (firstRow) {
                const cells = firstRow.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    const text = cell.textContent.trim();
                    if (isDateString(text)) {
                        dateColumnIndex = index;
                    }
                });
            }
        }
        
        return dateColumnIndex;
    }
    
    // Helper function to check if a string is likely a date
    function isDateString(str) {
        // Check common date formats (YYYY-MM-DD, MM/DD/YYYY, etc.)
        return /^\d{4}-\d{2}-\d{2}$/.test(str) || // YYYY-MM-DD
               /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str) || // MM/DD/YYYY
               /^\d{1,2}-\d{1,2}-\d{4}$/.test(str); // MM-DD-YYYY
    }
    
    // Helper function to parse date from various formats
    function parseDate(dateStr) {
        // Try to parse the date string
        const date = new Date(dateStr);
        
        // Check if the date is valid
        if (!isNaN(date.getTime())) {
            return date;
        }
        
        // If standard parsing fails, try common formats
        let parts;
        
        // Try MM/DD/YYYY
        parts = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (parts) {
            return new Date(parts[3], parts[1] - 1, parts[2]);
        }
        
        // Try MM-DD-YYYY
        parts = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
        if (parts) {
            return new Date(parts[3], parts[1] - 1, parts[2]);
        }
        
        return null; // Return null if parsing fails
    }
    
    // Function to update stats based on visible rows
    function updateStats() {
        // This function can be customized based on the specific page
        // For now, we'll implement a generic version that works across pages
        
        const tables = document.querySelectorAll('.data-table');
        if (!tables.length) return;
        
        // Count visible rows
        let visibleRowCount = 0;
        tables.forEach(table => {
            const visibleRows = Array.from(table.querySelectorAll('tbody tr')).filter(row => 
                row.style.display !== 'none'
            );
            visibleRowCount += visibleRows.length;
        });
        
        // Update the first stat card if it exists
        const firstStatCard = document.querySelector('.stats-container .stat-card:first-child h2');
        if (firstStatCard) {
            firstStatCard.textContent = visibleRowCount;
        }
        
        // For shipments page, also update specific stats
        if (window.location.pathname.includes('shipments.html')) {
            updateShipmentStats();
        }
    }

    // Function to filter the shipments table
    function filterShipmentsTable(status, date) {
        const table = document.getElementById('shipmentsTable');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            let showRow = true;
            
            // Filter by status if specified
            if (status) {
                const statusCell = row.querySelector('td:nth-child(8) .status');
                if (statusCell) {
                    const rowStatus = statusCell.className.replace('status ', '').trim();
                    if (status !== 'all' && !rowStatus.includes(status.replace('in-transit', 'in-transit'))) {
                        showRow = false;
                    }
                }
            }
            
            // Filter by date if specified
            if (date && showRow) {
                const dateCell = row.querySelector('td:nth-child(6)');
                if (dateCell) {
                    const rowDate = dateCell.textContent.trim();
                    if (rowDate !== date) {
                        showRow = false;
                    }
                }
            }
            
            // Show or hide the row
            row.style.display = showRow ? '' : 'none';
        });
        
        // Update the shipment count stats based on filtered results
        updateShipmentStats();
    }
    
    // Function to update shipment stats based on visible rows
    function updateShipmentStats() {
        const table = document.getElementById('shipmentsTable');
        if (!table) return;
        
        const visibleRows = Array.from(table.querySelectorAll('tbody tr')).filter(row => 
            row.style.display !== 'none'
        );
        
        // Update total shipments count
        const totalShipmentsElement = document.querySelector('.stats-container .stat-card:nth-child(1) h2');
        if (totalShipmentsElement) {
            totalShipmentsElement.textContent = visibleRows.length;
        }
        
        // Update in-transit count
        const inTransitCount = visibleRows.filter(row => 
            row.querySelector('td:nth-child(8) .status').classList.contains('in-transit')
        ).length;
        
        const inTransitElement = document.querySelector('.stats-container .stat-card:nth-child(2) h2');
        if (inTransitElement) {
            inTransitElement.textContent = inTransitCount;
        }
        
        // Update delivered count
        const deliveredCount = visibleRows.filter(row => 
            row.querySelector('td:nth-child(8) .status').classList.contains('delivered')
        ).length;
        
        const deliveredElement = document.querySelector('.stats-container .stat-card:nth-child(3) h2');
        if (deliveredElement) {
            deliveredElement.textContent = deliveredCount;
        }
    }

    // Function to filter shipments by today's date
    window.filterShipmentsByTodayDate = function() {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        // Navigate to shipments page with status=in-transit and date=today
        window.location.href = `shipments.html?status=in-transit&date=${formattedDate}`;
    };

    // Multi-select functionality for tables
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const bulkActionsDiv = document.getElementById('bulkActions');
    const selectedCountSpan = document.getElementById('selectedCount');

    if (selectAllCheckbox && rowCheckboxes.length > 0) {
        // Select all checkbox functionality
        selectAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            
            updateBulkActionsVisibility();
        });
        
        // Individual row checkbox functionality
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // If any checkbox is unchecked, uncheck the "select all" checkbox
                if (!this.checked) {
                    selectAllCheckbox.checked = false;
                } else {
                    // Check if all checkboxes are checked
                    const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                    selectAllCheckbox.checked = allChecked;
                }
                
                updateBulkActionsVisibility();
            });
        });
        
        // Update bulk actions panel visibility
        function updateBulkActionsVisibility() {
            const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
            
            if (checkedCount > 0) {
                bulkActionsDiv.style.display = 'flex';
                selectedCountSpan.textContent = `${checkedCount} selected`;
            } else {
                bulkActionsDiv.style.display = 'none';
            }
        }
        
        // Bulk action buttons functionality
        const bulkActionButtons = document.querySelectorAll('.bulk-action-btn');
        bulkActionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.id || this.classList[2];
                const selectedIds = [];
                
                // Get all checked rows
                rowCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        // Get shipment ID from the row
                        const shipmentId = checkbox.closest('tr').children[1].textContent;
                        selectedIds.push(shipmentId);
                    }
                });
                
                // In a real application, this would trigger an API call
                console.log(`Performing ${action} on: `, selectedIds);
                
                // Show a simple alert for demonstration
                alert(`${action} would be performed on ${selectedIds.length} items: ${selectedIds.join(', ')}`);
            });
        });
    }
    
    // Simulate loading data or API calls
    function initializeDashboard() {
        // Here you would typically make API calls to get real data
        console.log('Dashboard initialized');
        
        // For demo purposes, we'll simulate a simple chart in the activity area
        const chartPlaceholder = document.querySelector('.chart-placeholder');
        if (chartPlaceholder) {
            // In a real app, you would use a chart library like Chart.js
            setTimeout(() => {
                chartPlaceholder.innerHTML = `
                    <svg width="100%" height="200" viewBox="0 0 800 200">
                        <polyline 
                            fill="none" 
                            stroke="#1a73e8" 
                            stroke-width="3" 
                            points="0,180 100,120 200,160 300,80 400,100 500,60 600,40 700,90 800,20"
                        />
                        <circle cx="100" cy="120" r="6" fill="#1a73e8"/>
                        <circle cx="200" cy="160" r="6" fill="#1a73e8"/>
                        <circle cx="300" cy="80" r="6" fill="#1a73e8"/>
                        <circle cx="400" cy="100" r="6" fill="#1a73e8"/>
                        <circle cx="500" cy="60" r="6" fill="#1a73e8"/>
                        <circle cx="600" cy="40" r="6" fill="#1a73e8"/>
                        <circle cx="700" cy="90" r="6" fill="#1a73e8"/>
                    </svg>
                    <p>Last 7 days activity</p>
                `;
            }, 1000);
        }
    }
    
    // Call the initialization function
    initializeDashboard();
    
    // Handle window resize to adjust layout accordingly
    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('show-sidebar');
            body.classList.remove('sidebar-shown');
            document.querySelector('.menu-toggle-btn').innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Here you would typically filter content based on the selected tab
                console.log(`Tab ${button.textContent} selected`);
                
                // For demonstration purposes only, we'll just show an alert
                // In a real application, you would filter the data
                // showFilteredShipments(button.textContent.toLowerCase());
            });
        });
    }
    
    // Zone interaction functionality
    const zoneItems = document.querySelectorAll('.zone-item');
    if (zoneItems.length > 0) {
        zoneItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all zone items
                zoneItems.forEach(zone => zone.classList.remove('active'));
                // Add active class to clicked zone item
                item.classList.add('active');
                
                // Here you would typically center the map on the selected zone
                // and highlight it on the map
                const zoneName = item.querySelector('h4').textContent;
                console.log(`Zone ${zoneName} selected`);
            });
        });
    }
    
    // Settings navigation functionality
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    if (settingsNavItems.length > 0) {
        settingsNavItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all settings nav items
                settingsNavItems.forEach(navItem => navItem.classList.remove('active'));
                // Add active class to clicked settings nav item
                item.classList.add('active');
                
                // Here you would typically show the corresponding settings panel
                const settingType = item.querySelector('span').textContent;
                console.log(`${settingType} settings selected`);
                
                // You would load/show the correct settings panel here
                // For demonstration, we're just logging to console
            });
        });
    }
    
    // Reports date filter functionality
    const filterOptions = document.querySelectorAll('.filter-option');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all filter options
                filterOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked filter option
                option.classList.add('active');
                
                // Here you would typically update the report data based on the selected date range
                const dateRange = option.textContent;
                console.log(`Date range changed to: ${dateRange}`);
                
                // For a real application, you would make an API call to get data for the selected range
                // and then update the charts and statistics
                if (dateRange === 'Custom') {
                    // Show a date picker for custom range
                    console.log('Custom date range selected, would show date picker here');
                    // In a real app, you would show a date range picker here
                }
            });
        });
    }

    // Branch Management Functionality
    function initializeBranchManagement() {
        // Update branch statistics
        updateBranchStats();
        
        // Add event listeners for branch actions
        setupBranchActionEvents();
        
        // Initialize branch filtering
        initializeBranchFilters();
    }
    
    function updateBranchStats() {
        // This function would typically fetch data from an API
        // For now, we'll use the static data in the HTML
        
        // Example of how to update stats dynamically:
        const branchTable = document.querySelector('.data-table');
        if (!branchTable) return;
        
        const branchRows = branchTable.querySelectorAll('tbody tr');
        
        // Count total branches
        const totalBranches = branchRows.length;
        
        // Count active and inactive branches
        let activeBranches = 0;
        let inactiveBranches = 0;
        
        branchRows.forEach(row => {
            const statusCell = row.querySelector('td:nth-child(7)');
            if (statusCell) {
                const statusSpan = statusCell.querySelector('.status');
                if (statusSpan && statusSpan.classList.contains('active')) {
                    activeBranches++;
                } else {
                    inactiveBranches++;
                }
            }
        });
        
        // Update the stats in the UI
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 3) {
            // Total branches
            const totalBranchesCard = statCards[0];
            const totalBranchesElement = totalBranchesCard.querySelector('h2');
            if (totalBranchesElement) {
                totalBranchesElement.textContent = totalBranches;
            }
            
            // Active branches
            const activeBranchesCard = statCards[1];
            const activeBranchesElement = activeBranchesCard.querySelector('h2');
            if (activeBranchesElement) {
                activeBranchesElement.textContent = activeBranches;
            }
            
            // Inactive branches
            const inactiveBranchesCard = statCards[2];
            const inactiveBranchesElement = inactiveBranchesCard.querySelector('h2');
            if (inactiveBranchesElement) {
                inactiveBranchesElement.textContent = inactiveBranches;
            }
        }
    }
    
    function setupBranchActionEvents() {
        // Add event listeners for action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            
            if (icon && icon.classList.contains('fa-eye')) {
                btn.addEventListener('click', function() {
                    const row = btn.closest('tr');
                    const branchName = row.querySelector('td:first-child').textContent;
                    viewBranchDetails(branchName);
                });
            }
            
            if (icon && icon.classList.contains('fa-edit')) {
                btn.addEventListener('click', function() {
                    const row = btn.closest('tr');
                    const branchName = row.querySelector('td:first-child').textContent;
                    editBranch(branchName);
                });
            }
            
            if (icon && icon.classList.contains('fa-ellipsis-v')) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showMoreOptions(btn);
                });
            }
        });
        
        // Event listener for the "Create New Branch" action card
        const createBranchCard = document.querySelector('.action-card:first-child');
        if (createBranchCard) {
            createBranchCard.addEventListener('click', function() {
                window.location.href = 'branch-form.html';
            });
        }
        
        // Event listener for the "Edit Branch" action card
        const editBranchCard = document.querySelector('.action-card:last-child');
        if (editBranchCard) {
            editBranchCard.addEventListener('click', function() {
                showEditBranchModal();
            });
        }
    }
    
    function initializeBranchFilters() {
        // Add event listener for filter button
        const filterBtn = document.querySelector('.filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                showBranchFilterModal();
            });
        }
    }
    
    function viewBranchDetails(branchName) {
        // This would typically navigate to a branch details page
        // For now, we'll just show an alert
        alert(`Viewing details for branch: ${branchName}`);
    }
    
    function editBranch(branchName) {
        // This would typically navigate to an edit branch page
        // For now, we'll just show an alert
        alert(`Editing branch: ${branchName}`);
    }
    
    function showMoreOptions(buttonElement) {
        // Create a dropdown menu for more options
        const dropdown = document.createElement('div');
        dropdown.className = 'action-dropdown';
        dropdown.innerHTML = `
            <ul>
                <li><i class="fas fa-toggle-on"></i> Toggle Status</li>
                <li><i class="fas fa-trash-alt"></i> Delete</li>
                <li><i class="fas fa-chart-bar"></i> View Reports</li>
            </ul>
        `;
        
        // Position the dropdown
        const rect = buttonElement.getBoundingClientRect();
        dropdown.style.position = 'absolute';
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left}px`;
        
        // Add event listeners to dropdown options
        document.body.appendChild(dropdown);
        
        // Add click event listeners to dropdown items
        const items = dropdown.querySelectorAll('li');
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = item.textContent.trim();
                const row = buttonElement.closest('tr');
                const branchName = row.querySelector('td:first-child').textContent;
                
                switch (action) {
                    case 'Toggle Status':
                        toggleBranchStatus(row);
                        break;
                    case 'Delete':
                        deleteBranch(branchName);
                        break;
                    case 'View Reports':
                        viewBranchReports(branchName);
                        break;
                }
                
                document.body.removeChild(dropdown);
            });
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target)) {
                if (document.body.contains(dropdown)) {
                    document.body.removeChild(dropdown);
                }
                document.removeEventListener('click', closeDropdown);
            }
        });
    }
    
    function toggleBranchStatus(row) {
        const statusCell = row.querySelector('td:nth-child(7)');
        if (statusCell) {
            const statusSpan = statusCell.querySelector('.status');
            if (statusSpan) {
                if (statusSpan.classList.contains('active')) {
                    statusSpan.classList.remove('active');
                    statusSpan.classList.add('inactive');
                    statusSpan.textContent = 'INACTIVE';
                } else {
                    statusSpan.classList.remove('inactive');
                    statusSpan.classList.add('active');
                    statusSpan.textContent = 'ACTIVE';
                }
                
                // Update branch stats after toggling status
                updateBranchStats();
            }
        }
    }
    
    function deleteBranch(branchName) {
        if (confirm(`Are you sure you want to delete branch: ${branchName}?`)) {
            // This would typically call an API to delete the branch
            // For now, we'll just remove the row from the table
            const branchTable = document.querySelector('.data-table');
            const rows = branchTable.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const nameCell = row.querySelector('td:first-child');
                if (nameCell && nameCell.textContent === branchName) {
                    row.remove();
                    
                    // Update branch stats after deletion
                    updateBranchStats();
                }
            });
        }
    }
    
    function viewBranchReports(branchName) {
        // This would typically navigate to a reports page filtered by branch
        // For now, we'll just show an alert
        alert(`Viewing reports for branch: ${branchName}`);
    }
    
    function showEditBranchModal() {
        // Create the modal HTML
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Select Branch to Edit</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="branchSelect">Choose a Branch:</label>
                        <select id="branchSelect" class="form-control">
                            <option value="">-- Select Branch --</option>
                            <option value="Cairo Main Branch">Cairo Main Branch</option>
                            <option value="Alexandria Branch">Alexandria Branch</option>
                            <option value="Giza Branch">Giza Branch</option>
                            <option value="Mansoura Branch">Mansoura Branch</option>
                            <option value="Luxor Branch">Luxor Branch</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary close-btn">Cancel</button>
                    <button class="btn btn-primary edit-branch-btn">Edit</button>
                </div>
            </div>
        `;
        
        // Add the modal to the page
        document.body.appendChild(modal);
        
        // Show the modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Add event listeners for modal actions
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.close-btn');
        const editBtn = modal.querySelector('.edit-branch-btn');
        const branchSelect = modal.querySelector('#branchSelect');
        
        // Close modal function
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        // Close modal when clicking close button
        closeBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking cancel button
        cancelBtn.addEventListener('click', closeModal);
        
        // Edit branch when clicking edit button
        editBtn.addEventListener('click', function() {
            const selectedBranch = branchSelect.value;
            if (selectedBranch) {
                closeModal();
                editBranch(selectedBranch);
            } else {
                alert('Please select a branch to edit');
            }
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    function showBranchFilterModal() {
        // Create the modal HTML
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Filter Branches</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="filterStatus">Status:</label>
                        <select id="filterStatus" class="form-control">
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="filterZone">Zone:</label>
                        <select id="filterZone" class="form-control">
                            <option value="">All Zones</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Alexandria">Alexandria</option>
                            <option value="Giza">Giza</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary close-btn">Cancel</button>
                    <button class="btn btn-primary apply-filter-btn">Apply Filter</button>
                </div>
            </div>
        `;
        
        // Add the modal to the page
        document.body.appendChild(modal);
        
        // Show the modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Add event listeners for modal actions
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.close-btn');
        const applyBtn = modal.querySelector('.apply-filter-btn');
        const statusSelect = modal.querySelector('#filterStatus');
        const zoneSelect = modal.querySelector('#filterZone');
        
        // Close modal function
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        // Close modal when clicking close button
        closeBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking cancel button
        cancelBtn.addEventListener('click', closeModal);
        
        // Apply filter when clicking apply button
        applyBtn.addEventListener('click', function() {
            const status = statusSelect.value;
            const zone = zoneSelect.value;
            
            filterBranchesTable(status, zone);
            closeModal();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    function filterBranchesTable(status, zone) {
        const table = document.querySelector('.data-table');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            let showRow = true;
            
            // Filter by status
            if (status) {
                const statusCell = row.querySelector('td:nth-child(7) .status');
                if (statusCell) {
                    const rowStatus = statusCell.classList.contains('active') ? 'active' : 'inactive';
                    if (rowStatus !== status) {
                        showRow = false;
                    }
                }
            }
            
            // Filter by zone
            if (zone && showRow) {
                const zoneCell = row.querySelector('td:nth-child(3)');
                if (zoneCell && !zoneCell.textContent.includes(zone)) {
                    showRow = false;
                }
            }
            
            // Show or hide row based on filters
            if (showRow) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}); 