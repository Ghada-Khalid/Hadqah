// front-end/js/dashboard.js

// Simple wrapper around fetch + JSON
class APIClient {
  constructor() { 
    this.baseURL = '/api'; 
  }
  
  async request(endpoint, opts = {}) {
    const res = await fetch(this.baseURL + endpoint, {
      headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) },
      ...opts
    });
    if (!res.ok) {
      let errMsg = res.statusText;
      try { 
        const errorData = await res.json();
        errMsg = errorData.message || errorData.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }
    return res.json();
  }
  
  getOverallStats() { return this.request('/assessments/stats/overall'); }
  getDomainStats()  { return this.request('/assessments/stats/domain'); }
}

const api = new APIClient();

// Chart instances to manage cleanup
let pieChartInstance = null;
let barChartInstance = null;

// 1) Load & render all dashboard data
async function loadDashboardData() {
  try {
    console.log('Loading dashboard data...');
    
    // Show loading state
    showLoadingState();
    
    // Fetch both stats in parallel
    const [overall, domains] = await Promise.all([
      api.getOverallStats(),
      api.getDomainStats()
    ]);

    console.log('Overall stats:', overall);
    console.log('Domain stats:', domains);

    // Update the top cards with null checks
    updateStatsCards(overall);

    // Update the "latest assessment" subtitle with date
    const latestAssessmentEl = document.getElementById('latest-assessment-name');
    if (latestAssessmentEl) {
      if (overall.lastAssessmentDate) {
        const assessmentDate = new Date(overall.lastAssessmentDate);
        const formattedDate = assessmentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        latestAssessmentEl.textContent = formattedDate;
      } else if (overall.sessionName) {
        latestAssessmentEl.textContent = overall.sessionName;
      } else {
        latestAssessmentEl.textContent = 'No assessments completed yet';
      }
    }

    // Update domain cards if they exist
    if (Array.isArray(domains)) {
      updateDomainCards(domains);
    }

    // Update charts if Chart.js is available - with proper sizing
    if (typeof Chart !== 'undefined') {
      updateChartsWithFixedSizing(overall, domains);
    }

    hideLoadingState();
    showNotification('Dashboard updated successfully!', 'success');

  } catch (err) {
    console.error('Dashboard load failed:', err);
    hideLoadingState();
    showNotification('Failed to load dashboard: ' + err.message, 'error');
  }
}

// Update stats cards
function updateStatsCards(overall) {
  const totalControlsEl = document.getElementById('total-controls');
  const implementedCountEl = document.getElementById('implemented-count');
  const implementedPctEl = document.getElementById('implemented-pct');
  const partialCountEl = document.getElementById('partial-count');
  const partialPctEl = document.getElementById('partial-pct');
  const scoreCountEl = document.getElementById('score-count');

  if (totalControlsEl) totalControlsEl.textContent = overall.total || 0;
  if (implementedCountEl) implementedCountEl.textContent = overall.implemented || 0;
  
  if (implementedPctEl) {
    const implementedPct = overall.total ? Math.round((overall.implemented || 0) / overall.total * 100) : 0;
    implementedPctEl.textContent = `${implementedPct}% of total`;
  }

  if (partialCountEl) partialCountEl.textContent = overall.partiallyImplemented || overall.partially || 0;
  
  if (partialPctEl) {
    const partialCount = overall.partiallyImplemented || overall.partially || 0;
    const partialPct = overall.total ? Math.round(partialCount / overall.total * 100) : 0;
    partialPctEl.textContent = `${partialPct}% of total`;
  }

  if (scoreCountEl) {
    const implemented = overall.implemented || 0;
    const partial = overall.partiallyImplemented || overall.partially || 0;
    const total = overall.total || 0;
    const score = total ? Math.round((implemented + 0.5 * partial) / total * 100) : 0;
    scoreCountEl.textContent = `${score}%`;
  }
}

// Update domain cards with detailed breakdown
function updateDomainCards(domains) {
  const domainCardsContainer = document.getElementById('domain-cards');
  if (!domainCardsContainer) return;

  // Clear existing cards
  domainCardsContainer.innerHTML = '';

  domains.forEach(domain => {
    const total = domain.total || 0;
    const implemented = domain.implemented || 0;
    const partial = domain.partially || 0;
    const missing = domain.missing || 0;
    const na = domain.na || 0;
    
    const pct = total ? Math.round((implemented / total) * 100) : 0;
    
    // Calculate progress bar widths for stacked progress
    const implementedWidth = total ? (implemented / total) * 100 : 0;
    const partialWidth = total ? (partial / total) * 100 : 0;
    const missingWidth = total ? (missing / total) * 100 : 0;
    const naWidth = total ? (na / total) * 100 : 0;
    
    // Get appropriate icon for domain
    const domainIcons = {
      'Cybersecurity Governance': 'fas fa-cogs',
      'Third-Party and Cloud Computing': 'fas fa-cloud',
      'Cybersecurity Resilience': 'fas fa-database',
      'Cybersecurity Defense': 'fas fa-shield-alt'
    };
    const icon = domainIcons[domain.domainName] || 'fas fa-cogs';
    
    const card = document.createElement('div');
    card.className = 'domain-card detailed';
    card.innerHTML = `
      <div class="domain-header">
        <div class="domain-icon">
          <i class="${icon}"></i>
        </div>
        <div class="domain-title">
          <h5>${domain.domainName}</h5>
          <div class="domain-subtitle">Compliance</div>
        </div>
        <div class="domain-percentage">${pct}%</div>
      </div>
      
      <div class="stacked-progress-bar">
        <div class="progress-segment implemented" style="width: ${implementedWidth}%"></div>
        <div class="progress-segment partial" style="width: ${partialWidth}%"></div>
        <div class="progress-segment missing" style="width: ${missingWidth}%"></div>
        <div class="progress-segment na" style="width: ${naWidth}%"></div>
      </div>
      
      <div class="domain-stats">
        <div class="stat-item">
          <span class="stat-dot implemented"></span>
          <span class="stat-text">${implemented} Done</span>
        </div>
        <div class="stat-item">
          <span class="stat-dot partial"></span>
          <span class="stat-text">${partial} Partial</span>
        </div>
        <div class="stat-item">
          <span class="stat-dot missing"></span>
          <span class="stat-text">${missing} Missing</span>
        </div>
        <div class="stat-item">
          <span class="stat-dot na"></span>
          <span class="stat-text">${na} N/A</span>
        </div>
      </div>
    `;
    domainCardsContainer.appendChild(card);
  });
}

// Enhanced chart update with fixed sizing
function updateChartsWithFixedSizing(overall, domains) {
  // Destroy existing charts first
  if (pieChartInstance) {
    pieChartInstance.destroy();
    pieChartInstance = null;
  }
  if (barChartInstance) {
    barChartInstance.destroy();
    barChartInstance = null;
  }

  // Update pie chart with fixed container sizing
  const pieCtx = document.getElementById('overall-pie-chart');
  if (pieCtx) {
    // Ensure canvas has proper dimensions
    const pieContainer = pieCtx.parentElement;
    if (pieContainer) {
      // Set fixed container dimensions
      pieContainer.style.height = '300px';
      pieContainer.style.position = 'relative';
    }
    
    // Reset canvas size
    pieCtx.style.width = '100%';
    pieCtx.style.height = '100%';
    
    pieChartInstance = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Implemented', 'Partially Implemented', 'Not Implemented', 'Not Applicable'],
        datasets: [{
          data: [
            overall.implemented || 0,
            overall.partiallyImplemented || overall.partially || 0,
            overall.missing || 0,
            overall.na || 0
          ],
          backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 10,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((context.parsed / total) * 100) : 0;
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  // Update bar chart with fixed container sizing
  const barCtx = document.getElementById('domain-bar-chart');
  if (barCtx && Array.isArray(domains)) {
    // Ensure canvas has proper dimensions
    const barContainer = barCtx.parentElement;
    if (barContainer) {
      // Set fixed container dimensions
      barContainer.style.height = '300px';
      barContainer.style.position = 'relative';
    }
    
    // Reset canvas size
    barCtx.style.width = '100%';
    barCtx.style.height = '100%';
    
    barChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: domains.map(d => d.domainName || 'Unknown'),
        datasets: [{
          label: 'Compliance %',
          data: domains.map(d => {
            const total = d.total || 0;
            const implemented = d.implemented || 0;
            return total ? Math.round((implemented / total) * 100) : 0;
          }),
          backgroundColor: '#28a745',
          borderColor: '#1e7e34',
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 0,
              font: {
                size: 11
              }
            },
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
}

// Loading state management
function showLoadingState() {
  const refreshBtn = document.querySelector('.action-btn');
  if (refreshBtn) {
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    refreshBtn.disabled = true;
  }
  
  // Add loading overlay to chart containers
  const chartContainers = document.querySelectorAll('.chart-card');
  chartContainers.forEach(container => {
    if (!container.querySelector('.chart-loading')) {
      const loading = document.createElement('div');
      loading.className = 'chart-loading';
      loading.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        color: #6c757d;
        font-size: 14px;
      `;
      loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
      container.style.position = 'relative';
      container.appendChild(loading);
    }
  });
}

function hideLoadingState() {
  const refreshBtn = document.querySelector('.action-btn');
  if (refreshBtn) {
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
    refreshBtn.disabled = false;
  }
  
  // Remove loading overlays
  const loadingElements = document.querySelectorAll('.chart-loading');
  loadingElements.forEach(el => el.remove());
}

// Enhanced toast notification
function showNotification(msg, type = 'info') {
  // Remove existing notifications
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  const notification = document.createElement('div');
  notification.className = `toast ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    max-width: 300px;
  `;
  notification.textContent = msg;
  
  // Add slide-in animation if not exists
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto-remove with slide out animation
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Check for successful assessment save
function checkAssessmentSuccess() {
  const wasSaved = localStorage.getItem('assessmentSaved');
  const count = localStorage.getItem('assessmentCount');
  
  if (wasSaved === 'true') {
    setTimeout(() => {
      showNotification(`Successfully loaded dashboard with ${count || 'new'} assessments!`, 'success');
    }, 500);
    
    // Clear the flags
    localStorage.removeItem('assessmentSaved');
    localStorage.removeItem('assessmentCount');
  }
}

// Auto-invoke on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing dashboard...');
  
  // Initialize chart containers with fixed dimensions
  const chartContainers = document.querySelectorAll('.chart-card');
  chartContainers.forEach(container => {
    container.style.height = '350px';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
  });
  
  loadDashboardData();
  checkAssessmentSuccess();
});

// Manual refresh button - improved selector
document.addEventListener('click', (e) => {
  const refreshBtn = e.target.closest('.action-btn');
  if (refreshBtn && (
    refreshBtn.textContent.includes('Refresh') || 
    refreshBtn.onclick === loadDashboardData ||
    refreshBtn.getAttribute('onclick') === 'loadDashboardData()'
  )) {
    e.preventDefault();
    loadDashboardData();
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (pieChartInstance) {
    pieChartInstance.destroy();
  }
  if (barChartInstance) {
    barChartInstance.destroy();
  }
});

// Make loadDashboardData globally available for onclick handlers
window.loadDashboardData = loadDashboardData;