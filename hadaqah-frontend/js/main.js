
        // API Client Configuration
        class APIClient {
            constructor() {
                this.baseURL = 'http://localhost:5000/api'; // عنوان الباك إند الخاص بك
                this.token = localStorage.getItem('token') || null;
            }

            async request(endpoint, options = {}) {
                const url = `${this.baseURL}${endpoint}`;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers,
                    },
                    ...options,
                };

                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token}`;
                }

                try {
                    const response = await fetch(url, config);
                    
                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message || 'Request failed');
                    }

                    return await response.json();
                } catch (error) {
                    console.error('API Error:', error);
                    throw error;
                }
            }

            async getDashboardStats() {
                return await this.request('/dashboard/stats');
            }

            async getECCControls() {
                return await this.request('/controls');
            }

            async runGapAnalysis() {
                return await this.request('/gap-analysis', { method: 'POST' });
            }

            async generateReport(reportType) {
                return await this.request('/reports/generate', {
                    method: 'POST',
                    body: JSON.stringify({ type: reportType }),
                });
            }
        }

        const api = new APIClient();

        // Load dashboard data
        async function loadDashboardData() {
            try {
                const stats = await api.getDashboardStats();
                updateDashboardStats(stats);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
                // Handle error - show notification or fallback data
            }
        }

        // Update dashboard statistics
        function updateDashboardStats(stats) {
            const statValues = document.querySelectorAll('.stat-value');
            const progressBars = document.querySelectorAll('.progress-fill');
            
            if (stats) {
                statValues[0].textContent = stats.totalControls || 90;
                statValues[1].textContent = stats.compliantControls || 67;
                statValues[2].textContent = stats.gapsIdentified || 18;
                statValues[3].textContent = stats.criticalIssues || 5;

                // Update progress bars
                progressBars[0].style.width = '100%';
                progressBars[1].style.width = `${(stats.compliantControls / stats.totalControls) * 100}%`;
                progressBars[2].style.width = `${(stats.gapsIdentified / stats.totalControls) * 100}%`;
                progressBars[3].style.width = `${(stats.criticalIssues / stats.totalControls) * 100}%`;
            }
        }

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

        // Generate Report
        async function generateReport() {
            try {
                showLoader('Generating report...');
                const report = await api.generateReport('compliance');
                hideLoader();
                
                // Download the report
                const blob = await api.downloadReport(report.id);
                downloadFile(blob, `compliance-report-${new Date().toISOString().split('T')[0]}.pdf`);
                
                showNotification('Report generated successfully!', 'success');
            } catch (error) {
                hideLoader();
                showNotification('Failed to generate report', 'error');
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
