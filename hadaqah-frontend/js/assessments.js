    let assessmentData = {}, currentAssessment = null;
    let totalControls = 0, completedControls = 0;

    async function initAssessment() {
      try {
        const params = new URLSearchParams(location.search);
        currentAssessment = params.get('name') || localStorage.getItem('currentAssessment') || 'New Assessment';
        document.getElementById('assessmentName').textContent = currentAssessment;
        await loadAllDomains();
        renderAssessmentTable();
        updateProgressInfo();
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('assessmentTable').style.display = 'block';
      } catch (e) {
        showError('Failed to load assessment.');
      }
    }

    async function loadAllDomains() {
      const domains = ['domain1','domain2','domain3','domain4'];
      for (let d of domains) {
        // replace this with fetch(`/api/domains/${d}`) in real life
        assessmentData[d] = generateMockDomainData(d);
      }
    }

    function generateMockDomainData(key) {
      const demo = {
        domain1: {
          name: "Domain 1: Cybersecurity Governance",
          subdomains: {
            "Cybersecurity Strategy": [
              { controlType:"Control", referenceNumber:"1-1-1", clauses:"A cybersecurity strategy…", complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" },
              { controlType:"Control", referenceNumber:"1-1-2", clauses:"A roadmap must be…",             complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" },
              { controlType:"Control", referenceNumber:"1-1-3", clauses:"The cybersecurity…",               complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" }
            ]
          }
        },
        domain2: {
          name: "Domain 2: Risk Management",
          subdomains: {
            "Risk Assessment": [
              { controlType:"Control", referenceNumber:"2-1-1", clauses:"Risk assessment…", complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" }
            ]
          }
        },
        domain3: {
          name: "Domain 3: Asset Management",
          subdomains: {
            "Asset Inventory": [
              { controlType:"Control", referenceNumber:"3-1-1", clauses:"A comprehensive…", complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" }
            ]
          }
        },
        domain4: {
          name: "Domain 4: Access Control",
          subdomains: {
            "Identity Management": [
              { controlType:"Control", referenceNumber:"4-1-1", clauses:"Identity management…", complianceLevel:"", correctiveProcedures:"", remarks:"", expectedComplianceDate:"" }
            ]
          }
        }
      };
      return demo[key] || { name:key, subdomains:{} };
    }

    function renderAssessmentTable() {
      const container = document.getElementById('assessmentContent');
      container.innerHTML = '';
      totalControls = 0;
      Object.entries(assessmentData).forEach(([key, domain]) => {
        // Domain section
        const sec = document.createElement('div');
        sec.className = 'domain-section';
        // header
        const h = document.createElement('div');
        h.className = 'domain-header';
        h.textContent = domain.name;
        sec.appendChild(h);
        // subdomains
        for (let [subName, ctrls] of Object.entries(domain.subdomains)) {
          const subH = document.createElement('div');
          subH.className = 'subdomain-header';
          subH.textContent = subName;
          sec.appendChild(subH);
          ctrls.forEach((c,i) => {
            totalControls++;
            sec.appendChild(createControlRow(key, subName, c, `${key}_${subName}_${i}`));
          });
        }
        container.appendChild(sec);
      });
    }

    function createControlRow(domainKey, subName, ctl, id) {
      const row = document.createElement('div');
      row.className = 'control-row';
      row.innerHTML = `
        <div class="control-cell">${assessmentData[domainKey].name.split(':')[0]}</div>
        <div class="control-cell">${subName}</div>
        <div class="control-cell">${ctl.controlType}</div>
        <div class="control-cell"><strong>${ctl.referenceNumber}</strong></div>
        <div class="control-cell"><div class="control-description">${ctl.clauses}</div></div>
        <div class="control-cell">
          <select class="status-dropdown"
            onchange="updateControlStatus('${id}','complianceLevel',this.value)">
            <option value="">Select…</option>
            <option value="compliant"        ${ctl.complianceLevel==='compliant'        ?'selected':''}>Compliant</option>
            <option value="non-compliant"    ${ctl.complianceLevel==='non-compliant'    ?'selected':''}>Non-Compliant</option>
            <option value="partially-compliant"${ctl.complianceLevel==='partially-compliant'?'selected':''}>Partial</option>
            <option value="not-applicable"   ${ctl.complianceLevel==='not-applicable'   ?'selected':''}>N/A</option>
          </select>
        </div>
        <div class="control-cell">
          <textarea class="textarea-field"
            onchange="updateControlStatus('${id}','correctiveProcedures',this.value)"
            placeholder="Corrective…">${ctl.correctiveProcedures}</textarea>
        </div>
        <div class="control-cell">
          <textarea class="textarea-field"
            onchange="updateControlStatus('${id}','remarks',this.value)"
            placeholder="Remarks…">${ctl.remarks}</textarea>
        </div>
        <div class="control-cell">
          <input class="date-input" type="date" value="${ctl.expectedComplianceDate}"
            onchange="updateControlStatus('${id}','expectedComplianceDate',this.value)">
        </div>
      `;
      return row;
    }

    function updateControlStatus(id, field, val) {
      const [dKey, sub, idx] = id.split('_');
      const ctrl = assessmentData[dKey].subdomains[sub][+idx];
      ctrl[field] = val;
      if (field==='complianceLevel') updateProgressInfo();
    }

    function updateProgressInfo() {
      completedControls = 0;
      Object.values(assessmentData).forEach(d=> {
        Object.values(d.subdomains).forEach(arr=>{
          arr.forEach(c=>{
            if (c.complianceLevel) completedControls++;
          });
        });
      });
      const pct = totalControls
        ? Math.round((completedControls/totalControls)*100)
        : 0;
      document.getElementById('progressInfo').textContent =
        `${completedControls} of ${totalControls} controls completed (${pct}%)`;
    }

    function saveAssessment() {
      const payload = {
        name: currentAssessment,
        data: assessmentData,
        progress: { completed:completedControls, total:totalControls }
      };
      localStorage.setItem(`assessment_${currentAssessment}`, JSON.stringify(payload));
      alert('Assessment saved✅');
    }

    async function updateAssessment() {
  try {
    // Gather up all your assessmentData into an array
    const payload = [];
    Object.keys(assessmentData).forEach(domainKey => {
      const domain = assessmentData[domainKey];
      Object.keys(domain.subdomains).forEach(subdomainName => {
        domain.subdomains[subdomainName].forEach(control => {
          // you might have stored an 'id' on each control row
          if (control.controlId) {
            payload.push({
              id:            control.id,                // existing assessment record id
              controlId:     control.controlId,
              sessionId:     currentAssessmentSession,  // whatever identifier you use
              status:        control.complianceLevel,
              remarks:       control.remarks,
              correctiveProcedures: control.correctiveProcedures,
              expectedCompliancePlan: control.expectedComplianceDate
            });
          }
        });
      });
    });

    // Send all changes in one bulk request:
    const res = await fetch('/api/assessments/bulk', {
      method:  'PUT',          // or 'POST' if your backend expects that
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();

    alert('Assessment updated successfully!');
    console.log('Update result:', result);

    // Optionally, re-fetch stats or navigate back:
    // window.location.href = '/dashboard.html';

  } catch (err) {
    console.error('Update failed:', err);
    alert('Failed to update assessment. Please try again.');
  }
}


    function showError(msg) {
      const e = document.getElementById('errorMessage');
      e.textContent = msg;
      e.style.display = 'block';
    }

    document.addEventListener('DOMContentLoaded', initAssessment);
