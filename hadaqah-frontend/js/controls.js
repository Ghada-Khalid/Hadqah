// controls.js - Fixed ECC Controls Page Logic

// State management
let allControls = [];
let filteredControls = [];
let assessments = [];
let currentFilters = {
  search: '',
  domain: '',
  status: ''
};

// DOM references
const DOM = {
  searchInput: document.getElementById('searchInput'),
  domainMenu: document.getElementById('domainMenu'),
  statusMenu: document.getElementById('statusMenu'),
  domainButtonText: document.getElementById('domainButtonText'),
  statusButtonText: document.getElementById('statusButtonText'),
  controlsTableBody: document.getElementById('controlsTableBody'),
  controlsCount: document.getElementById('controlsCount'),
  loading: document.getElementById('loading'),
  noResults: document.getElementById('noResults')
};

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('ECC Controls page loading...');
  await initializeControlsPage();
});

// Main initialization function
async function initializeControlsPage() {
  try {
    showLoading(true);
    
    // Load all required data
    await Promise.all([
      loadControlsData(),
      loadAssessmentsData()
    ]);
    
    // Process and merge data
    processControlsWithAssessments();
    
    // Setup UI components
    setupFilters();
    setupEventListeners();
    
    // Initial render
    applyFiltersAndRender();
    
    console.log(`Loaded ${allControls.length} controls successfully`);
    
  } catch (error) {
    console.error('Failed to initialize controls page:', error);
    showError('Failed to load controls data. Please refresh the page.');
  } finally {
    showLoading(false);
  }
}

// Load controls from multiple sources
async function loadControlsData() {
  // First try to load from API
  try {
    const response = await fetch('/api/controls');
    if (response.ok) {
      allControls = await response.json();
      console.log('Loaded controls from API:', allControls.length);
      return;
    }
  } catch (error) {
    console.log('API not available, using local data');
  }
  
  // Fallback to local data from controlsData.js
  if (window.ALL_DOMAINS) {
    allControls = extractControlsFromDomains(window.ALL_DOMAINS);
    console.log('Loaded controls from local data:', allControls.length);
  } else {
    throw new Error('No control data available');
  }
}

// Extract controls from the ALL_DOMAINS structure
function extractControlsFromDomains(domains) {
  const controls = [];
  
  domains.forEach(domain => {
    domain.subdomains.forEach(subdomain => {
      subdomain.controls.forEach(control => {
        controls.push({
          _id: control.controlId,
          controlReferenceNumber: control.controlReferenceNumber,
          controlClause: control.controlClause,
          controlType: control.controlType,
          domainId: domain.domainId,
          domainName: domain.domainName,
          subdomainId: subdomain.subdomainId,
          subdomainName: subdomain.subdomainName,
          objective: subdomain.objective,
          complianceLevel: control.complianceLevel || '',
          remarks: control.remarks || '',
          correctiveProcedures: control.correctiveProcedures || '',
          expectedComplianceDate: control.expectedComplianceDate || '',
          updatedAt: new Date().toISOString(),
          // Default status if no assessment exists
          assessmentStatus: 'not-assessed'
        });
      });
    });
  });
  
  return controls;
}

// Load assessments data
async function loadAssessmentsData() {
  try {
    const response = await fetch('/api/assessments');
    if (response.ok) {
      assessments = await response.json();
      console.log('Loaded assessments:', assessments.length);
    }
  } catch (error) {
    console.log('No assessments data available');
    assessments = [];
  }
}

// Merge controls with assessment statuses
function processControlsWithAssessments() {
  // Create a map of control ID to assessment status
  const assessmentMap = new Map();
  assessments.forEach(assessment => {
    assessmentMap.set(assessment.controlId, {
      status: assessment.status,
      updatedAt: assessment.updatedAt,
      remarks: assessment.remarks
    });
  });
  
  // Update controls with assessment data
  allControls.forEach(control => {
    const assessment = assessmentMap.get(control._id);
    if (assessment) {
      control.assessmentStatus = mapStatusToClass(assessment.status);
      control.updatedAt = assessment.updatedAt;
      control.assessmentRemarks = assessment.remarks;
    }
  });
  
  filteredControls = [...allControls];
}

// Map assessment status to CSS class names
function mapStatusToClass(status) {
  const statusMap = {
    'Implemented': 'implemented',
    'Partially Implemented': 'partially-implemented',
    'Not Implemented': 'not-implemented',
    'Not Applicable': 'not-applicable',
    'Not Assessed': 'not-assessed'
  };
  return statusMap[status] || 'not-assessed';
}

// Setup filter dropdowns
function setupFilters() {
  // Get unique domains
  const uniqueDomains = [...new Set(allControls.map(c => c.domainName))];
  
  // Populate domain dropdown
  DOM.domainMenu.innerHTML = '<div class="dropdown-item" data-value="">All Domains</div>';
  uniqueDomains.forEach(domain => {
    DOM.domainMenu.innerHTML += `<div class="dropdown-item" data-value="${domain}">${domain}</div>`;
  });
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  DOM.searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value.toLowerCase().trim();
    applyFiltersAndRender();
  });
  
  // Domain dropdown
  setupDropdownEvents(DOM.domainMenu.parentElement, DOM.domainButtonText, (value) => {
    currentFilters.domain = value;
    DOM.domainButtonText.textContent = value || 'All Domains';
    applyFiltersAndRender();
  });
  
  // Status dropdown
  setupDropdownEvents(DOM.statusMenu.parentElement, DOM.statusButtonText, (value) => {
    currentFilters.status = value;
    DOM.statusButtonText.textContent = value || 'All Status';
    applyFiltersAndRender();
  });
}

// Setup dropdown functionality
function setupDropdownEvents(dropdown, buttonText, onSelect) {
  const button = dropdown.querySelector('.dropdown-button');
  const menu = dropdown.querySelector('.dropdown-menu');
  
  // Toggle dropdown
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    menu.classList.toggle('show');
  });
  
  // Handle item selection
  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
      const value = e.target.dataset.value;
      onSelect(value);
      menu.classList.remove('show');
    }
  });
}

// Close all dropdowns when clicking outside
document.addEventListener('click', closeAllDropdowns);

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.classList.remove('show');
  });
}

// Apply filters and render table
function applyFiltersAndRender() {
  // Apply filters
  filteredControls = allControls.filter(control => {
    const matchesSearch = !currentFilters.search || 
      control.controlReferenceNumber.toLowerCase().includes(currentFilters.search) ||
      control.controlClause.toLowerCase().includes(currentFilters.search) ||
      control.domainName.toLowerCase().includes(currentFilters.search);
    
    const matchesDomain = !currentFilters.domain || 
      control.domainName === currentFilters.domain;
    
    const matchesStatus = !currentFilters.status || 
      control.assessmentStatus === currentFilters.status;
    
    return matchesSearch && matchesDomain && matchesStatus;
  });
  
  // Update controls count
  DOM.controlsCount.textContent = `${filteredControls.length} Controls`;
  
  // Render table
  renderControlsTable();
}

// Render the controls table
function renderControlsTable() {
  if (filteredControls.length === 0) {
    DOM.controlsTableBody.innerHTML = '';
    DOM.noResults.style.display = 'block';
    return;
  }
  
  DOM.noResults.style.display = 'none';
  
  const tableHTML = filteredControls.map(control => {
    const statusText = formatStatusText(control.assessmentStatus);
    const lastUpdated = formatDate(control.updatedAt);
    const shortTitle = truncateText(control.controlClause, 100);
    
    return `
      <tr>
        <td>
          <div class="control-reference">${control.controlReferenceNumber}</div>
        </td>
        <td>
          <div class="domain-name" title="${control.domainName}">
            ${truncateText(control.domainName, 30)}
          </div>
        </td>
        <td>
          <div class="control-title" title="${control.controlClause}">
            ${shortTitle}
          </div>
        </td>
        <td>
          <span class="status-badge status-${control.assessmentStatus}">
            ${statusText}
          </span>
        </td>
        <td>
          <div class="last-updated">${lastUpdated}</div>
        </td>
        <td>
          <button class="action-button" 
                  onclick="openControlDetails('${control._id}')"
                  title="View/Edit Control">
            <i class="fas fa-edit"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
  
  DOM.controlsTableBody.innerHTML = tableHTML;
}

// Utility functions
function formatStatusText(status) {
  const statusMap = {
    'implemented': 'Implemented',
    'partially-implemented': 'Partially Implemented',
    'not-implemented': 'Not Implemented',
    'not-applicable': 'Not Applicable',
    'not-assessed': 'Not Assessed'
  };
  return statusMap[status] || 'Not Assessed';
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'N/A';
  }
}

function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function showLoading(show) {
  DOM.loading.style.display = show ? 'block' : 'none';
}

function showError(message) {
  DOM.loading.innerHTML = `<h3>Error</h3><p>${message}</p>`;
  DOM.loading.style.display = 'block';
}

// Control details modal (placeholder for future implementation)
function openControlDetails(controlId) {
  const control = allControls.find(c => c._id === controlId);
  if (control) {
    console.log('Opening control details for:', control.controlReferenceNumber);
    // TODO: Implement modal or navigation to assessment page
    alert(`Control: ${control.controlReferenceNumber}\nStatus: ${formatStatusText(control.assessmentStatus)}\n\nClick OK to continue...`);
  }
}

// Export functions for external use
window.controlsPageAPI = {
  refreshData: initializeControlsPage,
  getFilteredControls: () => filteredControls,
  getAllControls: () => allControls
};