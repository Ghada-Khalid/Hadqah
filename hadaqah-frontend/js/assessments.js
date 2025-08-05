// js/assessments.js

let assessmentData = [];
let totalControls  = 0;
let isExistingAssessment = false;

// 1) Entry point
async function initAssessment() {
  // ——— 1) Session ID setup ———
  const params = new URLSearchParams(location.search);
  let sidRaw   = params.get('sessionId');
  let sidNum   = sidRaw ? parseInt(sidRaw, 10) : NaN;

  // If missing or not a number, generate one and update the URL
  if (!sidRaw || Number.isNaN(sidNum)) {
    sidNum = Date.now();
    params.set('sessionId', sidNum);
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
  }
  window.sessionId = sidNum;

  // ——— 2) Page title ———
  const current = params.get('name')
               || localStorage.getItem('currentAssessment')
               || 'New Assessment';
  document.getElementById('assessmentName').textContent = current;

  try {
    // ——— 3) Load your control data ———
    if (!Array.isArray(window.ALL_DOMAINS)) {
      throw new Error('ALL_DOMAINS not found or not an array');
    }
    assessmentData = window.ALL_DOMAINS;

    // ——— 4) Load existing assessment data if available ———
    await loadExistingAssessmentData();

    // ——— 5) Render & wire up UI ———
    renderAssessmentTable();
    updateProgress();
    updateSaveButton();
    bindProgressListeners();

    document.getElementById('saveBtn')
            .addEventListener('click', saveAssessment);
    
    document.getElementById('updateBtn')
            .addEventListener('click', updateAssessment);

    // ——— 6) Show table, hide loader ———
    document.getElementById('loadingMessage').style.display  = 'none';
    document.getElementById('assessmentTable').style.display = 'block';

  } catch (e) {
    console.error('initAssessment error:', e);
    showError('Failed to load assessment: ' + e.message);
  }
}

// Load existing assessment data
async function loadExistingAssessmentData() {
  try {
    const response = await fetch(`/api/assessments?sessionId=${window.sessionId}`);
    if (response.ok) {
      const existingAssessments = await response.json();
      if (existingAssessments && existingAssessments.length > 0) {
        isExistingAssessment = true;
        // Store the existing data for later use when rendering
        window.existingAssessmentData = existingAssessments;
        console.log('Loaded existing assessment data:', existingAssessments);
      }
    }
  } catch (error) {
    console.log('No existing assessment data found, starting fresh');
  }
}

// 2) build table rows
function renderAssessmentTable() {
  const container = document.getElementById('assessmentContent');
  container.innerHTML = '';
  totalControls = 0;

  assessmentData.forEach(domain => {
    // domain header
    const dh = document.createElement('div');
    dh.className = 'domain-header';
    dh.textContent = `${domain.domainId}. ${domain.domainName}`;
    container.appendChild(dh);

    domain.subdomains.forEach(sub => {
      const sh = document.createElement('div');
      sh.className = 'subdomain-header';
      sh.textContent = sub.subdomainName;
      container.appendChild(sh);

      sub.controls.forEach(ctrl => {
        totalControls++;
        const controlRow = createControlRow(
          domain.domainName,
          sub.subdomainName,
          ctrl.controlType,
          ctrl.controlReferenceNumber,
          ctrl.controlClause
        );
        
        // Load existing data if available
        loadExistingControlData(controlRow, ctrl.controlReferenceNumber);
        
        container.appendChild(controlRow);
      });
    });
  });
}

// Load existing data for a specific control
function loadExistingControlData(controlRow, controlRef) {
  if (!window.existingAssessmentData) return;
  
  const existingData = window.existingAssessmentData.find(
    assessment => assessment.control && assessment.control.referenceNumber === controlRef
  );
  
  if (existingData) {
    const statusDropdown = controlRow.querySelector('.status-dropdown');
    const correctiveTextarea = controlRow.querySelector('.corrective-textarea');
    const remarksTextarea = controlRow.querySelector('.remarks-textarea');
    const dateInput = controlRow.querySelector('.date-input');
    
    // Map status back to frontend format
    const statusMap = {
      'compliant': 'Implemented',
      'non-compliant': 'Not Implemented',
      'partially-compliant': 'Partially Implemented',
      'not-applicable': 'Not Applicable'
    };
    
    if (statusDropdown) {
      statusDropdown.value = statusMap[existingData.status] || existingData.status;
    }
    if (correctiveTextarea) {
      correctiveTextarea.value = existingData.correctiveProcedures || '';
    }
    if (remarksTextarea) {
      remarksTextarea.value = existingData.remarks || '';
    }
    if (dateInput && existingData.expectedComplianceDate) {
      // Convert date to YYYY-MM-DD format for input
      const date = new Date(existingData.expectedComplianceDate);
      if (!isNaN(date.getTime())) {
        dateInput.value = date.toISOString().split('T')[0];
      }
    }
  }
}

// 3) one control row
function createControlRow(mainDomain, subdomain, type, ref, clause) {
  const row = document.createElement('div');
  row.className = 'control-row';
  row.innerHTML = `
    <div class="control-cell">${mainDomain}</div>
    <div class="control-cell">${subdomain}</div>
    <div class="control-cell">${type}</div>
    <div class="control-cell"><strong>${ref}</strong></div>
    <div class="control-cell">
      <div class="control-description">${clause}</div>
    </div>
    <div class="control-cell">
      <select class="status-dropdown" data-control-id="${ref}">
        <option value="">Select…</option>
        <option value="Implemented">Compliant</option>
        <option value="Not Implemented">Non-Compliant</option>
        <option value="Partially Implemented">Partial</option>
        <option value="Not Applicable">N/A</option>
      </select>
    </div>
    <div class="control-cell">
      <textarea class="textarea-field corrective-textarea" placeholder="Corrective procedures..."></textarea>
    </div>
    <div class="control-cell">
      <textarea class="textarea-field remarks-textarea" placeholder="Remarks..."></textarea>
    </div>
    <div class="control-cell">
      <input class="date-input" type="date">
    </div>
  `;
  return row;
}

// 4) progress
function updateProgress() {
  const done = Array.from(document.querySelectorAll('.status-dropdown'))
    .filter(sel => sel.value).length;
  const pct = totalControls
    ? Math.round((done / totalControls) * 100)
    : 0;

  document.getElementById('progress-text').textContent =
    `${done} of ${totalControls} controls completed (${pct}%)`;
  document.getElementById('progress-bar').style.width = `${pct}%`;
}

// 5) save button label and update button visibility
function updateSaveButton() {
  const done = Array.from(document.querySelectorAll('.status-dropdown'))
    .filter(sel => sel.value).length;
  const saveBtn = document.getElementById('saveBtn');
  const updateBtn = document.getElementById('updateBtn');
  
  if (isExistingAssessment) {
    saveBtn.style.display = 'none';
    updateBtn.style.display = 'inline-block';
    updateBtn.textContent = done ? `Update ${done} Assessments` : 'Update Assessment';
    updateBtn.disabled = false; // Allow updates even with 0 changes
  } else {
    saveBtn.textContent = done ? `Save ${done} Assessments` : 'Save 0 Assessments';
    saveBtn.disabled = done === 0;
    updateBtn.style.display = 'none';
  }
}

// 6) listen for changes
function bindProgressListeners() {
  document.querySelectorAll('.status-dropdown').forEach(sel => {
    sel.addEventListener('change', () => {
      updateProgress();
      updateSaveButton();
    });
  });
}

// 7) build payload
function collectAssessmentPayload() {
  return Array.from(document.querySelectorAll('.status-dropdown'))
    .filter(sel => sel.value)
    .map(sel => ({
      controlId:            sel.dataset.controlId,
      sessionId:            window.sessionId,
      status:               sel.value,   // "Implemented", etc.
      correctiveProcedures: sel.closest('.control-row')
                               .querySelector('.corrective-textarea')
                               .value.trim(),
      remarks:              sel.closest('.control-row')
                               .querySelector('.remarks-textarea')
                               .value.trim(),
      expectedComplianceDate: sel.closest('.control-row')
                               .querySelector('.date-input')
                               .value || null,
      updatedAt:            new Date().toISOString()
    }));
}

// 8) save assessment (first time)
async function saveAssessment() {
  const btn  = document.getElementById('saveBtn');
  const done = Array.from(document.querySelectorAll('.status-dropdown'))
    .filter(sel => sel.value).length;
  
  if (!done) {
    showError('Please complete at least one assessment before saving.');
    return;
  }

  // Show saving state
  btn.disabled    = true;
  btn.textContent = 'Saving…';

  try {
    console.log('Saving assessments...');
    const payload = collectAssessmentPayload();
    console.log('Assessment payload:', payload);

    const response = await fetch('/api/assessments/batch', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ assessments: payload })
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Save result:', result);

    // Show success message
    showSuccessMessage(`✅ Successfully saved ${result.count} assessments!`);
    
    // Mark as existing assessment
    isExistingAssessment = true;
    updateSaveButton();
    
    // Store success flag for the dashboard
    localStorage.setItem('assessmentSaved', 'true');
    localStorage.setItem('assessmentCount', result.count.toString());

  } catch (error) {
    console.error('Save error:', error);
    showError(`Failed to save assessments: ${error.message}`);
    
    // Reset button state
    btn.textContent = `Save ${done} Assessments`;
    btn.disabled = false;
  }
}

// 9) update assessment (for existing assessments)
async function updateAssessment() {
  const btn = document.getElementById('updateBtn');
  
  // Show updating state
  btn.disabled = true;
  btn.textContent = 'Updating…';

  try {
    console.log('Updating assessments...');
    const payload = collectAssessmentPayload();
    console.log('Update payload:', payload);

    const response = await fetch('/api/assessments/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessments: payload })
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Update result:', result);

    // Show success message
    showSuccessMessage(`✅ Successfully updated ${result.count} assessments!`);
    
    // Store success flag for the dashboard
    localStorage.setItem('assessmentSaved', 'true');
    localStorage.setItem('assessmentCount', result.count.toString());

  } catch (error) {
    console.error('Update error:', error);
    showError(`Failed to update assessments: ${error.message}`);
  } finally {
    // Reset button state
    const done = Array.from(document.querySelectorAll('.status-dropdown'))
      .filter(sel => sel.value).length;
    btn.textContent = `Update ${done} Assessments`;
    btn.disabled = false;
  }
}

// 10) Enhanced UI feedback functions
function showError(msg) {
  const errorEl = document.getElementById('errorMessage');
  const successEl = document.getElementById('successMessage');
  
  // Hide success message
  if (successEl) successEl.style.display = 'none';
  
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    errorEl.className = 'error';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  } else {
    // Fallback to alert if element not found
    alert('Error: ' + msg);
  }
}

function showSuccessMessage(msg) {
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');
  
  // Hide error message
  if (errorEl) errorEl.style.display = 'none';
  
  if (successEl) {
    successEl.textContent = msg;
    successEl.style.display = 'block';
    successEl.className = 'success';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      successEl.style.display = 'none';
    }, 3000);
  } else {
    // Fallback to alert
    alert(msg);
  }
}

// 11) Enhanced initialization with error handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('Assessments page loading...');
  
  // Check if we have the required dependencies
  if (typeof window.ALL_DOMAINS === 'undefined') {
    console.error('ALL_DOMAINS not loaded');
    showError('Control data failed to load. Please refresh the page.');
    return;
  }
  
  try {
    initAssessment();
  } catch (error) {
    console.error('Failed to initialize assessment:', error);
    showError('Failed to initialize assessment: ' + error.message);
  }
});