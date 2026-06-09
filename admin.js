// ====== ADMIN PANEL CONTROLLER ======

const API_BASE = '/api';

// Authentication State
let authToken = localStorage.getItem('authToken');

// Dynamic Elements Cache
const loginView = document.getElementById('loginView');
const adminShell = document.getElementById('adminShell');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Page Header info
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');

// Cache Tables & Sections
const dashboardSection = document.getElementById('dashboardSection');
const propertiesSection = document.getElementById('propertiesSection');
const inquiriesSection = document.getElementById('inquiriesSection');
const newsletterSection = document.getElementById('newsletterSection');

const propertiesList = document.getElementById('propertiesList');
const inquiriesList = document.getElementById('inquiriesList');
const recentInquiriesList = document.getElementById('recentInquiriesList');
const newsletterList = document.getElementById('newsletterList');

// Form Modals Cache
const propertyModal = document.getElementById('propertyModal');
const propertyForm = document.getElementById('propertyForm');
const galleryInputsContainer = document.getElementById('galleryInputsContainer');

// ==========================================
// A. CORE AUTHENTICATION LOGIC
// ==========================================

async function checkAuth() {
    if (!authToken) {
        showLogin();
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/validate`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (res.ok) {
            const data = await res.json();
            showAdmin(data.admin);
        } else {
            // Token invalid or expired
            localStorage.removeItem('authToken');
            authToken = null;
            showLogin();
        }
    } catch (err) {
        console.error('Auth check connection failed:', err);
        // Serve offline message but let them look at cached layout
        showLogin('Connection to server failed. Please ensure the backend server is running.');
    }
}

function showLogin(customError = '') {
    loginView.style.display = 'flex';
    adminShell.style.display = 'none';
    if (customError) {
        loginError.textContent = customError;
        loginError.style.display = 'block';
    } else {
        loginError.style.display = 'none';
    }
}

function showAdmin(adminUser) {
    loginView.style.display = 'none';
    adminShell.style.display = 'flex';
    document.querySelector('.admin-user-name').textContent = adminUser === 'admin' ? 'System Admin' : adminUser;
    
    // Initial data load
    loadDashboardStats();
    loadSectionData('dashboardSection');
}

// Login form Submission handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    loginError.style.display = 'none';

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.token) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            loginForm.reset();
            showAdmin(username);
        } else {
            loginError.textContent = data.error || 'Invalid credentials.';
            loginError.style.display = 'block';
        }
    } catch (err) {
        loginError.textContent = 'Server unreachable. Start server.js first.';
        loginError.style.display = 'block';
    }
});

// Logout handler
document.getElementById('btnLogout').addEventListener('click', async () => {
    if (confirm('Are you sure you want to log out of the admin panel?')) {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
        } catch (err) {
            console.error('Logout request failed:', err);
        }
        localStorage.removeItem('authToken');
        authToken = null;
        showLogin();
    }
});


// ==========================================
// B. DASHBOARD VIEW ROUTING & LOADING
// ==========================================

// Handle sidebar click transitions
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        // Toggle Active tab button
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Toggle Active Section
        const targetSectionId = item.dataset.target;
        document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(targetSectionId).classList.add('active');

        // Update Title Headers
        updateHeader(targetSectionId);

        // Fetch new data
        loadSectionData(targetSectionId);
    });
});

function updateHeader(sectionId) {
    if (sectionId === 'dashboardSection') {
        pageTitle.textContent = 'Dashboard';
        pageSubtitle.textContent = 'Real-time portfolio metrics and lead submissions';
    } else if (sectionId === 'propertiesSection') {
        pageTitle.textContent = 'Portfolio Catalog';
        pageSubtitle.textContent = 'Create, modify, and manage estate property listings';
    } else if (sectionId === 'inquiriesSection') {
        pageTitle.textContent = 'Lead Inquiries';
        pageSubtitle.textContent = 'Review customer request messages and direct property leads';
    } else if (sectionId === 'newsletterSection') {
        pageTitle.textContent = 'Newsletter Subscribers';
        pageSubtitle.textContent = 'Export and manage email subscriber database';
    }
}

// Global switcher to load data for active panels
function loadSectionData(sectionId) {
    if (sectionId === 'dashboardSection') {
        loadDashboardStats();
        loadRecentInquiries();
    } else if (sectionId === 'propertiesSection') {
        loadPropertiesTable();
    } else if (sectionId === 'inquiriesSection') {
        loadInquiriesTable();
    } else if (sectionId === 'newsletterSection') {
        loadNewsletterTable();
    }
}

// Load global counter stats
async function loadDashboardStats() {
    try {
        const res = await fetch(`${API_BASE}/stats`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (res.ok) {
            const stats = await res.json();
            document.getElementById('statTotalProperties').textContent = stats.totalProperties;
            document.getElementById('statTotalInquiries').textContent = stats.totalInquiries;
            document.getElementById('statPendingInquiries').textContent = stats.pendingInquiries;
            document.getElementById('statNewsletterSubs').textContent = stats.newsletterSubscribers;
        }
    } catch (err) {
        console.error('Failed to load stats:', err);
    }
}

// Load top 5 recent inquiries on dashboard
async function loadRecentInquiries() {
    try {
        const res = await fetch(`${API_BASE}/inquiries`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (res.ok) {
            const inquiries = await res.json();
            const top5 = inquiries.slice(0, 5);
            
            if (top5.length === 0) {
                recentInquiriesList.innerHTML = '<tr><td colspan="5" style="text-align:center;">No recent inquiries found.</td></tr>';
                return;
            }

            recentInquiriesList.innerHTML = top5.map(i => `
                <tr>
                    <td>
                        <div class="property-cell-info">
                            <span class="cell-title-main">${i.name}</span>
                            <span class="cell-subtitle-sub">${i.email} | ${i.phone || 'No phone'}</span>
                        </div>
                    </td>
                    <td><span class="cell-title-main">${i.propertyName || 'General Inquiry'}</span></td>
                    <td><div style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${i.message}</div></td>
                    <td>${new Date(i.date).toLocaleDateString()}</td>
                    <td>
                        <span class="badge-tag badge-tag-${i.status === 'pending' ? 'pending' : 'success'}">${i.status}</span>
                    </td>
                </tr>
            `).join('');
        }
    } catch (err) {
        recentInquiriesList.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--color-status-danger-text);">Failed to load inquiries.</td></tr>';
    }
}


// ==========================================
// C. PORTFOLIO PROPERTIES MANAGEMENT (CRUD)
// ==========================================

let propertiesCache = [];
const propertySearch = document.getElementById('propertySearch');
const propertyCategoryFilter = document.getElementById('propertyCategoryFilter');

async function loadPropertiesTable() {
    try {
        propertiesList.innerHTML = '<tr><td colspan="6" style="text-align:center;">Fetching properties list...</td></tr>';
        
        const res = await fetch(`${API_BASE}/properties`);
        if (res.ok) {
            propertiesCache = await res.json();
            renderPropertiesTable();
        }
    } catch (err) {
        propertiesList.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--color-status-danger-text);">Connection error loading properties.</td></tr>';
    }
}

function renderPropertiesTable() {
    const term = propertySearch.value.toLowerCase().trim();
    const cat = propertyCategoryFilter.value;

    let filtered = propertiesCache;
    
    // Search term filtering
    if (term) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.developer.toLowerCase().includes(term) ||
            p.location.toLowerCase().includes(term)
        );
    }

    // Category filter
    if (cat !== 'all') {
        filtered = filtered.filter(p => p.category === cat);
    }

    if (filtered.length === 0) {
        propertiesList.innerHTML = '<tr><td colspan="6" style="text-align:center;">No matching properties found.</td></tr>';
        return;
    }

    propertiesList.innerHTML = filtered.map(p => `
        <tr data-id="${p.id}">
            <td><img src="${p.image}" alt="${p.name}" class="property-cell-img" onerror="this.src='https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=200'"></td>
            <td>
                <div class="property-cell-info">
                    <span class="cell-title-main">${p.name}</span>
                    <span class="cell-subtitle-sub">${p.developer} | ${p.type} (${p.area})</span>
                </div>
            </td>
            <td>${p.location}</td>
            <td><strong style="color:var(--color-admin-text-title);">${p.price}</strong></td>
            <td>
                <span class="badge-tag badge-tag-info">${p.category}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-btn action-btn-edit btn-edit-prop" title="Edit property"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn action-btn-delete btn-delete-prop" title="Delete property"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    // Attach row button listeners
    propertiesList.querySelectorAll('.btn-edit-prop').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            openEditPropertyModal(tr.dataset.id);
        });
    });

    propertiesList.querySelectorAll('.btn-delete-prop').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            deletePropertyItem(tr.dataset.id);
        });
    });
}

propertySearch.addEventListener('input', renderPropertiesTable);
propertyCategoryFilter.addEventListener('change', renderPropertiesTable);


// GALLERY EDITOR COMPONENT
function addGalleryItemInput(url = '', label = '') {
    const row = document.createElement('div');
    row.className = 'gallery-row';
    row.innerHTML = `
        <input type="url" class="gallery-url" required placeholder="Image URL (https://...)" value="${url}">
        <input type="text" class="gallery-label" required placeholder="Label (e.g. Living)" value="${label}">
        <button type="button" class="btn-remove-gallery" title="Remove image"><i class="fa-solid fa-circle-minus"></i></button>
    `;

    row.querySelector('.btn-remove-gallery').addEventListener('click', () => row.remove());
    galleryInputsContainer.appendChild(row);
}

document.getElementById('btnAddGalleryItem').addEventListener('click', () => addGalleryItemInput());


// MODAL TRIGGER: ADD PROPERTY
document.getElementById('btnNewProperty').addEventListener('click', () => {
    document.getElementById('propertyModalTitle').textContent = 'Create New Property';
    propertyForm.reset();
    document.getElementById('editPropertyId').value = '';
    galleryInputsContainer.innerHTML = '';
    
    // Add default empty gallery row
    addGalleryItemInput();
    
    propertyModal.classList.add('active');
});

// MODAL TRIGGER: EDIT PROPERTY
async function openEditPropertyModal(id) {
    try {
        const res = await fetch(`${API_BASE}/properties/${id}`);
        if (!res.ok) return alert('Failed to retrieve property details');
        
        const prop = await res.json();
        
        document.getElementById('propertyModalTitle').textContent = 'Edit Property';
        document.getElementById('editPropertyId').value = prop.id;
        
        document.getElementById('propName').value = prop.name;
        document.getElementById('propDeveloper').value = prop.developer;
        document.getElementById('propLocation').value = prop.location;
        document.getElementById('propCategory').value = prop.category;
        document.getElementById('propPrice').value = prop.price;
        document.getElementById('propType').value = prop.type;
        document.getElementById('propArea').value = prop.area;
        document.getElementById('propImage').value = prop.image;
        document.getElementById('propBadge').value = prop.badge || '';
        document.getElementById('propStatus').value = prop.status || '';
        
        // Optional fields
        document.getElementById('propFloor').value = prop.floor || '';
        document.getElementById('propFurniture').value = prop.furniture || '';
        document.getElementById('propSqFtPrice').value = prop.sqFtPrice || '';
        document.getElementById('propBuiltUp').value = prop.builtUpArea || '';
        document.getElementById('propOwnership').value = prop.ownership || '';
        document.getElementById('propTransaction').value = prop.transactionType || '';
        document.getElementById('propRera').value = prop.reraNumber || '';
        document.getElementById('propBadgeColor').value = prop.badgeColor || '';
        
        // Descriptions
        document.getElementById('propDesc1').value = prop.description1;
        document.getElementById('propDesc2').value = prop.description2 || '';
        
        // Gallery
        galleryInputsContainer.innerHTML = '';
        if (prop.gallery && prop.gallery.length > 0) {
            prop.gallery.forEach(img => addGalleryItemInput(img.url, img.label));
        } else {
            addGalleryItemInput();
        }

        propertyModal.classList.add('active');
    } catch (err) {
        alert('Server unreachable');
    }
}

// CLOSE MODAL HANDLERS
function closePropertyModal() {
    propertyModal.classList.remove('active');
}

document.getElementById('btnPropertyModalClose').addEventListener('click', closePropertyModal);
document.getElementById('btnPropertyFormCancel').addEventListener('click', closePropertyModal);
propertyModal.addEventListener('click', (e) => {
    if (e.target === propertyModal) closePropertyModal();
});


// SUBMIT CREATE / EDIT FORM
propertyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const editId = document.getElementById('editPropertyId').value;
    
    // Gather gallery details
    const galleryItems = [];
    galleryInputsContainer.querySelectorAll('.gallery-row').forEach(row => {
        const url = row.querySelector('.gallery-url').value.trim();
        const label = row.querySelector('.gallery-label').value.trim();
        if (url && label) {
            galleryItems.push({ url, label });
        }
    });

    const propertyBody = {
        name: document.getElementById('propName').value.trim(),
        developer: document.getElementById('propDeveloper').value.trim(),
        location: document.getElementById('propLocation').value.trim(),
        category: document.getElementById('propCategory').value,
        price: document.getElementById('propPrice').value.trim(),
        type: document.getElementById('propType').value.trim(),
        area: document.getElementById('propArea').value.trim(),
        image: document.getElementById('propImage').value.trim(),
        badge: document.getElementById('propBadge').value.trim(),
        status: document.getElementById('propStatus').value.trim(),
        
        floor: document.getElementById('propFloor').value.trim(),
        furniture: document.getElementById('propFurniture').value.trim(),
        sqFtPrice: document.getElementById('propSqFtPrice').value.trim(),
        builtUpArea: document.getElementById('propBuiltUp').value.trim(),
        ownership: document.getElementById('propOwnership').value.trim(),
        transactionType: document.getElementById('propTransaction').value.trim(),
        reraNumber: document.getElementById('propRera').value.trim(),
        badgeColor: document.getElementById('propBadgeColor').value.trim(),
        
        description1: document.getElementById('propDesc1').value.trim(),
        description2: document.getElementById('propDesc2').value.trim(),
        gallery: galleryItems
    };

    const url = editId ? `${API_BASE}/properties/${editId}` : `${API_BASE}/properties`;
    const method = editId ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(propertyBody)
        });

        if (res.ok) {
            closePropertyModal();
            loadDashboardStats();
            loadPropertiesTable();
        } else {
            const data = await res.json();
            alert(`Error: ${data.error}`);
        }
    } catch (err) {
        alert('Server unreachable during property submission');
    }
});

// DELETE PROPERTY
async function deletePropertyItem(id) {
    if (confirm('Are you absolutely sure you want to delete this listing permanently?')) {
        try {
            const res = await fetch(`${API_BASE}/properties/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (res.ok) {
                loadDashboardStats();
                loadPropertiesTable();
            } else {
                alert('Failed to delete property.');
            }
        } catch (err) {
            alert('Server unreachable');
        }
    }
}


// ==========================================
// D. LEAD INQUIRIES MANAGEMENT
// ==========================================

let inquiriesCache = [];
const inquirySearch = document.getElementById('inquirySearch');
const inquiryStatusFilter = document.getElementById('inquiryStatusFilter');

async function loadInquiriesTable() {
    try {
        inquiriesList.innerHTML = '<tr><td colspan="7" style="text-align:center;">Fetching customer leads...</td></tr>';
        
        const res = await fetch(`${API_BASE}/inquiries`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (res.ok) {
            inquiriesCache = await res.json();
            renderInquiriesTable();
        }
    } catch (err) {
        inquiriesList.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--color-status-danger-text);">Connection error loading inquiries.</td></tr>';
    }
}

function renderInquiriesTable() {
    const term = inquirySearch.value.toLowerCase().trim();
    const stat = inquiryStatusFilter.value;

    let filtered = inquiriesCache;

    if (term) {
        filtered = filtered.filter(i => 
            i.name.toLowerCase().includes(term) ||
            i.email.toLowerCase().includes(term) ||
            i.message.toLowerCase().includes(term) ||
            (i.propertyName && i.propertyName.toLowerCase().includes(term))
        );
    }

    if (stat !== 'all') {
        filtered = filtered.filter(i => i.status === stat);
    }

    if (filtered.length === 0) {
        inquiriesList.innerHTML = '<tr><td colspan="7" style="text-align:center;">No matching inquiries found.</td></tr>';
        return;
    }

    inquiriesList.innerHTML = filtered.map(i => `
        <tr data-id="${i.id}">
            <td><strong style="color:var(--color-admin-text-title);">${i.name}</strong></td>
            <td>
                <div class="property-cell-info">
                    <span>${i.email}</span>
                    <span class="cell-subtitle-sub">${i.phone || 'No phone'}</span>
                </div>
            </td>
            <td><span class="cell-title-main">${i.propertyName || 'General Inquiry'}</span></td>
            <td>
                <div style="max-width: 300px; max-height: 80px; overflow-y: auto; font-size: 0.85rem; line-height: 1.4; padding-right: 0.5rem;">
                    ${i.message}
                </div>
            </td>
            <td>${new Date(i.date).toLocaleString()}</td>
            <td>
                <span class="badge-tag badge-tag-${i.status === 'pending' ? 'pending' : 'success'}">${i.status}</span>
            </td>
            <td>
                <div class="table-actions">
                    ${i.status === 'pending' 
                        ? `<button class="action-btn action-btn-check btn-resolve-inquiry" title="Mark as Contacted"><i class="fa-solid fa-check"></i></button>`
                        : `<button class="action-btn btn-admin-secondary btn-unresolve-inquiry" title="Mark as Pending" style="width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; border:1px solid var(--color-admin-border);"><i class="fa-solid fa-arrows-rotate"></i></button>`
                    }
                    <button class="action-btn action-btn-delete btn-delete-inquiry" title="Delete Inquiry"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    // Attach listeners
    inquiriesList.querySelectorAll('.btn-resolve-inquiry').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            updateInquiryStatus(tr.dataset.id, 'contacted');
        });
    });

    inquiriesList.querySelectorAll('.btn-unresolve-inquiry').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            updateInquiryStatus(tr.dataset.id, 'pending');
        });
    });

    inquiriesList.querySelectorAll('.btn-delete-inquiry').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            deleteInquiryItem(tr.dataset.id);
        });
    });
}

inquirySearch.addEventListener('input', renderInquiriesTable);
inquiryStatusFilter.addEventListener('change', renderInquiriesTable);

async function updateInquiryStatus(id, newStatus) {
    try {
        const res = await fetch(`${API_BASE}/inquiries/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            loadDashboardStats();
            loadInquiriesTable();
        }
    } catch (err) {
        alert('Server unreachable');
    }
}

async function deleteInquiryItem(id) {
    if (confirm('Delete this lead inquiry?')) {
        try {
            const res = await fetch(`${API_BASE}/inquiries/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (res.ok) {
                loadDashboardStats();
                loadInquiriesTable();
            }
        } catch (err) {
            alert('Server unreachable');
        }
    }
}


// ==========================================
// E. NEWSLETTER ROSTER MANAGEMENT
// ==========================================

let newsletterCache = [];

async function loadNewsletterTable() {
    try {
        newsletterList.innerHTML = '<tr><td colspan="3" style="text-align:center;">Fetching newsletter roster...</td></tr>';
        
        const res = await fetch(`${API_BASE}/newsletter`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (res.ok) {
            newsletterCache = await res.json();
            renderNewsletterTable();
        }
    } catch (err) {
        newsletterList.innerHTML = '<tr><td colspan="3" style="text-align:center; color:var(--color-status-danger-text);">Connection error loading subscribers.</td></tr>';
    }
}

function renderNewsletterTable() {
    if (newsletterCache.length === 0) {
        newsletterList.innerHTML = '<tr><td colspan="3" style="text-align:center;">No email subscribers yet.</td></tr>';
        return;
    }

    newsletterList.innerHTML = newsletterCache.map(n => `
        <tr data-id="${n.id}">
            <td><strong style="color:var(--color-admin-text-title); font-size:0.95rem;">${n.email}</strong></td>
            <td>${new Date(n.date).toLocaleString()}</td>
            <td style="text-align: center;">
                <button class="action-btn action-btn-delete btn-delete-sub" style="margin: 0 auto;" title="Remove subscriber"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');

    newsletterList.querySelectorAll('.btn-delete-sub').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            deleteSubscriberItem(tr.dataset.id);
        });
    });
}

async function deleteSubscriberItem(id) {
    if (confirm('Remove this email from the newsletter subscriber list?')) {
        try {
            const res = await fetch(`${API_BASE}/newsletter/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (res.ok) {
                loadDashboardStats();
                loadNewsletterTable();
            }
        } catch (err) {
            alert('Server unreachable');
        }
    }
}

// COPY NEWSLETTER EMAIL LISTS TO CLIPBOARD
document.getElementById('btnCopyEmails').addEventListener('click', () => {
    if (newsletterCache.length === 0) {
        return alert('Subscriber list is empty.');
    }

    const emails = newsletterCache.map(n => n.email).join(', ');
    
    navigator.clipboard.writeText(emails)
        .then(() => {
            alert(`Copied ${newsletterCache.length} email addresses to clipboard!`);
        })
        .catch(err => {
            alert('Failed to copy to clipboard.');
        });
});


// ==========================================
// F. PAGE INITIALIZATION
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
