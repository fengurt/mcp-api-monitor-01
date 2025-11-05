// Application State
let currentUser = null;
let apis = [];
let models = [];

// Storage Keys
const STORAGE_KEYS = {
    users: 'api_monitor_users',
    currentUser: 'api_monitor_current_user',
    apis: 'api_monitor_apis',
    models: 'api_monitor_models',
    defaultModels: 'api_monitor_default_models'
};

// Default AI Models (available to all users)
const DEFAULT_AI_MODELS = [
    {
        id: 'default-kimik2',
        name: 'kimik2',
        type: 'custom',
        capability: 'text_generc',
        endpoint: 'https://api.example.com/v1/chat/completions',
        apiKey: 'sk-xa38DwjXXXXXXXXXXXXXXXXXXXX',
        modelName: 'kimi-k2-090',
        context: 256000,
        isDefault: true,
        isAdminOnly: false
    },
    {
        id: 'default-vanahom-a',
        name: 'vanahom-a',
        type: 'custom',
        capability: 'text_generc',
        endpoint: 'https://one.example.com/v1/chat/completions',
        apiKey: 'sk-5oIl4H7]XXXXXXXXXXXXXXXXXXXX',
        modelName: 'claude-opu',
        context: 2000000,
        isDefault: true,
        isAdminOnly: false
    },
    {
        id: 'default-apuch-hub',
        name: 'apuch-hub',
        type: 'custom',
        capability: 'text_generc',
        endpoint: 'https://hk-api.example.com/v1/chat/completions',
        apiKey: 'sk-BsZygfMXXXXXXXXXXXXXXXXXXXX',
        modelName: 'deepseek-v3',
        context: 4096,
        isDefault: true,
        isAdminOnly: false
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeEventListeners();
    loadData();
});

// Check Authentication
function checkAuth() {
    const userStr = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (userStr) {
        currentUser = JSON.parse(userStr);
        // Initialize default models if not exists
        initializeDefaultModels();
        showApp();
    } else {
        showAuth();
    }
}

// Initialize Default Models
function initializeDefaultModels() {
    const stored = localStorage.getItem(STORAGE_KEYS.defaultModels);
    if (!stored) {
        localStorage.setItem(STORAGE_KEYS.defaultModels, JSON.stringify(DEFAULT_AI_MODELS));
    }
}

// Check if user is admin
function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

// Get all models (default + user's custom models)
function getAllModels() {
    const defaultModels = JSON.parse(localStorage.getItem(STORAGE_KEYS.defaultModels) || '[]');
    return [...defaultModels, ...models];
}

// Mask API key (show only first few chars)
function maskApiKey(key, showFull = false) {
    if (!key) return 'Not set';
    if (showFull || isAdmin()) {
        return key;
    }
    // Show first 8 chars and mask the rest
    if (key.length > 8) {
        return key.substring(0, 8) + '•'.repeat(Math.min(key.length - 8, 20));
    }
    return '•'.repeat(key.length);
}

// Show Authentication Screen
function showAuth() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
}

// Show Application Screen
function showApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    if (currentUser) {
        const userInfo = currentUser.email;
        if (isAdmin()) {
            document.getElementById('userEmail').textContent = `${userInfo} (Admin)`;
            document.getElementById('userEmail').style.color = 'var(--primary-color)';
            document.getElementById('adminBadge').style.display = 'inline-block';
        } else {
            document.getElementById('userEmail').textContent = userInfo;
            document.getElementById('userEmail').style.color = '';
            document.getElementById('adminBadge').style.display = 'none';
        }
    }
    renderDashboard();
    renderModels();
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Auth tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchAuthTab(tab);
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            switchPage(page);
        });
    });

    // Add API
    document.getElementById('analyzeBtn').addEventListener('click', analyzeApiCode);
    document.getElementById('clearInputBtn').addEventListener('click', clearInput);
    document.getElementById('saveApiBtn').addEventListener('click', saveApi);
    
    // Models
    document.getElementById('addModelBtn').addEventListener('click', () => {
        document.getElementById('addModelModal').style.display = 'block';
    });
    document.getElementById('addModelForm').addEventListener('submit', handleAddModel);
    
    // Modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Search
    document.getElementById('apiSearch').addEventListener('input', filterApis);
}

// Switch Auth Tab
function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
    document.getElementById('authError').classList.remove('show');
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { 
            email: user.email, 
            name: user.name, 
            role: user.role || 'user' 
        };
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
        initializeDefaultModels();
        showApp();
    } else {
        showAuthError('Invalid email or password');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
    
    if (users.find(u => u.email === email)) {
        showAuthError('Email already registered');
        return;
    }
    
    // First user becomes admin, others are regular users
    const isFirstUser = users.length === 0;
    const role = isFirstUser ? 'admin' : 'user';
    
    users.push({ name, email, password, role });
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    
    currentUser = { email, name, role };
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
    
    // Initialize default models for new user
    initializeDefaultModels();
    showApp();
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    showAuth();
}

// Show Auth Error
function showAuthError(message) {
    const errorEl = document.getElementById('authError');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

// Switch Page
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${page}Page`).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    if (page === 'dashboard') {
        renderDashboard();
    } else if (page === 'models') {
        renderModels();
    }
}

// Load Data
function loadData() {
    apis = JSON.parse(localStorage.getItem(STORAGE_KEYS.apis) || '[]');
    models = JSON.parse(localStorage.getItem(STORAGE_KEYS.models) || '[]');
}

// Save Data
function saveData() {
    localStorage.setItem(STORAGE_KEYS.apis, JSON.stringify(apis));
    localStorage.setItem(STORAGE_KEYS.models, JSON.stringify(models));
}

// Analyze API Code with AI
async function analyzeApiCode() {
    const code = document.getElementById('apiCodeInput').value.trim();
    if (!code) {
        alert('Please paste your API code first');
        return;
    }
    
    // Show loading
    const analyzeBtn = document.getElementById('analyzeBtn');
    const originalText = analyzeBtn.textContent;
    analyzeBtn.textContent = '🤖 Analyzing...';
    analyzeBtn.disabled = true;
    
    try {
        // Simulate AI analysis (in production, this would call an AI API)
        const analysis = await simulateAIAnalysis(code);
        
        document.getElementById('analysisContent').innerHTML = `
            <pre>${JSON.stringify(analysis, null, 2)}</pre>
        `;
        document.getElementById('analysisResult').style.display = 'block';
        
        // Pre-fill form
        document.getElementById('apiName').value = analysis.name || '';
        document.getElementById('apiDescription').value = analysis.description || '';
        
        // Store analysis result
        window.currentAnalysis = analysis;
        
    } catch (error) {
        alert('Analysis failed: ' + error.message);
    } finally {
        analyzeBtn.textContent = originalText;
        analyzeBtn.disabled = false;
    }
}

// Simulate AI Analysis (Replace with actual AI API call)
async function simulateAIAnalysis(code) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract information from code using regex patterns
    const urlMatch = code.match(/https?:\/\/[^\s'"]+/);
    const apiKeyMatch = code.match(/['"](api_key|apiKey|apikey)['"]\s*[:=]\s*['"]([^'"]+)['"]/i);
    const methodMatch = code.match(/method\s*[:=]\s*['"](GET|POST|PUT|DELETE|PATCH)['"]/i) || 
                        code.match(/\.(get|post|put|delete|patch)\(/i);
    const headersMatch = code.match(/headers\s*[:=]\s*\{([^}]+)\}/s);
    
    const url = urlMatch ? urlMatch[0] : '';
    const apiKey = apiKeyMatch ? apiKeyMatch[2] : '';
    const method = methodMatch ? (methodMatch[1] || methodMatch[0].toUpperCase()) : 'GET';
    
    // Extract endpoint name from URL
    const urlParts = url.split('/');
    const endpointName = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || 'API';
    
    return {
        name: endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + ' API',
        description: `API endpoint discovered from code analysis`,
        endpoint: url,
        method: method,
        apiKey: apiKey,
        headers: headersMatch ? parseHeaders(headersMatch[1]) : {},
        detectedFields: extractFields(code),
        sampleCode: code
    };
}

// Parse Headers
function parseHeaders(headerStr) {
    const headers = {};
    const matches = headerStr.matchAll(/(['"]?)(\w+)\1\s*[:=]\s*(['"]?)([^'",}]+)\3/g);
    for (const match of matches) {
        headers[match[2]] = match[4].trim();
    }
    return headers;
}

// Extract Fields from Code
function extractFields(code) {
    // Try to find JSON structure or response examples
    const jsonMatch = code.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        try {
            const parsed = JSON.parse(jsonMatch[0]);
            return Object.keys(parsed);
        } catch (e) {
            // Not valid JSON, try to extract field names
            const fieldMatches = code.matchAll(/(['"]?)(\w+)\1\s*:/g);
            return Array.from(fieldMatches, m => m[2]);
        }
    }
    return [];
}

// Clear Input
function clearInput() {
    document.getElementById('apiCodeInput').value = '';
    document.getElementById('analysisResult').style.display = 'none';
    window.currentAnalysis = null;
}

// Save API
function saveApi() {
    if (!window.currentAnalysis) {
        alert('Please analyze the code first');
        return;
    }
    
    const name = document.getElementById('apiName').value || window.currentAnalysis.name;
    const description = document.getElementById('apiDescription').value || window.currentAnalysis.description;
    
    const newApi = {
        id: Date.now().toString(),
        name: name,
        description: description,
        endpoint: window.currentAnalysis.endpoint,
        method: window.currentAnalysis.method,
        apiKey: window.currentAnalysis.apiKey,
        headers: window.currentAnalysis.headers,
        detectedFields: window.currentAnalysis.detectedFields,
        sampleCode: window.currentAnalysis.sampleCode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        history: []
    };
    
    apis.push(newApi);
    saveData();
    
    alert('API saved successfully!');
    clearInput();
    switchPage('dashboard');
    renderDashboard();
}

// Render Dashboard
function renderDashboard() {
    loadData();
    
    // Update stats
    document.getElementById('totalApis').textContent = apis.length;
    document.getElementById('activeApis').textContent = apis.filter(a => a.status === 'active').length;
    const allModels = getAllModels();
    document.getElementById('totalModels').textContent = allModels.length;
    
    // Render API cards
    const container = document.getElementById('apisList');
    if (apis.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 1.25rem; margin-bottom: 1rem;">No APIs monitored yet</p>
                <p>Click "Add API/MCP" to start monitoring your APIs</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = apis.map(api => `
        <div class="api-card" onclick="showApiDetail('${api.id}')">
            <div class="api-card-header">
                <div>
                    <div class="api-card-title">${api.name}</div>
                    <div class="api-card-description">${api.description || 'No description'}</div>
                </div>
                <span class="api-badge ${api.status}">${api.status}</span>
            </div>
            <div class="api-card-meta">
                <span class="api-badge">${api.method}</span>
                <span class="api-badge">${api.detectedFields.length} fields</span>
                <span class="api-badge">${api.history.length} calls</span>
            </div>
        </div>
    `).join('');
}

// Filter APIs
function filterApis() {
    const searchTerm = document.getElementById('apiSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.api-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

// Show API Detail
function showApiDetail(apiId) {
    const api = apis.find(a => a.id === apiId);
    if (!api) return;
    
    const modal = document.getElementById('apiDetailModal');
    const content = document.getElementById('apiDetailContent');
    
    // Fetch latest data
    fetchApiData(api);
    
    content.innerHTML = `
        <div class="api-detail">
            <div class="detail-section">
                <h3>${api.name}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">${api.description || 'No description'}</p>
            </div>
            
            <div class="detail-section">
                <h3>Endpoint Information</h3>
                <div class="schema-view">
                    <div><strong>URL:</strong> ${api.endpoint}</div>
                    <div><strong>Method:</strong> ${api.method}</div>
                    <div><strong>API Key:</strong> ${api.apiKey ? api.apiKey.substring(0, 10) + '...' : 'Not set'}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Data Schema</h3>
                <div class="schema-view">
                    <pre>${JSON.stringify({
                        detectedFields: api.detectedFields,
                        headers: api.headers
                    }, null, 2)}</pre>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Sample Code</h3>
                <div class="sample-data">
                    <pre>${api.sampleCode}</pre>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Call History</h3>
                <div id="apiHistory">
                    ${api.history.length === 0 ? 
                        '<p style="color: var(--text-secondary);">No calls yet. Click "Test API" to make a call.</p>' :
                        api.history.map(h => `
                            <div class="history-item">
                                <div class="history-item-header">
                                    <span class="history-item-time">${new Date(h.timestamp).toLocaleString()}</span>
                                    <span class="history-item-status ${h.status}">${h.status}</span>
                                </div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                    ${h.method} ${h.endpoint}
                                </div>
                                ${h.response ? `<pre style="margin-top: 0.5rem; font-size: 0.75rem; max-height: 200px; overflow-y: auto;">${JSON.stringify(h.response, null, 2).substring(0, 500)}...</pre>` : ''}
                            </div>
                        `).join('')
                    }
                </div>
                <button class="btn btn-primary" onclick="testApi('${api.id}')" style="margin-top: 1rem;">🧪 Test API</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Test API
async function testApi(apiId) {
    const api = apis.find(a => a.id === apiId);
    if (!api) return;
    
    try {
        const response = await fetch(api.endpoint, {
            method: api.method || 'GET',
            headers: {
                ...api.headers,
                'api_key': api.apiKey,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        // Add to history
        api.history.unshift({
            timestamp: new Date().toISOString(),
            method: api.method || 'GET',
            endpoint: api.endpoint,
            status: response.ok ? 'success' : 'error',
            response: data,
            statusCode: response.status
        });
        
        // Keep only last 20 calls
        if (api.history.length > 20) {
            api.history = api.history.slice(0, 20);
        }
        
        saveData();
        showApiDetail(apiId);
        
    } catch (error) {
        alert('API call failed: ' + error.message);
        
        // Add error to history
        api.history.unshift({
            timestamp: new Date().toISOString(),
            method: api.method || 'GET',
            endpoint: api.endpoint,
            status: 'error',
            error: error.message
        });
        
        saveData();
        showApiDetail(apiId);
    }
}

// Render Models
function renderModels() {
    const tbody = document.getElementById('modelsTableBody');
    const allModels = getAllModels();
    
    if (allModels.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No AI models available.
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = allModels.map(model => {
        const isDefault = model.isDefault || false;
        const maskedKey = maskApiKey(model.apiKey, false);
        const canDelete = !isDefault && (isAdmin() || !model.isAdminOnly);
        
        return `
        <tr>
            <td>
                <strong>${model.name}</strong>
                ${isDefault ? '<span class="api-badge" style="margin-left: 0.5rem; background: #dbeafe; color: #1e40af;">Default</span>' : ''}
            </td>
            <td>${model.type}</td>
            <td>${model.capability}</td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;" title="${model.endpoint}">${model.endpoint}</td>
            <td class="api-key-cell" title="${isAdmin() ? model.apiKey : 'Admin only'}">
                ${maskedKey}
                ${!isAdmin() ? '<span style="color: var(--text-secondary); font-size: 0.75rem; margin-left: 0.5rem;">🔒</span>' : ''}
            </td>
            <td>${model.modelName}</td>
            <td>${model.context.toLocaleString()}</td>
            <td>
                ${canDelete ? `<button class="btn btn-small btn-danger" onclick="deleteModel('${model.id}')">Delete</button>` : '<span style="color: var(--text-secondary); font-size: 0.85rem;">Protected</span>'}
            </td>
        </tr>
    `;
    }).join('');
}

// Handle Add Model
function handleAddModel(e) {
    e.preventDefault();
    
    const model = {
        id: Date.now().toString(),
        name: document.getElementById('modelName').value,
        type: document.getElementById('modelType').value,
        capability: document.getElementById('modelCapability').value,
        endpoint: document.getElementById('modelEndpoint').value,
        apiKey: document.getElementById('modelApiKey').value,
        modelName: document.getElementById('modelModelName').value,
        context: parseInt(document.getElementById('modelContext').value)
    };
    
    models.push(model);
    saveData();
    
    document.getElementById('addModelForm').reset();
    document.getElementById('addModelModal').style.display = 'none';
    renderModels();
    
    alert('AI Model added successfully!');
}

// Delete Model
function deleteModel(modelId) {
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === modelId);
    
    if (!model) return;
    
    // Prevent deleting default models
    if (model.isDefault) {
        alert('Default models cannot be deleted. They are available to all users.');
        return;
    }
    
    // Only admin can delete admin-only models
    if (model.isAdminOnly && !isAdmin()) {
        alert('Only administrators can delete this model.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this model?')) {
        models = models.filter(m => m.id !== modelId);
        saveData();
        renderModels();
    }
}

// Make functions available globally for onclick handlers
window.showApiDetail = showApiDetail;
window.testApi = testApi;
window.deleteModel = deleteModel;
