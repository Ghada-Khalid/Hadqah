
// API client
class APIClient {
  constructor() {
    this.baseURL = 'http://localhost:5000/api'
    this.token   = localStorage.getItem('token')
  }

  async request(endpoint, options = {}) {
    const url    = this.baseURL + endpoint
    const config = {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    }
    if (this.token) config.headers.Authorization = `Bearer ${this.token}`
    const res = await fetch(url, config)
    if (!res.ok) throw new Error((await res.json()).message || res.statusText)
    return res.json()
  }

  // split out your two stats endpoints
  getOverallStats() { return this.request('/assessments/stats/overall') }
  getDomainStats()  { return this.request('/assessments/stats/domain')  }
}
const api = new APIClient()

// front-end loader
async function loadDashboardData() {
  try {
    const [overall, domains] = await Promise.all([
      api.getOverallStats(),
      api.getDomainStats()
    ])
    updateDashboardStats(overall, domains)
  } catch (err) {
    console.error('Dashboard load failed:', err)
    showNotification('Couldn’t load dashboard', 'error')
  }
}

function updateDashboardStats(overall, domains) {
  // overall = { total, implemented, partially, missing, na }
  document.getElementById('total-controls').textContent      = overall.total
  document.getElementById('implemented-count').textContent   = overall.implemented
  document.getElementById('partially-count').textContent     = overall.partially
  document.getElementById('missing-count').textContent       = overall.missing
  document.getElementById('na-count').textContent            = overall.na
  document.getElementById('overall-pct').textContent         =
    `${Math.round(overall.implemented / overall.total * 100)}%`

  // domains is an array [ { domainName, implemented, partially, missing, na, total, pct }, … ]
  domains.forEach(d => {
    const card   = document.querySelector(`#domain-card-${d.domainId}`)
    const pct    = d.pct + '%'
    card.querySelector('.domain-completed').textContent = d.implemented
    card.querySelector('.domain-total').textContent     = d.total
    card.querySelector('.domain-pct').textContent       = pct
    card.querySelector('.domain-bar').style.width       = pct
  })
}

// kick off on load
document.addEventListener('DOMContentLoaded', loadDashboardData)

        // Navigation functionality
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Load different content based on navigation
                const navText = this.textContent.trim();
                loadPageContent(navText);
            });
        });

        // Load page content
        async function loadPageContent(page) {
            const contentArea = document.querySelector('.content-area');
            
            switch(page) {
                case 'Dashboard':
                    await loadDashboardData();
                    break;
                case 'ECC Controls':
                    await loadECCControls();
                    break;
                case 'Gap Analysis':
                    await loadGapAnalysis();
                    break;
                // Add more cases as needed
            }
        }

        // Load ECC Controls
        async function loadECCControls() {
            try {
                const controls = await api.getECCControls();
                displayECCControls(controls);
            } catch (error) {
                console.error('Failed to load ECC controls:', error);
            }
        }

        // Display ECC Controls
        function displayECCControls(controls) {
            const contentArea = document.querySelector('.content-area');
            let controlsHTML = `
                <div class="dashboard-header">
                    <h2 class="dashboard-title">
                        <i class="fas fa-list-check"></i>
                        ECC Controls Management
                    </h2>
                    <button class="action-btn" onclick="showAddControlModal()">
                        <i class="fas fa-plus"></i>
                        Add Control
                    </button>
                </div>
                <div class="controls-grid">
            `;

            controls.forEach(control => {
                controlsHTML += `
                    <div class="control-card">
                        <h4>${control.title}</h4>
                        <p>${control.description}</p>
                        <div class="control-status ${control.status}">${control.status}</div>
                        <div class="control-actions">
                            <button onclick="editControl('${control._id}')">Edit</button>
                            <button onclick="deleteControl('${control._id}')">Delete</button>
                        </div>
                    </div>
                `;
            });

            controlsHTML += '</div>';
            contentArea.innerHTML = controlsHTML;
        }

        // Quick Actions functionality
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', async function() {
                const action = this.textContent.trim();
                
                switch(action) {
                    case 'New Assessment':
                        window.location.href = '/assessment/new';
                        break;
                    case 'Run Gap Analysis':
                        await runGapAnalysis();
                        break;
                    case 'Generate Report':
                        await generateReport();
                        break;
                    case 'Refresh Data':
                        await refreshDashboard();
                        break;
                }
            });
        });

        // Run Gap Analysis
        async function runGapAnalysis() {
            try {
                showLoader('Running gap analysis...');
                const result = await api.runGapAnalysis();
                hideLoader();
                showNotification('Gap analysis completed successfully!', 'success');
                await loadDashboardData(); // Refresh dashboard
            } catch (error) {
                hideLoader();
                showNotification('Failed to run gap analysis', 'error');
            }
        }

        // Refresh dashboard
        async function refreshDashboard() {
            const refreshBtn = document.querySelector('.action-btn');
            const originalText = refreshBtn.innerHTML;
            
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;
            
            try {
                await loadDashboardData();
                showNotification('Dashboard refreshed successfully!', 'success');
            } catch (error) {
                showNotification('Failed to refresh dashboard', 'error');
            } finally {
                setTimeout(() => {
                    refreshBtn.innerHTML = originalText;
                    refreshBtn.disabled = false;
                }, 1000);
            }
        }

        // Utility functions
        function showLoader(message) {
            // Create and show loader
            const loader = document.createElement('div');
            loader.id = 'loader';
            loader.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                    <div style="background: white; padding: 2rem; border-radius: 8px; text-align: center;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-green); margin-bottom: 1rem;"></i>
                        <p>${message}</p>
                    </div>
                </div>
            `;
            document.body.appendChild(loader);
        }

        function hideLoader() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.remove();
            }
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--info)'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        function downloadFile(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }

        // Initialize dashboard on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboardData();
        });

        // Add hover effects to stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 8px 32px rgba(0, 168, 81, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            });
        });

        async function fetchAndComputeStats() {
  // 1. جلب جميع الكنترولز (array of controls) من الباك‑إند
  const res = await fetch('/api/ecc'); 
  const controls = await res.json(); 
  // نُفترض أن كل عنصر فيه { status: 'Implemented'|'Partially Implemented'|'Not Implemented'|'Not Applicable', domain: 'Cybersecurity Governance'|… }

  // 2. احسب الإجماليات العامة
  const total = controls.length;
  const counts = controls.reduce((acc, ctrl) => {
    acc[ctrl.status] = (acc[ctrl.status] || 0) + 1;
    return acc;
  }, {});
  const implemented = counts['Implemented'] || 0;
  const partially   = counts['Partially Implemented'] || 0;
  const missing     = counts['Not Implemented'] || 0;
  const na          = counts['Not Applicable'] || 0;
  const scorePct    = Math.round((implemented / total) * 100);

  // 3. احسب الإحصائيات لكل دومين
  const domains = {};
  controls.forEach(ctrl => {
    const dom = ctrl.domain;
    if (!domains[dom]) {
      domains[dom] = { done:0, partial:0, missing:0, na:0 };
    }
    if (ctrl.status === 'Implemented')           domains[dom].done++;
    else if (ctrl.status === 'Partially Implemented') domains[dom].partial++;
    else if (ctrl.status === 'Not Implemented')       domains[dom].missing++;
    else if (ctrl.status === 'Not Applicable')        domains[dom].na++;
  });
  // وحساب النسبة لكل دومين
  for (const key in domains) {
    const d = domains[key];
    const domTotal = d.done + d.partial + d.missing + d.na;
    d.pct = domTotal ? Math.round((d.done / domTotal) * 100) : 0;
  }

  return {
    total, implemented, partially, missing, na, scorePct,
    domains
  };
}


async function loadDashboard() {
  try {
    // 1. أولاً تجيب آخر assessment/session
    const sessRes = await fetch('/api/assessment-sessions');
    const sessions = await sessRes.json();
    const latest = sessions[sessions.length - 1];
    if (!latest) return console.error('No assessment sessions.');

    // 2. تجيب ملخّص الإحصائيات للـ assessment هذا
    const statsRes = await fetch(`/api/assessments/${latest.id}/summary`);
    const stats = await statsRes.json();
    // ننفترض إن الرد بالشكل:
    // stats = {
    //   totalControls: 99,
    //   implemented: 32,
    //   partially: 40,
    //   missing: 27,
    //   na: 2,
    //   complianceScore: 73,
    //   domains: {
    //     governance: {done:8, partial:18, missing:7, na:2, pct:74},
    //     defense:    {done:24, partial:22, missing:14, na:4, pct:72}
    //   }
    // }

    // 3. حدث القيم في الكروت
    document.getElementById('total-controls').innerText = stats.totalControls;
    document.getElementById('implemented-count').innerText = stats.implemented;
    document.getElementById('implemented-pct').innerText = `${Math.round(stats.implemented/stats.totalControls*100)}% of total`;
    document.getElementById('partial-count').innerText = stats.partially;
    document.getElementById('partial-pct').innerText = `${Math.round(stats.partially/stats.totalControls*100)}% of total`;
    document.getElementById('score-count').innerText = `${stats.complianceScore}%`;
    document.getElementById('score-pct').innerText = 'Overall compliance rate';

    // 4. حدث شريط الـ pie-chart عبر تغيير الزاوية في CSS
    const implementedDeg = (stats.implemented / stats.totalControls) * 360;
    const partialDeg    = (stats.partially    / stats.totalControls) * 360;
    const missingDeg    = (stats.missing      / stats.totalControls) * 360;
    document.querySelector('.pie-chart')
      .style.background = `conic-gradient(var(--success) 0deg ${implementedDeg}deg,
                                           var(--warning) ${implementedDeg}deg ${implementedDeg+partialDeg}deg,
                                           var(--danger) ${implementedDeg+partialDeg}deg ${implementedDeg+partialDeg+missingDeg}deg,
                                           #ccc ${implementedDeg+partialDeg+missingDeg}deg 360deg)`;

    // 5. حدث دومين كاردز
    const gov = stats.domains.governance;
    document.querySelector('#governance-card .compliance-percentage')
            .innerText = gov.pct + '%';
    document.querySelector('#governance-card .progress-fill')
            .style.width = gov.pct + '%';
    // وتكرر لباقي الأرقام داخل هذا الكارد (done, partial, missing, na)

    const def = stats.domains.defense;
    document.querySelector('#defense-card .compliance-percentage')
            .innerText = def.pct + '%';
    document.querySelector('#defense-card .progress-fill')
            .style.width = def.pct + '%';
    // وهكذا

  } catch (e) {
    console.error('Error loading dashboard:', e);
  }
}

// تشغّل الدالة عند تحميل الصفحة وعند الضغط على زر “Refresh Data”
window.addEventListener('load', loadDashboard);
document.querySelector('.action-btn i.fa-sync-alt')
        .closest('button')
        .addEventListener('click', loadDashboard);


// 1. Load & render assessment results
async function loadAssessmentResults() {
  try {
    // fetch all controls & assessments
    const [cRes, aRes] = await Promise.all([
      fetch('/api/controls'),
      fetch('/api/assessments')
    ]);
    const [controls, assessments] = await Promise.all([cRes.json(), aRes.json()]);

    // no assessments → early exit
    if (!assessments.length) {
      document.querySelector('.assessment-results').innerHTML =
        '<p>No assessments found. Start your first assessment!</p>';
      return;
    }

    // latest assessment identifier (timestamp or ID)
    const latest = assessments.sort((a,b) =>
      new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];
    document.getElementById('latest-assessment-name')
      .textContent = latest._id;

    // compute stats
    const total = controls.length;
    const counts = assessments.reduce((acc, x) => {
      acc[x.status] = (acc[x.status] || 0) + 1;
      return acc;
    }, {});
    const implemented = counts['Implemented'] || 0;
    const partial     = counts['Partially Implemented'] || 0;
    const missing     = counts['Not Implemented'] || 0;
    const na          = counts['Not Applicable'] || 0;
    const scorePct    = total > 0
      ? Math.round(((implemented + partial) / total) * 100)
      : 0;

    // update stat cards
    document.getElementById('total-controls').textContent = total;
    document.getElementById('implemented-count').textContent = implemented;
    document.getElementById('implemented-pct').textContent =
      `${Math.round((implemented/total)*100)}% of total`;
    document.getElementById('partial-count').textContent = partial;
    document.getElementById('partial-pct').textContent =
      `${Math.round((partial/total)*100)}% of total`;
    document.getElementById('score-count').textContent = `${scorePct}%`;

    // draw charts (requires Chart.js loaded separately)
    drawPieChart('overall-pie-chart', {
      'Implemented': implemented,
      'Partially Implemented': partial,
      'Not Implemented': missing,
      'Not Applicable': na
    });
    drawBarChart('domain-bar-chart', controls, assessments);

    // render domain cards
    renderDomainCards(controls, assessments);
  } catch (err) {
    console.error('Assessment Results Error:', err);
  }
}

// 2. Render domain cards below charts
function renderDomainCards(controls, assessments) {
  const container = document.getElementById('domain-cards');
  container.innerHTML = '';

  // group by domain
  const domains = {};
  controls.forEach(ctrl => {
    domains[ctrl._id] = {
      name: ctrl.domainName,
      done: 0, partial: 0, missing: 0, na: 0, total: 0
    };
  });
  assessments.forEach(a => {
    const dom = domains[a.control.toString()];
    if (!dom) return;
    dom.total++;
    if (a.status === 'Implemented') dom.done++;
    else if (a.status === 'Partially Implemented') dom.partial++;
    else if (a.status === 'Not Implemented') dom.missing++;
    else if (a.status === 'Not Applicable') dom.na++;
  });

  // create a card for each domain
  Object.values(domains).forEach(d => {
    const pct = d.total > 0
      ? Math.round((d.done / d.total) * 100)
      : 0;
    const el = document.createElement('div');
    el.className = 'domain-card';
    el.innerHTML = `
      <h5>${d.name}</h5>
      <div class="compliance-percentage">${pct}%</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${pct}%"></div>
      </div>
      <ul class="domain-stats-list">
        <li>🟢 ${d.done} Done</li>
        <li>🟡 ${d.partial} Partial</li>
        <li>🔴 ${d.missing} Missing</li>
        <li>🔵 ${d.na} N/A</li>
      </ul>
    `;
    container.appendChild(el);
  });
}

// 3. Hook into page load
document.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();      // existing
  loadAssessmentResults();  // new
});

// -------------------------------------
// State & DOM refs
let controls = [],
    domainsList = [],
    assessments = [];
const refs = {
  searchInput: document.getElementById('searchInput'),
  domainDropdown: document.getElementById('domainDropdown'),
  statusDropdown: document.getElementById('statusDropdown'),
  domainButtonText: document.getElementById('domainButtonText'),
  statusButtonText: document.getElementById('statusButtonText'),
  controlsTableBody: document.getElementById('controlsTableBody'),
  controlsCount: document.getElementById('controlsCount'),
  loading: document.getElementById('loading'),
  noResults: document.getElementById('noResults')
};
let filters = { search: '', domain: '', status: '' };

// Load all needed data from backend
async function loadAllData() {
  refs.loading.style.display = 'block';
  try {
    // Fetch controls and assessments only
    const [ctrlRes, asrRes] = await Promise.all([
      fetch('/api/controls'),
      fetch('/api/assessments')
    ]);
    if (!ctrlRes.ok || !asrRes.ok) throw new Error('Fetch error');

    const controlsData = await ctrlRes.json();
    const assessments = await asrRes.json();

    // merge assessment statuses in
    const statusMap = new Map(assessments.map(a => [a.controlId, a.status]));
    controls = controlsData.map(c => ({
      ...c,
      assessmentStatus: statusMap.get(c._id) || 'not-assessed'
    }));

    // derive unique domains
    const domains = Array.from(
      new Set(controls.map(c => c.domainName))
    );

    initFilters(domains);
    applyFilters();
  } catch(e) {
    refs.loading.innerHTML = '<h3>Error loading controls</h3>';
    console.error(e);
  } finally {
    refs.loading.style.display = 'none';
  }
}


// Setup search & dropdown filters
function initFilters(domains) {
  // populate domain dropdown
  const dMenu = refs.domainDropdown.querySelector('.dropdown-menu');
  dMenu.innerHTML = `<div class="dropdown-item" data-value="">All Domains</div>`;
  domains.forEach(domainName => {
    dMenu.insertAdjacentHTML(
      'beforeend',
      `<div class="dropdown-item" data-value="${domainName}">${domainName}</div>`
    );
  });
  // Event listeners
  refs.searchInput.addEventListener('input', e => {
    filters.search = e.target.value.toLowerCase();
    applyFilters();
  });
  setupDropdown(refs.domainDropdown, value => {
    refs.domainButtonText.textContent = value || 'All Domains';
    filters.domain = value;
    applyFilters();
  });
  setupDropdown(refs.statusDropdown, value => {
    refs.statusButtonText.textContent = value || 'All Status';
    filters.status = value;
    applyFilters();
  });
}

function setupDropdown(container, onSelect) {
  const button = container.querySelector('.dropdown-button');
  const menu   = container.querySelector('.dropdown-menu');
  button.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    menu.classList.toggle('show');
  });
  menu.addEventListener('click', e => {
    if (e.target.classList.contains('dropdown-item')) {
      onSelect(e.target.dataset.value);
      menu.classList.remove('show');
    }
  });
  document.addEventListener('click', e => {
    if (!container.contains(e.target)) menu.classList.remove('show');
  });
}

// Apply filters and render table
function applyFilters() {
  let filtered = controls.filter(c => {
    const textMatch = !filters.search ||
      c.controlReferenceNumber.toLowerCase().includes(filters.search) ||
      c.controlClause.toLowerCase().includes(filters.search);
    const domainMatch = !filters.domain || c.domainName === filters.domain;
    const statusMatch = !filters.status || c.assessmentStatus === filters.status;
    return textMatch && domainMatch && statusMatch;
  });
  renderTable(filtered);
}

function renderTable(list) {
  refs.controlsCount.textContent = `${list.length} Controls`;
  if (!list.length) {
    refs.controlsTableBody.innerHTML = '';
    refs.noResults.style.display = 'block';
    return;
  }
  refs.noResults.style.display = 'none';
  refs.controlsTableBody.innerHTML = list.map(c => `
    <tr>
      <td><div class="control-reference">${c.controlReferenceNumber}</div></td>
      <td><div class="domain-name">${c.domainName}</div></td>
      <td><div class="control-title">${c.controlClause}</div></td>
      <td><span class="status-badge status-${c.assessmentStatus}">\${c.assessmentStatus.replace('-', ' ')}</span></td>
      <td><div class="last-updated">${new Date(c.updatedAt).toLocaleDateString()}</div></td>
      <td><button class="action-button" onclick="openAssessmentModal('${c._id}')">✏️</button></td>
    </tr>`).join('');
}

// Assessment modal launcher (implement separately)
function openAssessmentModal(controlId) {
  // TODO: fetch details, show modal, allow status change & notes
  console.log('Open modal for', controlId);
}

// Bootstrap
document.addEventListener('DOMContentLoaded', loadAllData);

// --------------------------------

// Fetch overall stats and per-domain stats, then paint them into your DOM.
  async function loadDashboard() {
    try {
      // 1) get the latest session
      const sess = await fetch('/api/assessment-sessions');
      const sessions = await sess.json();
      if (!sessions.length) return;
      const latest = sessions[sessions.length - 1];

      // 2) get overall stats
      const statsRes = await fetch('/api/assessments/stats');
      const stats    = await statsRes.json();
      // e.g. { implemented:39, partiallyImplemented:12, notImplemented:5, notApplicable:3 }

      // 3) get per-domain breakdown
      const domRes  = await fetch('/api/assessments/domain-stats');
      const domains = await domRes.json();
      // e.g. [ { domainId:1, domainName:"Cybersecurity Governance", implemented:20, total:29 }, … ]

      // 4) update your widgets
      document.getElementById('implemented-count').textContent = stats.implemented;
      document.getElementById('partial-count').textContent     = stats.partiallyImplemented;
      document.getElementById('missing-count').textContent     = stats.notImplemented;
      document.getElementById('na-count').textContent          = stats.notApplicable;
      document.getElementById('overall-pct').textContent       =
        Math.round((stats.implemented / (stats.implemented + stats.partiallyImplemented + stats.notImplemented + stats.notApplicable)) * 100) + '%';

      // 5) update each domain card
      domains.forEach(d => {
        const pct = d.total ? Math.round((d.implemented / d.total) * 100) : 0;
        const card = document.querySelector(`#domain-card-${d.domainId}`);
        if (!card) return;
        card.querySelector('.domain-completed').textContent = d.implemented;
        card.querySelector('.domain-total').textContent     = d.total;
        card.querySelector('.domain-pct').textContent       = pct + '%';
        card.querySelector('.domain-bar').style.width       = pct + '%';
      });

    } catch (err) {
      console.error('Dashboard load error', err);
    }
  }


  // After your loadDashboard() definition…

window.addEventListener('load', () => {
  loadDashboardData();
  loadAssessmentResults();    // ← make sure this runs on load
});

// And if you still want a “Refresh” button:
document.querySelector('.action-btn i.fa-sync-alt')
  .closest('button')
  .addEventListener('click', () => {
    loadDashboardData();
    loadAssessmentResults();
  });

async function loadDashboardStats() {
  try {
    const [overallRes, domainRes] = await Promise.all([
      fetch('/api/assessments/stats/overall'),
      fetch('/api/assessments/stats/domain')
    ]);
    const overall = await overallRes.json();
    const domains = await domainRes.json();

    // populate your stat cards and charts here...
  } catch (err) {
    console.error('Dashboard load error:', err);
  }
}

window.addEventListener('DOMContentLoaded', loadDashboardStats);


  // run on page load
  document.addEventListener('DOMContentLoaded', loadDashboard);
// hadaqah-frontend/js/dashboard.js

// 1) call your API to make a new session
async function createNewSession() {
  const resp = await fetch('/api/assessment-sessions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ /* any payload your API needs */ })
  });
  if (!resp.ok) throw new Error('Failed to create session');
  return resp.json();  // { _id: "...", name: "My session name" }
}

// 2) wire up your button
document.getElementById('newAssessmentBtn')
  .addEventListener('click', async () => {
    try {
      const session = await createNewSession();
      // redirect with a real MongoDB _id (string) and the name
      window.location.href = `/assessments.html?sessionId=${session._id}&name=${encodeURIComponent(session.name)}`;
    } catch (err) {
      alert('Could not start a new assessment: ' + err.message);
    }
  });


  document.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();
});
