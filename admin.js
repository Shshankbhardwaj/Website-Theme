let allSubmissions = [];
let filteredSubmissions = [];
let authCredentials = null;

// Login functionality
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Store credentials
    authCredentials = btoa(`${username}:${password}`);
    
    try {
        // Test authentication by fetching submissions
        const response = await fetch('/api/get-submissions', {
            headers: {
                'Authorization': `Basic ${authCredentials}`
            }
        });
        
        if (response.ok) {
            // Login successful
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            loadSubmissions();
        } else {
            // Login failed
            errorDiv.textContent = 'Invalid username or password';
            errorDiv.style.display = 'block';
            authCredentials = null;
        }
    } catch (error) {
        errorDiv.textContent = 'Connection error. Please try again.';
        errorDiv.style.display = 'block';
        authCredentials = null;
    }
});

// Logout functionality
function logout() {
    authCredentials = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').style.display = 'none';
}

// Load submissions from API
async function loadSubmissions() {
    const loadingDiv = document.getElementById('loadingIndicator');
    const container = document.getElementById('submissionsContainer');
    
    loadingDiv.style.display = 'block';
    container.innerHTML = '';
    
    try {
        const response = await fetch('/api/get-submissions', {
            headers: {
                'Authorization': `Basic ${authCredentials}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch submissions');
        }
        
        const data = await response.json();
        allSubmissions = data.submissions || [];
        filteredSubmissions = [...allSubmissions];
        
        // Update count
        document.getElementById('totalCount').textContent = `${allSubmissions.length} Application${allSubmissions.length !== 1 ? 's' : ''}`;
        
        // Populate industry filter
        const industries = [...new Set(allSubmissions.map(s => s.industry).filter(Boolean))];
        const industrySelect = document.getElementById('filterIndustry');
        industries.forEach(industry => {
            const option = document.createElement('option');
            option.value = industry;
            option.textContent = industry;
            industrySelect.appendChild(option);
        });
        
        renderSubmissions();
    } catch (error) {
        console.error('Error loading submissions:', error);
        container.innerHTML = '<div class="empty-state"><p style="color: var(--danger-color);">Error loading applications. Please try again.</p></div>';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Apply filters
function applyFilters() {
    const amountFilter = document.getElementById('filterAmount').value;
    const industryFilter = document.getElementById('filterIndustry').value;
    const creditFilter = document.getElementById('filterCredit').value;
    
    filteredSubmissions = allSubmissions.filter(submission => {
        if (amountFilter && submission.funding_amount !== amountFilter) return false;
        if (industryFilter && submission.industry !== industryFilter) return false;
        if (creditFilter && submission.credit_score !== creditFilter) return false;
        return true;
    });
    
    renderSubmissions();
}

// Render submissions
function renderSubmissions() {
    const container = document.getElementById('submissionsContainer');
    
    if (filteredSubmissions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3>No Applications Found</h3>
                <p>There are no applications matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredSubmissions.map(submission => {
        const date = new Date(submission.timestamp);
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="submission-card">
                <div class="submission-header">
                    <div>
                        <div class="submission-id">ID: ${submission.id}</div>
                        <h3 style="margin-top: 0.5rem; color: var(--primary-color);">${submission.company_name || 'N/A'}</h3>
                    </div>
                    <div class="submission-time">${formattedDate}</div>
                </div>
                
                <div class="submission-details">
                    <div class="detail-item">
                        <span class="detail-label">Funding Amount</span>
                        <span class="amount-badge">${submission.funding_amount || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Contact Name</span>
                        <span class="detail-value">${submission.first_name || ''} ${submission.last_name || ''}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${submission.email || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">${submission.phone || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Industry</span>
                        <span class="detail-value">${submission.industry || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Business Bank Account</span>
                        <span class="detail-value">${submission.bank_account || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Monthly Revenue</span>
                        <span class="detail-value">${submission.monthly_revenue || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Time in Business</span>
                        <span class="detail-value">${submission.time_in_business || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Credit Score</span>
                        <span class="detail-value">${submission.credit_score || 'N/A'}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Funding Purpose</span>
                        <span class="detail-value">${submission.funding_purpose || 'N/A'}</span>
                    </div>
                    
                    ${submission.business_address ? `
                        <div class="detail-item">
                            <span class="detail-label">Business Address</span>
                            <span class="detail-value">${submission.business_address}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}
