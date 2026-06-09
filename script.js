document.addEventListener('DOMContentLoaded', async () => {

    // =============================================
    // BACKEND API CONFIGURATION
    // =============================================
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? '/api'
        : 'https://realestate-1-p4gy.onrender.com/api';

    let backendAvailable = false;

    // Array of properties based on design screenshots
    const properties = [
        {
            id: 1,
            name: 'Skyline Residency',
            location: 'Andheri East, Mumbai',
            type: '2 BHK Apartment',
            area: '850 Sq. Ft.',
            developer: 'Lodha Group',
            price: '₹ 2.25 Cr',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            badge: 'NEW LAUNCH',
            floor: '18th of 25',
            furniture: 'Semi',
            status: 'Ready',
            sqFtPrice: '₹ 19,565 / Sq. Ft.',
            builtUpArea: '1,150 Sq. Ft.',
            ownership: 'Freehold',
            transactionType: 'Resale / New Booking',
            reraNumber: 'P51800012345',
            description1: 'Skyline Residency by Lodha Group represents the pinnacle of urban living in Andheri East. This north-facing premium apartment on the 18th floor offers breathtaking views of the city skyline through expansive floor-to-ceiling windows. Designed with a focus on spatial efficiency and ventilation, the 850 Sq. Ft. carpet area is masterfully utilized to provide a sense of luxury and openness.',
            description2: 'The property is strategically located to ensure excellent connectivity while maintaining a tranquil residential atmosphere. It\'s a "Freehold" property, currently available for Resale, meticulously maintained and partially furnished with premium wood-work and modular kitchen fittings.',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800', label: 'Living Room' },
                { url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=600', label: 'Master Suite' },
                { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600', label: 'Bathroom' },
                { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200', label: 'Chef Kitchen' },
                { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600', label: 'Sky Pool' }
            ]
        },
        {
            id: 2,
            name: 'Elite Heights',
            location: 'Andheri East, Mumbai',
            type: '2 BHK Apartment',
            area: '920 Sq. Ft.',
            developer: 'Lodha Group',
            price: '₹ 2.40 Cr',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
            badge: 'READY TO MOVE',
            badgeColor: '#111',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&q=80&w=800', label: 'Lounge' },
                { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600', label: 'Primary Bedroom' },
                { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', label: 'Spa Bath' },
                { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Living Area' },
                { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', label: 'Exterior' }
            ]
        },
        {
            id: 3,
            name: 'Imperial Vista',
            location: 'Andheri East, Mumbai',
            type: '2 BHK Apartment',
            area: '875 Sq. Ft.',
            developer: 'Lodha Group',
            price: '₹ 2.15 Cr',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            badge: 'PREMIUM SELECTION',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', label: 'Open Concept Living' },
                { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600', label: 'Bedroom View' },
                { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600', label: 'Bath Design' },
                { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200', label: 'Modern Kitchen' },
                { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600', label: 'Aerial Deck' }
            ]
        },
        {
            id: 4,
            name: 'The Grand Regency',
            location: 'Andheri East, Mumbai',
            type: '3 BHK Apartment',
            area: '1,250 Sq. Ft.',
            developer: 'Godrej Properties',
            price: '₹ 3.75 Cr',
            image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800',
            badge: 'LUXURY PICK',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', label: 'Entertainment Area' },
                { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=600', label: 'Suite Room' },
                { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600', label: 'Modern Bathroom' },
                { url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=1200', label: 'Designer Kitchen' },
                { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600', label: 'Sunset Balcony' }
            ]
        },
        {
            id: 5,
            name: 'Prestige Solitaire',
            location: 'Powai, Mumbai',
            type: '3 BHK Apartment',
            area: '1,450 Sq. Ft.',
            developer: 'K Raheja Corp',
            price: '₹ 4.10 Cr',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
            badge: 'EXCLUSIVE',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&q=80&w=800', label: 'Lounge' },
                { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600', label: 'Primary Bedroom' },
                { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', label: 'Spa Bath' },
                { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Living Area' },
                { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', label: 'Exterior' }
            ]
        },
        {
            id: 6,
            name: 'The Crest Penthouse',
            location: 'Bandra West, Mumbai',
            type: '4 BHK Penthouse',
            area: '2,800 Sq. Ft.',
            developer: 'Kalpataru Group',
            price: '₹ 12.50 Cr',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            badge: 'SEA VIEW',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800', label: 'Living Room' },
                { url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=600', label: 'Master Suite' },
                { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600', label: 'Bathroom' },
                { url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=1200', label: 'Chef Kitchen' },
                { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600', label: 'Sky Pool' }
            ]
        },
        {
            id: 7,
            name: 'Greenwood Villa',
            location: 'Goregaon East, Mumbai',
            type: '4 BHK Villa',
            area: '3,200 Sq. Ft.',
            developer: 'Oberoi Realty',
            price: '₹ 8.20 Cr',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            badge: 'LIMITED EDITION',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', label: 'Open Concept Living' },
                { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600', label: 'Bedroom View' },
                { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=600', label: 'Bath Design' },
                { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200', label: 'Modern Kitchen' },
                { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600', label: 'Aerial Deck' }
            ]
        },
        {
            id: 8,
            name: 'Aura Grande',
            location: 'Andheri West, Mumbai',
            type: '2 BHK Apartment',
            area: '980 Sq. Ft.',
            developer: 'Adani Realty',
            price: '₹ 2.85 Cr',
            image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800',
            badge: 'NEW LAUNCH',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', label: 'Entertainment Area' },
                { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=600', label: 'Suite Room' },
                { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600', label: 'Modern Bathroom' },
                { url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=1200', label: 'Designer Kitchen' },
                { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600', label: 'Sunset Balcony' }
            ]
        },
        {
            id: 9,
            name: 'Signature Heights',
            location: 'Lower Parel, Mumbai',
            type: '3 BHK Apartment',
            area: '1,600 Sq. Ft.',
            developer: 'Indiabulls',
            price: '₹ 5.50 Cr',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
            badge: 'READY TO MOVE',
            gallery: [
                { url: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&q=80&w=800', label: 'Lounge' },
                { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600', label: 'Primary Bedroom' },
                { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', label: 'Spa Bath' },
                { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Living Area' },
                { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', label: 'Exterior' }
            ]
        }
    ];

    // =============================================
    // FETCH PROPERTIES FROM BACKEND (with fallback)
    // =============================================
    async function loadLiveProperties() {
        if (!API_BASE) return;
        
        try {
            const res = await fetch(`${API_BASE}/properties?category=residential`);
            if (res.ok) {
                const liveData = await res.json();
                if (liveData && liveData.length > 0) {
                    backendAvailable = true;
                    // Replace the local properties array with live data from the backend
                    properties.splice(0, properties.length, ...liveData);
                    currentFilteredList = properties;
                    applyFiltering();
                    console.log("Backend connection established. Loaded live properties.");
                    return;
                }
            }
        } catch (e) {
            console.log("Backend sleeping or offline. Retrying in background to wake up...");
        }

        // Background retry loop to handle Render wake-up (spin-down)
        let retries = 0;
        const interval = setInterval(async () => {
            retries++;
            if (retries > 6) { // Try for 90 seconds (6 * 15s)
                clearInterval(interval);
                return;
            }
            try {
                const res = await fetch(`${API_BASE}/properties?category=residential`);
                if (res.ok) {
                    const liveData = await res.json();
                    if (liveData && liveData.length > 0) {
                        backendAvailable = true;
                        properties.splice(0, properties.length, ...liveData);
                        currentFilteredList = properties;
                        applyFiltering();
                        clearInterval(interval);
                        console.log("Backend woke up! Loaded live properties.");
                    }
                }
            } catch (err) {
                // keep trying
            }
        }, 15000);
    }

    const propertiesGrid = document.getElementById('properties-grid');

    // Reusable function to create property card HTML
    function createPropertyCard(prop) {
        return `
            <div class="property-card">
                <div class="property-image-container">
                    <img src="${prop.image}" alt="${prop.name}" class="property-image">
                    ${prop.badge ? `<span class="property-badge" ${prop.badgeColor ? `style="background-color: ${prop.badgeColor}; color: #fff;"` : ''}>${prop.badge}</span>` : ''}
                    <span class="property-price-overlay">${prop.price}</span>
                </div>
                <div class="property-content">
                    <h3 class="property-title">${prop.name}</h3>
                    <p class="property-location">
                        <i class="fa-solid fa-location-dot"></i> ${prop.location}
                    </p>
                    <div class="property-stats">
                        <div class="stat">
                            <span class="stat-label">TYPE</span>
                            <span class="stat-value">${prop.type}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">CARPET AREA</span>
                            <span class="stat-value">${prop.area}</span>
                        </div>
                    </div>
                    <div class="property-footer">
                        <div class="developer-info">
                            <span class="stat-label">Developer</span>
                            <span class="developer-name">${prop.developer}</span>
                        </div>
                        <button class="btn btn-dark btn-details" data-id="${prop.id}">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }

    const paginationContainer = document.querySelector('.pagination');
    let currentPage = 1;
    const itemsPerPage = 3;
    let currentFilteredList = properties;

    function renderProperties() {
        if (!propertiesGrid) return;
        
        // Calculate pagination indices
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedList = currentFilteredList.slice(startIndex, endIndex);
        
        if (currentFilteredList.length === 0) {
            propertiesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 4rem;"><h3>No properties match your search.</h3></div>';
            if (paginationContainer) paginationContainer.style.display = 'none';
            return;
        } else {
            if (paginationContainer) paginationContainer.style.display = 'flex';
        }

        propertiesGrid.innerHTML = paginatedList.map(prop => createPropertyCard(prop)).join('');
        
        // Re-attach event listeners to details buttons
        propertiesGrid.querySelectorAll('.btn-details').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                window.location.href = `property-details.html?id=${id}`;
            });
        });

        updatePaginationControls();
    }

    function updatePaginationControls() {
        if (!paginationContainer) return;

        const totalPages = Math.ceil(currentFilteredList.length / itemsPerPage);
        let html = '';
        
        // Left arrow
        html += `<button class="page-btn page-arrow" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}"><i class="fa-solid fa-chevron-left"></i></button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        // Right arrow
        html += `<button class="page-btn page-arrow" ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} data-page="${currentPage + 1}"><i class="fa-solid fa-chevron-right"></i></button>`;
        
        paginationContainer.innerHTML = html;

        // Add event listeners to new buttons
        paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetPage = parseInt(btn.dataset.page);
                if (targetPage && targetPage !== currentPage && targetPage >= 1 && targetPage <= totalPages) {
                    currentPage = targetPage;
                    renderProperties();
                    const propertiesSection = document.querySelector('.properties-section');
                    if (propertiesSection) {
                        propertiesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }


    // =============================================
    // PROPERTY DETAILS PAGE — Dynamic rendering
    // =============================================
    const detailsRoot = document.getElementById('property-details-root');
    if (detailsRoot) {
        const params = new URLSearchParams(window.location.search);
        const propId = parseInt(params.get('id'));
        
        let prop = null;
        if (API_BASE && propId) {
            try {
                const res = await fetch(`${API_BASE}/properties/${propId}`);
                if (res.ok) {
                    prop = await res.json();
                    backendAvailable = true;
                }
            } catch (e) {
                console.error('Failed to fetch property details from API:', e);
            }
        }

        if (!prop && propId) {
            prop = properties.find(p => p.id === propId);
        }

        if (prop) {
            detailsRoot.innerHTML = `
                <!-- PROPERTY HERO SECTION -->
                <section class="explore-hero" style="height: 60vh;">
                    <img src="${prop.image}" alt="${prop.name}" class="full-screen-img" style="height: 60vh;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); padding: 4rem 0 2rem;">
                        <div class="container">
                            ${prop.badge ? `<span class="property-badge gold-badge" style="position: relative; display: inline-block; top: 0; left: 0; margin-bottom: 1rem;">${prop.badge}</span>` : ''}
                            <h1 class="details-hero-title" style="color: white; font-size: 3rem; margin-bottom: 0.5rem;">${prop.name}</h1>
                            <p class="details-hero-loc" style="color: var(--color-text-light); font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fa-solid fa-location-dot"></i> ${prop.location}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- PROPERTY STATS BAR -->
                <div style="background: var(--color-primary); color: white; padding: 2rem 0;">
                    <div class="container">
                        <div class="details-stats-bar-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
                            <div>
                                <div class="stat-label" style="color: var(--color-text-light);">PRICE</div>
                                <div class="stat-value" style="color: var(--color-gold); font-size: 1.5rem;">${prop.price}</div>
                            </div>
                            <div>
                                <div class="stat-label" style="color: var(--color-text-light);">TYPE</div>
                                <div class="stat-value" style="color: white; font-size: 1.2rem;">${prop.type}</div>
                            </div>
                            <div>
                                <div class="stat-label" style="color: var(--color-text-light);">CARPET AREA</div>
                                <div class="stat-value" style="color: white; font-size: 1.2rem;">${prop.area}</div>
                            </div>
                            <div>
                                <div class="stat-label" style="color: var(--color-text-light);">DEVELOPER</div>
                                <div class="stat-value" style="color: white; font-size: 1.2rem;">${prop.developer}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHOTO GALLERY — Premium Real Estate Masonry -->
                <section class="container details-section-pad" style="padding: 4rem 2rem 2rem;">
                    <h2 class="section-title" style="margin-bottom: 2rem;">Photos & Gallery</h2>
                    <div class="details-gallery-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: repeat(2, 280px); gap: 0.75rem; border-radius: 16px; overflow: hidden;">
                        <!-- Main large image -->
                        <div style="grid-column: 1 / 2; grid-row: 1 / 3; position: relative; overflow: hidden;">
                            <img src="${prop.gallery[0].url}" alt="${prop.gallery[0].label}"
                                style="width:100%; height:100%; object-fit:cover; transition: transform 0.4s ease; cursor: zoom-in;"
                                onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
                            <span style="position:absolute; bottom:14px; left:14px; background:rgba(0,0,0,0.55); color:#fff; font-size:0.75rem; padding:4px 12px; border-radius:20px; backdrop-filter:blur(4px);">${prop.gallery[0].label}</span>
                        </div>
                        <!-- 4 smaller thumbnails in 2x2 grid -->
                        ${prop.gallery.slice(1, 5).map((img, i) => `
                        <div style="position:relative; overflow:hidden;">
                            <img src="${img.url}" alt="${img.label}"
                                style="width:100%; height:100%; object-fit:cover; transition: transform 0.4s ease; cursor: zoom-in;"
                                onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                            <span style="position:absolute; bottom:10px; left:10px; background:rgba(0,0,0,0.5); color:#fff; font-size:0.7rem; padding:3px 10px; border-radius:20px; backdrop-filter:blur(4px);">${img.label}</span>
                        </div>`).join('')}
                    </div>
                </section>

                <!-- NEW TWO-COLUMN PROPERTY DETAIL CONTENT -->
                <section class="container details-section-pad" style="padding: 3rem 2rem 2rem;">
                    <style>
                        .details-grid-wrapper {
                            display: grid;
                            grid-template-columns: 2.2fr 1fr;
                            gap: 3rem;
                            align-items: start;
                        }
                        .spec-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 1.5rem;
                            row-gap: 1.25rem;
                        }
                        .spec-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border-bottom: 1px solid var(--color-border);
                            padding-bottom: 0.75rem;
                        }
                        .spec-item.no-border {
                            border-bottom: none;
                            padding-bottom: 0;
                        }
                        .agent-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                            width: 100%;
                            padding: 0.85rem 1rem;
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-sm);
                            font-size: 0.95rem;
                            font-weight: 600;
                            color: var(--color-primary);
                            background: transparent;
                            transition: all var(--transition-fast);
                            text-align: center;
                        }
                        .agent-btn:hover {
                            border-color: var(--color-gold);
                            color: var(--color-gold);
                            background: rgba(192, 154, 77, 0.05);
                        }
                        @media (max-width: 900px) {
                            .details-grid-wrapper {
                                grid-template-columns: 1fr !important;
                                gap: 2.5rem;
                            }
                            .details-right-col {
                                position: relative !important;
                                top: 0 !important;
                            }
                            .spec-grid {
                                grid-template-columns: 1fr !important;
                                gap: 1rem;
                            }
                            .spec-item {
                                padding-left: 0 !important;
                                padding-right: 0 !important;
                                border-bottom: 1px solid var(--color-border) !important;
                                padding-bottom: 0.75rem !important;
                            }
                            .spec-item:last-child {
                                border-bottom: none !important;
                                padding-bottom: 0 !important;
                            }
                        }
                        @media (max-width: 768px) {
                            /* Stats bar: 4-col → 2x2 grid */
                            .details-stats-bar-grid {
                                grid-template-columns: 1fr 1fr !important;
                                gap: 1rem !important;
                            }
                            /* Hero title */
                            .details-hero-title {
                                font-size: 1.75rem !important;
                            }
                            .details-hero-loc {
                                font-size: 1rem !important;
                            }
                            /* Gallery: stack to single column */
                            .details-gallery-grid {
                                grid-template-columns: 1fr !important;
                                grid-template-rows: auto !important;
                                height: auto !important;
                            }
                            .details-gallery-grid > div {
                                height: 220px !important;
                                grid-column: auto !important;
                                grid-row: auto !important;
                            }
                            /* Content heading & price */
                            .details-prop-title {
                                font-size: 1.75rem !important;
                            }
                            .details-price-val {
                                font-size: 1.5rem !important;
                            }
                            /* Section padding */
                            .details-section-pad {
                                padding: 2rem 1rem !important;
                            }
                        }
                        @media (max-width: 480px) {
                            /* Stats bar: full 1-column */
                            .details-stats-bar-grid {
                                grid-template-columns: 1fr 1fr !important;
                                gap: 0.75rem !important;
                                padding: 1.25rem 0 !important;
                            }
                            /* Hero */
                            .details-hero-title {
                                font-size: 1.4rem !important;
                            }
                            .details-hero-loc {
                                font-size: 0.9rem !important;
                            }
                            /* Gallery thumbnails */
                            .details-gallery-grid > div {
                                height: 180px !important;
                            }
                            /* Content */
                            .details-prop-title {
                                font-size: 1.4rem !important;
                            }
                            .details-price-val {
                                font-size: 1.3rem !important;
                            }
                            /* 4-stat mini cards: 2 col */
                            .details-mini-stats {
                                grid-template-columns: 1fr 1fr !important;
                            }
                        }
                    </style>
                    <div class="details-grid-wrapper">
                        <!-- LEFT COLUMN: Main specifications and description -->
                        <div class="details-left-col">
                            
                            <!-- Subtitle, Title & Price info -->
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem;">
                                <div>
                                    <span style="color: var(--color-gold); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 0.5rem;">${prop.developer} Premium</span>
                                    <h2 class="details-prop-title" style="font-size: 2.6rem; font-weight: 700; color: var(--color-primary); line-height: 1.15; margin-bottom: 0.5rem; letter-spacing: -0.5px;">${prop.name}</h2>
                                    <p style="color: var(--color-text-muted); font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem; font-weight: 500;">
                                        <i class="fa-solid fa-location-dot" style="color: var(--color-gold);"></i> ${prop.location}, Maharashtra
                                    </p>
                                </div>
                                <div style="text-align: right; min-width: 150px;">
                                    <span style="color: var(--color-text-muted); font-size: 0.85rem; font-weight: 500; display: block; margin-bottom: 0.15rem;">Asking Price</span>
                                    <h3 class="details-price-val" style="font-size: 2.25rem; font-weight: 700; color: var(--color-primary);">${prop.price}</h3>
                                    <span style="color: var(--color-text-muted); font-size: 0.85rem; font-weight: 500; display: block; margin-top: 0.15rem;">${prop.sqFtPrice || '₹ 19,565 / Sq. Ft.'}</span>
                                </div>
                            </div>

                            <!-- 4 Stats Cards Grid -->
                            <div class="details-mini-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
                                
                                <!-- Carpet Area -->
                                <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.75rem;">
                                    <i class="fa-solid fa-ruler-combined" style="color: var(--color-gold); font-size: 1.3rem;"></i>
                                    <div>
                                        <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block;">Carpet Area</span>
                                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); display: block; margin-top: 0.2rem;">${prop.area}</span>
                                    </div>
                                </div>

                                <!-- Floor -->
                                <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.75rem;">
                                    <i class="fa-solid fa-building" style="color: var(--color-gold); font-size: 1.3rem;"></i>
                                    <div>
                                        <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block;">Floor</span>
                                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); display: block; margin-top: 0.2rem;">${prop.floor || '18th of 25'}</span>
                                    </div>
                                </div>

                                <!-- Furniture -->
                                <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.75rem;">
                                    <i class="fa-solid fa-couch" style="color: var(--color-gold); font-size: 1.3rem;"></i>
                                    <div>
                                        <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block;">Furniture</span>
                                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); display: block; margin-top: 0.2rem;">${prop.furniture || 'Semi'}</span>
                                    </div>
                                </div>

                                <!-- Status -->
                                <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.75rem;">
                                    <i class="fa-solid fa-calendar-check" style="color: var(--color-gold); font-size: 1.3rem;"></i>
                                    <div>
                                        <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block;">Status</span>
                                        <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); display: block; margin-top: 0.2rem;">${prop.status || 'Ready'}</span>
                                    </div>
                                </div>

                            </div>

                            <!-- About the Property Section -->
                            <div style="margin-bottom: 3.5rem;">
                                <h3 style="font-size: 1.75rem; font-weight: 700; color: var(--color-primary); border-left: 4px solid var(--color-gold); padding-left: 0.75rem; margin-bottom: 1.25rem;">About the Property</h3>
                                <p style="font-size: 1.05rem; color: var(--color-text-main); line-height: 1.8; margin-bottom: 1.25rem;">${prop.description1 || `${prop.name} represents the pinnacle of luxury living, offering top-tier amenities and exquisite design.`}</p>
                                <p style="font-size: 1.05rem; color: var(--color-text-main); line-height: 1.8;">${prop.description2 || 'Featuring a highly strategic location that ensures excellent connectivity while maintaining a tranquil and private residential atmosphere.'}</p>
                            </div>

                            <!-- Property Specifications Table -->
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="font-size: 1.75rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.25rem;">Property Specifications</h3>
                                <div style="background: var(--color-bg-light); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem;">
                                    <div class="spec-grid">
                                        <div class="spec-item" style="padding-right: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Developer</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.developer}</span>
                                        </div>
                                        <div class="spec-item" style="padding-left: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Built-up Area</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.builtUpArea || '1,150 Sq. Ft.'}</span>
                                        </div>
                                        <div class="spec-item" style="padding-right: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Project Name</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.developer} Andheri Premium</span>
                                        </div>
                                        <div class="spec-item" style="padding-left: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Ownership</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.ownership || 'Freehold'}</span>
                                        </div>
                                        <div class="spec-item" style="padding-right: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Transaction Type</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.transactionType || 'Resale / New Booking'}</span>
                                        </div>
                                        <div class="spec-item" style="padding-left: 1.5rem;">
                                            <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">RERA Number</span>
                                            <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">${prop.reraNumber || 'P51800012345'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- RIGHT COLUMN: Agent Sidebar Card -->
                        <div class="details-right-col" style="position: sticky; top: 100px;">
                            <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-md);">
                                
                                <!-- Agent Profile -->
                                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                    <img src="file:///C:/Users/Varun/.gemini/antigravity-ide/brain/92599d37-dffd-4f16-88c4-137f069df6c8/agent_portrait_1780657382297.png" 
                                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200';"
                                         alt="Vikram Malhotra" style="width: 55px; height: 55px; border-radius: 8px; object-fit: cover;">
                                    <div>
                                        <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin: 0; letter-spacing: -0.3px;">Vikram Malhotra</h4>
                                        <span style="color: var(--color-gold); font-size: 0.8rem; font-weight: 600; display: block; margin-top: 0.15rem;">Platinum Partner, Elite Estates</span>
                                    </div>
                                </div>

                                <!-- Verification Details -->
                                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
                                    <div style="display: flex; align-items: center; gap: 0.65rem; color: var(--color-text-main); font-size: 0.9rem; font-weight: 500;">
                                        <i class="fa-solid fa-circle-check" style="color: var(--color-gold); font-size: 1rem; width: 16px;"></i>
                                        <span>RERA Registered Agent</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.65rem; color: var(--color-text-main); font-size: 0.9rem; font-weight: 500;">
                                        <i class="fa-solid fa-clock-rotate-left" style="color: var(--color-gold); font-size: 1rem; width: 16px;"></i>
                                        <span>12+ Years Experience</span>
                                    </div>
                                </div>

                                <!-- CTA Shortcut Buttons -->
                                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem;">
                                    <button class="agent-btn">
                                        <i class="fa-regular fa-calendar-check" style="color: var(--color-gold); font-size: 1rem;"></i> Book Site Visit
                                    </button>
                                    <button class="agent-btn">
                                        <i class="fa-solid fa-phone" style="color: var(--color-gold); font-size: 0.9rem;"></i> Contact Agent
                                    </button>
                                    <button class="agent-btn">
                                        <i class="fa-brands fa-whatsapp" style="color: var(--color-gold); font-size: 1.1rem;"></i> WhatsApp Enquiry
                                    </button>
                                               <!-- Direct Message Form -->
                                 <div style="border-top: 1px solid var(--color-border); padding-top: 1.5rem;">
                                     <span style="display: block; text-align: center; color: var(--color-text-muted); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1.25rem;">Request more information</span>
                                     <form id="agentInquiryForm" style="display: flex; flex-direction: column; gap: 0.85rem;">
                                         <input type="text" id="agentInquiryName" placeholder="Your Name" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9rem; outline: none; background: var(--color-bg-light); transition: all 0.2s;" onfocus="this.style.borderColor='var(--color-gold)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--color-border)'; this.style.background='var(--color-bg-light)'">
                                         <input type="email" id="agentInquiryEmail" placeholder="Your Email" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9rem; outline: none; background: var(--color-bg-light); transition: all 0.2s;" onfocus="this.style.borderColor='var(--color-gold)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--color-border)'; this.style.background='var(--color-bg-light)'">
                                         <textarea id="agentInquiryMessage" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.9rem; outline: none; background: var(--color-bg-light); transition: all 0.2s; min-height: 80px; resize: vertical;" onfocus="this.style.borderColor='var(--color-gold)'; this.style.background='#fff'" onblur="this.style.borderColor='var(--color-border)'; this.style.background='var(--color-bg-light)'">I'm interested in ${prop.name}...</textarea>
                                         <button type="submit" class="btn btn-gold w-100" style="padding: 0.85rem 1.5rem; font-weight: 600; border-radius: var(--radius-sm); border: none; margin-top: 0.25rem;">Send Message</button>
                                     </form>
                                 </div>                          </div>

                            </div>
                        </div>

                    </div>
                </section>

                <!-- EXCLUSIVE AMENITIES SECTION -->
                <section class="container" style="padding: 3rem 2rem 2rem;">
                    <h2 class="section-title" style="margin-bottom: 2rem; position: relative; padding-left: 1rem; border-left: 4px solid var(--color-gold); font-size: 1.8rem;">Exclusive Amenities</h2>
                    <div class="amenities-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        <div class="amenity-item" data-name="Swimming Pool" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-person-swimming"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Swimming Pool</span>
                        </div>
                        <div class="amenity-item" data-name="Gym" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-dumbbell"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Gym</span>
                        </div>
                        <div class="amenity-item" data-name="Club House" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-building-columns"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Club House</span>
                        </div>
                        <div class="amenity-item" data-name="Play Area" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-child"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Play Area</span>
                        </div>
                        <div class="amenity-item" data-name="Garden" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-leaf"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Garden</span>
                        </div>
                        <div class="amenity-item" data-name="Jogging Track" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-person-running"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Jogging Track</span>
                        </div>
                        <div class="amenity-item" data-name="Parking" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-square-parking"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Parking</span>
                        </div>
                        <div class="amenity-item" data-name="Security" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-shield-halved"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Security</span>
                        </div>
                        <div class="amenity-item" data-name="Power Backup" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-bolt"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Power Backup</span>
                        </div>
                        <div class="amenity-item" data-name="CCTV" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; cursor: pointer; transition: all var(--transition-smooth); text-align: center; box-shadow: var(--shadow-sm);">
                            <div class="amenity-icon-container" style="width: 50px; height: 50px; background: var(--color-bg-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem; transition: all var(--transition-fast);">
                                <i class="fa-solid fa-video"></i>
                            </div>
                            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">CCTV System</span>
                        </div>
                    </div>
                </section>

                <!-- CONTACT CTA -->
                <section class="container" style="padding: 2rem; display: flex; gap: 2rem; align-items: center; background: var(--color-bg-light); border-radius: 16px; margin: 0 2rem 4rem;">
                    <div style="flex:1;">
                        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Interested in ${prop.name}?</h3>
                        <p style="color: var(--color-text-light);">Talk to our expert agents for a free site visit or detailed pricing breakdown.</p>
                    </div>
                    <a href="contact.html" class="btn btn-gold" style="white-space:nowrap; padding: 1rem 2rem;">Book a Site Visit</a>
                </section>
            `;

            // Make amenities static (no hover effects or modals)
            detailsRoot.querySelectorAll('.amenity-item').forEach(item => {
                item.style.pointerEvents = 'none';
            });

            // Connect agent inquiry form if it exists
            const agentForm = document.getElementById('agentInquiryForm');
            if (agentForm) {
                agentForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const nameInput = document.getElementById('agentInquiryName');
                    const emailInput = document.getElementById('agentInquiryEmail');
                    const messageInput = document.getElementById('agentInquiryMessage');
                    const submitBtn = agentForm.querySelector('[type="submit"]');

                    const name = nameInput ? nameInput.value.trim() : 'Guest';
                    const email = emailInput ? emailInput.value.trim() : '';
                    const message = messageInput ? messageInput.value.trim() : '';

                    if (backendAvailable) {
                        const originalText = submitBtn ? submitBtn.textContent : '';
                        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
                        try {
                            const res = await fetch(`${API_BASE}/inquiries`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    name,
                                    email,
                                    phone: '',
                                    message,
                                    propertyName: prop.name,
                                    propertyId: prop.id
                                })
                            });
                            if (res.ok) {
                                showToast(`Thank you, ${name}! Your inquiry for ${prop.name} has been sent.`, 'success');
                                agentForm.reset();
                            } else {
                                showToast('Submission failed. Please try again.', 'error');
                            }
                        } catch (err) {
                            showToast(`Thank you, ${name}! Your inquiry has been received.`, 'success');
                            agentForm.reset();
                        } finally {
                            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
                        }
                    } else {
                        showToast(`Thank you, ${name}! Your inquiry for ${prop.name} has been received. Vikram Malhotra will contact you shortly.`, 'success');
                        agentForm.reset();
                    }
                });
            }

        } else {
            detailsRoot.innerHTML = `
                <div style="text-align:center; padding: 8rem 2rem;">
                    <h2>Property Not Found</h2>
                    <p style="margin-top:1rem; color: var(--color-text-light);">This property may have been removed or the link is invalid.</p>
                    <a href="index.html" class="btn btn-gold" style="display:inline-block; margin-top: 2rem;">← Back to Properties</a>
                </div>
            `;
        }
    }

    // Filter State Management
    let filters = {
        location: 'all',
        bhk: 'all',
        price: 'all',
        developer: 'all'
    };

    const locationSelect = document.getElementById('filter-location');
    const bhkSelect = document.getElementById('filter-bhk');
    const priceSelect = document.getElementById('filter-price');
    const developerSelect = document.getElementById('filter-developer');
    
    // Sync initial dropdown values
    if (locationSelect) locationSelect.value = filters.location;
    if (bhkSelect) bhkSelect.value = filters.bhk;
    if (priceSelect) priceSelect.value = filters.price;
    if (developerSelect) developerSelect.value = filters.developer;

    // Helper functions for matching
    function matchLocation(locStr, locRange) {
        if (locRange === 'all') return true;
        return locStr.toLowerCase().includes(locRange.toLowerCase());
    }

    function matchBhk(typeStr, bhkRange) {
        if (bhkRange === 'all') return true;
        return typeStr.includes(bhkRange);
    }

    function matchPrice(priceStr, priceRange) {
        if (priceRange === 'all') return true;
        const num = parseFloat(priceStr.replace(/[^\d.]/g, ''));
        if (isNaN(num)) return true;
        
        if (priceRange === 'under-3') {
            return num < 3.0;
        } else if (priceRange === '3-6') {
            return num >= 3.0 && num <= 6.0;
        } else if (priceRange === 'over-6') {
            return num > 6.0;
        }
        return true;
    }

    function matchDeveloper(devStr, devRange) {
        if (devRange === 'all') return true;
        return devStr.toLowerCase() === devRange.toLowerCase();
    }

    function applyFiltering() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        currentFilteredList = properties.filter(prop => {
            const matchesSearch = 
                prop.name.toLowerCase().includes(searchTerm) || 
                prop.location.toLowerCase().includes(searchTerm) ||
                prop.type.toLowerCase().includes(searchTerm);
                
            const matchesLocation = matchLocation(prop.location, filters.location);
            const matchesBhk = matchBhk(prop.type, filters.bhk);
            const matchesPrice = matchPrice(prop.price, filters.price);
            const matchesDeveloper = matchDeveloper(prop.developer, filters.developer);
            
            return matchesSearch && matchesLocation && matchesBhk && matchesPrice && matchesDeveloper;
        });
        
        currentPage = 1;
        renderProperties();
        renderActiveFilters();
    }

    const activeFiltersContainer = document.getElementById('activeFilters');
    
    function renderActiveFilters() {
        if (!activeFiltersContainer) return;
        
        let html = '';
        
        if (filters.location !== 'all') {
            html += `<span class="filter-pill" data-type="location">${filters.location} <i class="fa-solid fa-xmark remove-filter"></i></span>`;
        }
        if (filters.bhk !== 'all') {
            html += `<span class="filter-pill" data-type="bhk">${filters.bhk} <i class="fa-solid fa-xmark remove-filter"></i></span>`;
        }
        if (filters.price !== 'all') {
            let label = '';
            if (filters.price === 'under-3') label = 'Under ₹ 3 Cr';
            else if (filters.price === '3-6') label = '₹ 3 Cr - ₹ 6 Cr';
            else if (filters.price === 'over-6') label = 'Over ₹ 6 Cr';
            html += `<span class="filter-pill" data-type="price">${label} <i class="fa-solid fa-xmark remove-filter"></i></span>`;
        }
        if (filters.developer !== 'all') {
            html += `<span class="filter-pill" data-type="developer">${filters.developer} <i class="fa-solid fa-xmark remove-filter"></i></span>`;
        }
        
        activeFiltersContainer.innerHTML = html;
        
        // Add event listeners to remove buttons
        activeFiltersContainer.querySelectorAll('.remove-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pill = e.target.closest('.filter-pill');
                if (pill) {
                    const type = pill.dataset.type;
                    filters[type] = 'all';
                    
                    // Sync select inputs
                    const selectEl = document.getElementById(`filter-${type}`);
                    if (selectEl) selectEl.value = 'all';
                    
                    applyFiltering();
                }
            });
        });
    }

    // Toggle Filter Panel
    const filterBtn = document.getElementById('filterBtn');
    const filterPanel = document.getElementById('filterPanel');
    if (filterBtn && filterPanel) {
        filterBtn.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
        });
    }

    // Apply and Clear buttons in Filter Panel
    const btnApplyFilters = document.getElementById('btnApplyFilters');
    if (btnApplyFilters) {
        btnApplyFilters.addEventListener('click', () => {
            filters.location = locationSelect ? locationSelect.value : 'all';
            filters.bhk = bhkSelect ? bhkSelect.value : 'all';
            filters.price = priceSelect ? priceSelect.value : 'all';
            filters.developer = developerSelect ? developerSelect.value : 'all';
            applyFiltering();
            if (filterPanel) filterPanel.classList.remove('active');
        });
    }

    const btnClearFilters = document.getElementById('btnClearFilters');
    if (btnClearFilters) {
        btnClearFilters.addEventListener('click', () => {
            if (locationSelect) locationSelect.value = 'all';
            if (bhkSelect) bhkSelect.value = 'all';
            if (priceSelect) priceSelect.value = 'all';
            if (developerSelect) developerSelect.value = 'all';
            
            filters = {
                location: 'all',
                bhk: 'all',
                price: 'all',
                developer: 'all'
            };
            applyFiltering();
            if (filterPanel) filterPanel.classList.remove('active');
        });
    }

    // Mobile Menu Logic
    const menuIcon = document.querySelector('.menu-icon');
    const closeMenu = document.getElementById('closeMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (menuIcon && mobileNav) {
        menuIcon.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    if (closeMenu && mobileNav) {
        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // PROPERTY SEARCH & FILTERING (index.html)
    const searchInput = document.querySelector('.search-input');
    if (searchInput && propertiesGrid) {
        searchInput.addEventListener('input', () => {
            applyFiltering();
        });
    }

    // Initialize list with default filters
    applyFiltering();

    // Connect with Agent Button scroll
    const connectAgentBtn = document.querySelector('.cta-content .btn-gold');
    if (connectAgentBtn) {
        connectAgentBtn.addEventListener('click', () => {
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Inquiry Form Submission (with API integration)
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            const submitBtn = inquiryForm.querySelector('[type="submit"]');

            const name = nameInput ? nameInput.value.trim() : 'Guest';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (backendAvailable) {
                const originalText = submitBtn ? submitBtn.textContent : '';
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
                try {
                    const res = await fetch(`${API_BASE}/inquiries`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, phone, message })
                    });
                    if (res.ok) {
                        showToast(`Thank you, ${name}! Your inquiry has been received. We'll get in touch shortly.`, 'success');
                        inquiryForm.reset();
                    } else {
                        showToast('Submission failed. Please try again.', 'error');
                    }
                } catch (err) {
                    showToast(`Thank you, ${name}! Your inquiry has been received.`, 'success');
                    inquiryForm.reset();
                } finally {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
                }
            } else {
                showToast(`Thank you, ${name}! Your inquiry has been received. Our luxury property consultants will get in touch with you shortly.`, 'success');
                inquiryForm.reset();
            }
        });
    }

    // Global Interaction Routing (already exists or needs update for new elements)
    
    // Header Call Now Button -> Contact Page
    document.querySelectorAll('.call-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    });

    // Hero Get Started Button -> Explore Page
    document.querySelectorAll('.banner-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'explore.html';
        });
    });

    // Carousel Project Cards -> Property Details (reads data-id from card)
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const id = card.dataset.id || '';
            window.location.href = `property-details.html${id ? '?id=' + id : ''}`;
        });
    });

    // Newsletter Forms (Footer) - class-based, catches all on page (with API integration)
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[type="text"]');
            const email = emailInput ? emailInput.value.trim() : '';
            const submitBtn = form.querySelector('[type="submit"]');

            if (backendAvailable && email) {
                const originalText = submitBtn ? submitBtn.textContent : '';
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Subscribing...'; }
                try {
                    const res = await fetch(`${API_BASE}/newsletter`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });
                    if (res.ok) {
                        showToast('You\'re subscribed! Welcome to the Elite Estates Newsletter.', 'success');
                        form.reset();
                    } else {
                        showToast('Subscription failed. Please try again.', 'error');
                    }
                } catch (err) {
                    showToast('Thank you for subscribing to the Elite Estates Newsletter!', 'success');
                    form.reset();
                } finally {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
                }
            } else {
                showToast('Thank you for subscribing to the Elite Estates Newsletter!', 'success');
                form.reset();
            }
        });
    });

    // =============================================
    // TOAST NOTIFICATION SYSTEM
    // =============================================
    function showToast(message, type = 'success') {
        // Remove any existing toast
        const existing = document.getElementById('site-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'site-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 9999;
            background: ${type === 'success' ? '#0F1622' : '#1a0a0a'};
            color: ${type === 'success' ? '#10B981' : '#EF4444'};
            border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            max-width: 380px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        `;
        toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${message}`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 4500);
    }

    // Projects Carousel Navigation & Visibility
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = carousel.querySelector('.project-card');
            if (card) {
                // Card offsetWidth + 32px (gap between cards)
                return card.offsetWidth + 32;
            }
            return 380;
        };

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        // Hide scroll arrows if the screen is wide enough that no scrolling is needed
        const toggleControlsVisibility = () => {
            const controls = document.querySelector('.carousel-controls');
            if (controls) {
                if (carousel.scrollWidth <= carousel.clientWidth) {
                    controls.style.display = 'none';
                } else {
                    controls.style.display = 'flex';
                }
            }
        };

        // Check on load and window resize
        // Wrap in a tiny timeout to ensure styling and layout are computed
        setTimeout(toggleControlsVisibility, 100);
        window.addEventListener('resize', toggleControlsVisibility);
        
        // Also check visibility on scroll-snap to handle dynamic updates
        carousel.addEventListener('scroll', toggleControlsVisibility);
    }

    // Dynamic Service Modals in Footer
    const servicesHeadings = Array.from(document.querySelectorAll('.footer-heading')).find(h => h.textContent.trim() === 'SERVICES');
    if (servicesHeadings) {
        const servicesMenu = servicesHeadings.nextElementSibling;
        if (servicesMenu) {
            const serviceLinks = servicesMenu.querySelectorAll('a');
            serviceLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const serviceName = link.textContent.trim();
                    showServiceModal(serviceName);
                });
            });
        }
    }

    function showServiceModal(serviceName) {
        const serviceData = {
            'Property Management': {
                icon: 'fa-building-user',
                desc: 'Elite Estates offers premium property management services for owners in Mumbai. We handle tenant sourcing, monthly rent collection, property maintenance, and legal documentation end-to-end.'
            },
            'Legal Advisory': {
                icon: 'fa-scale-balanced',
                desc: 'Our in-house legal experts perform comprehensive due diligence, title verification, stamp duty checks, and secure draft closures to ensure a 100% secure transaction.'
            },
            'Interior Design': {
                icon: 'fa-couch',
                desc: 'Transform your raw space into a bespoke luxury home. Our award-winning design partners offer end-to-end bespoke styling, premium finishes, and turnkey executions.'
            },
            'Home Loan Support': {
                icon: 'fa-hand-holding-dollar',
                desc: 'Fast-track your home purchase with our trusted banking partners. We offer priority processing, lowest interest rates, and seamless document facilitation.'
            },
            'Virtual Tours': {
                icon: 'fa-vr-cardboard',
                desc: 'Experience ultra-high-definition 3D walkthroughs of our properties from anywhere in the world. Our immersive VR tours offer precise layout feel and views.'
            }
        };

        const data = serviceData[serviceName] || { icon: 'fa-briefcase', desc: 'Expert premium real estate services tailored to your exact needs.' };

        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'services-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 13, 20, 0.85);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.3s ease;
            padding: 2rem;
        `;

        modal.innerHTML = `
            <div class="services-modal-content" style="
                background: #fff;
                border-radius: 16px;
                max-width: 500px;
                width: 100%;
                padding: 2.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                border: 1px solid var(--color-border);
            ">
                <button class="services-modal-close" style="
                    position: absolute;
                    top: 1.25rem; right: 1.25rem;
                    font-size: 1.5rem; color: var(--color-text-muted);
                    background: none; border: none; cursor: pointer;
                    transition: color 0.2s ease;
                " aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>

                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="
                        width: 60px; height: 60px;
                        background: var(--color-primary);
                        color: var(--color-gold);
                        border-radius: 12px;
                        display: inline-flex; align-items: center; justify-content: center;
                        font-size: 2rem; margin-bottom: 1.25rem;
                    ">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <h3 style="font-size: 1.75rem; color: var(--color-primary); font-weight: 700; margin-bottom: 0.75rem;">${serviceName}</h3>
                    <p style="color: var(--color-text-muted); line-height: 1.8; font-size: 1rem; margin-bottom: 2rem;">${data.desc}</p>
                    
                    <button class="btn btn-gold services-modal-btn w-100" style="padding: 0.9rem 1.5rem; border-radius: 8px;">Inquire About This Service</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.services-modal-content').style.transform = 'scale(1)';
        }, 10);

        // Close functions
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.services-modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        modal.querySelector('.services-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Inquire Button Action
        modal.querySelector('.services-modal-btn').addEventListener('click', () => {
            closeModal();
            // Redirect to contact page
            window.location.href = `contact.html?service=${encodeURIComponent(serviceName)}`;
        });
    }

    // Auto-fill contact form service parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = `I am interested in learning more about your "${serviceParam}" service. Please contact me with more information.`;
        }
    }

    // Amenity details database and modal popup controller
    const amenityDetails = {
        'Swimming Pool': {
            icon: 'fa-person-swimming',
            title: 'Infinity Swimming Pool',
            desc: 'Escape the heat in our temperature-controlled infinity pool offering panoramic views of the city skyline. Complete with a separate kids pool, lounge chairs, and poolside cabanas.',
            image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
        },
        'Gym': {
            icon: 'fa-dumbbell',
            title: 'State-of-the-Art Fitness Center',
            desc: 'Achieve your health goals in our fully equipped gymnasium featuring the latest cardio machines, strength training equipment, free weights, and a dedicated yoga/cardio room.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
        },
        'Club House': {
            icon: 'fa-building-columns',
            title: 'Luxury Community Club House',
            desc: 'A premium social hub for residents, featuring a private mini-theater, a pool table and indoor games, a business lounge, and a banquet hall for hosting private celebrations.',
            image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800'
        },
        'Play Area': {
            icon: 'fa-child',
            title: 'Kids Adventure Play Zone',
            desc: 'A safe, rubber-floored outdoor play arena designed for children of all ages, complete with slides, swings, climbing structures, and a seating area for parents.',
            image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800'
        },
        'Garden': {
            icon: 'fa-leaf',
            title: 'Lush Landscaped Gardens',
            desc: 'Relax and connect with nature in beautifully curated botanical gardens featuring reflexology walking paths, senior citizen sitting zones, and water fountains.',
            image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'
        },
        'Jogging Track': {
            icon: 'fa-person-running',
            title: 'Elevated Jogging Track',
            desc: 'Stay active on our dedicated, tree-lined rubberized jogging and cycling track running along the perimeter of the property away from vehicular traffic.',
            image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800'
        },
        'Parking': {
            icon: 'fa-square-parking',
            title: 'Multi-Level Secure Parking',
            desc: 'Dedicated stack and basement parking with automated access control cards, EV charging stations, and 24/7 valet assistance for residents and guests.',
            image: 'file:///C:/Users/Varun/.gemini/antigravity-ide/brain/92599d37-dffd-4f16-88c4-137f069df6c8/parking_garage_1780657367512.png',
            fallback: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=800'
        },
        'Security': {
            icon: 'fa-shield-halved',
            title: '3-Tier 24/7 Security Guarding',
            desc: 'Comprehensive round-the-clock security with manned entry gates, visitor logging systems, regular security patrols, and intercom facilities connected to every apartment.',
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
        },
        'Power Backup': {
            icon: 'fa-bolt',
            title: '100% Power Generator Backup',
            desc: 'Seamless automatic power backup systems ensuring uninterrupted supply to elevators, common area lighting, safety alarms, and essential appliances in all homes.',
            image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800'
        },
        'CCTV': {
            icon: 'fa-video',
            title: 'Complete CCTV Surveillance',
            desc: 'Advanced high-definition security camera network covering all building entry points, lobbies, hallways, elevators, and outdoor common zones managed from a central control room.',
            image: 'file:///C:/Users/Varun/.gemini/antigravity-ide/brain/92599d37-dffd-4f16-88c4-137f069df6c8/cctv_camera_1780657350304.png',
            fallback: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800'
        }
    };

    function showAmenityModal(amenityName) {
        const data = amenityDetails[amenityName];
        if (!data) return;

        const modal = document.createElement('div');
        modal.className = 'amenity-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 13, 20, 0.85);
            backdrop-filter: blur(8px);
            z-index: 2100;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.3s ease;
            padding: 2rem;
        `;

        modal.innerHTML = `
            <div class="amenity-modal-content" style="
                background: #fff;
                border-radius: 16px;
                max-width: 500px;
                width: 100%;
                padding: 2.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                border: 1px solid var(--color-border);
            ">
                <button class="amenity-modal-close" style="
                    position: absolute;
                    top: 1.25rem; right: 1.25rem;
                    font-size: 1.5rem; color: var(--color-text-muted);
                    background: none; border: none; cursor: pointer;
                    transition: color 0.2s ease;
                    z-index: 10;
                " aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>

                <div style="text-align: center; margin-top: 1rem;">
                    <div style="
                        width: 60px; height: 60px;
                        background: var(--color-primary);
                        color: var(--color-gold);
                        border-radius: 12px;
                        display: inline-flex; align-items: center; justify-content: center;
                        font-size: 2rem; margin-bottom: 1.25rem;
                    ">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <h3 style="font-size: 1.65rem; color: var(--color-primary); font-weight: 700; margin-bottom: 1rem;">${data.title}</h3>
                    <p style="color: var(--color-text-muted); line-height: 1.8; font-size: 1.05rem; margin-bottom: 2rem;">${data.desc}</p>
                    
                    <div style="display: flex; justify-content: center;">
                        <button class="btn btn-dark amenity-modal-close-btn" style="padding: 0.75rem 2rem; border-radius: 8px;">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.amenity-modal-content').style.transform = 'scale(1)';
        }, 10);

        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.amenity-modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        modal.querySelector('.amenity-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.amenity-modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // =============================================
    // PROPERTY CLASSIFICATION TABS LOGIC (explore.html)
    // =============================================
    const categoryContent = document.getElementById('categoryContent');
    if (categoryContent) {
        const categoryShowcaseData = {
            'residential': [
                {
                    name: 'Skyline Residency',
                    location: 'Andheri East, Mumbai',
                    desc: 'Ultra-modern 2 BHK premium apartments with dynamic sunset deck and complete safety infrastructure.',
                    price: '₹ 2.25 Cr',
                    area: '850 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
                    badge: 'READY TO MOVE',
                    specs: {
                        'Type': '2 BHK',
                        'Carpet': '850 Sq.Ft.',
                        'Status': 'New Launch'
                    },
                    amenities: [
                        { icon: 'fa-person-swimming', name: 'Pool' },
                        { icon: 'fa-dumbbell', name: 'Gym' },
                        { icon: 'fa-leaf', name: 'Garden' }
                    ],
                    actionTarget: 'property-details.html?id=1'
                },
                {
                    name: 'Imperial Vista',
                    location: 'Andheri East, Mumbai',
                    desc: 'Super luxury 2 BHK units situated in the pristine high-growth corridor of Mumbai with direct sky pool access.',
                    price: '₹ 2.15 Cr',
                    area: '875 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
                    badge: 'PREMIUM SELECTION',
                    specs: {
                        'Type': '2 BHK',
                        'Carpet': '875 Sq.Ft.',
                        'Status': 'Verified'
                    },
                    amenities: [
                        { icon: 'fa-spa', name: 'Spa Deck' },
                        { icon: 'fa-bolt', name: 'Backup' },
                        { icon: 'fa-video', name: 'CCTV' }
                    ],
                    actionTarget: 'property-details.html?id=3'
                },
                {
                    name: 'Elite Heights',
                    location: 'Andheri East, Mumbai',
                    desc: 'Fully loaded apartments with multi-level automated car park, 24/7 round-the-clock guards, and lounge gym.',
                    price: '₹ 2.40 Cr',
                    area: '920 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
                    badge: 'BEST SELLER',
                    specs: {
                        'Type': '2 BHK',
                        'Carpet': '920 Sq.Ft.',
                        'Status': 'Ready'
                    },
                    amenities: [
                        { icon: 'fa-shield-halved', name: '24/7 Security' },
                        { icon: 'fa-square-parking', name: 'Parking' },
                        { icon: 'fa-dumbbell', name: 'Gym' }
                    ],
                    actionTarget: 'property-details.html?id=2'
                }
            ],
            'commercial': [
                {
                    name: 'Vanguard Corporate Plaza',
                    location: 'Bandra Kurla Complex (BKC), Mumbai',
                    desc: 'Grade A premium executive office suite with floor-to-ceiling double-glazed glass windows and smart parking systems.',
                    price: '₹ 18.50 Cr',
                    area: '4,500 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
                    badge: 'EXCLUSIVE AGENT',
                    specs: {
                        'Type': 'Office Space',
                        'Efficiency': '82%',
                        'Parking': '8 Slots'
                    },
                    amenities: [
                        { icon: 'fa-network-wired', name: 'Hi-Speed Fiber' },
                        { icon: 'fa-users', name: 'Conf Room' },
                        { icon: 'fa-square-parking', name: 'Valet' }
                    ],
                    actionTarget: 'contact.html?service=Legal%20Advisory'
                },
                {
                    name: 'Apex Commercial Hub',
                    location: 'Andheri East, Mumbai',
                    desc: 'Boutique office suites designed for corporate HQs and tech startups, featuring 100% power generator backup.',
                    price: '₹ 4.20 Cr',
                    area: '1,800 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                    badge: 'GRADE A OFFICE',
                    specs: {
                        'Type': 'HQ Studio',
                        'Efficiency': '78%',
                        'Parking': '3 Slots'
                    },
                    amenities: [
                        { icon: 'fa-bolt', name: 'Power Backup' },
                        { icon: 'fa-video', name: 'Surveillance' },
                        { icon: 'fa-elevator', name: 'High Speed lift' }
                    ],
                    actionTarget: 'contact.html?service=Legal%20Advisory'
                },
                {
                    name: 'Pinnacle Business Park',
                    location: 'Lower Parel, Mumbai',
                    desc: 'Centrally located luxury workspace with panoramic city skyline views, executive lounge, and cafeteria access.',
                    price: '₹ 7.80 Cr',
                    area: '2,400 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
                    badge: 'INVESTMENT OPPORTUNITY',
                    specs: {
                        'Type': 'Boutique Office',
                        'Efficiency': '80%',
                        'Parking': '4 Slots'
                    },
                    amenities: [
                        { icon: 'fa-mug-hot', name: 'Lounge Cafe' },
                        { icon: 'fa-briefcase', name: 'Reception' },
                        { icon: 'fa-shield-halved', name: 'CCTV Guarded' }
                    ],
                    actionTarget: 'contact.html?service=Legal%20Advisory'
                }
            ],
            'land': [
                {
                    name: 'Alibaug Coastal View Plots',
                    location: 'Mandwa Jetty Area, Alibaug',
                    desc: 'Pristine coastal villa plot, cleared titles, fully fenced boundary, featuring 100% RERA title verification.',
                    price: '₹ 3.40 Cr',
                    area: '12,000 Sq. Ft.',
                    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
                    badge: 'RERA VERIFIED',
                    specs: {
                        'Type': 'Villa Plot',
                        'Frontage': '80 Ft.',
                        'Zoning': 'Residential NA'
                    },
                    amenities: [
                        { icon: 'fa-road', name: '12m Road' },
                        { icon: 'fa-droplet', name: 'Water Line' },
                        { icon: 'fa-sun', name: 'Clear Sky View' }
                    ],
                    actionTarget: 'contact.html?service=Property%20Management'
                },
                {
                    name: 'Golden Crest Farms',
                    location: 'Karjat Foothills, Mumbai Outer',
                    desc: 'Lush agricultural / non-agricultural land parcel perfect for farmhouses or boutique eco-resort projects.',
                    price: '₹ 1.95 Cr',
                    area: '1.5 Acres',
                    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
                    badge: 'HIGH APPRECIATION',
                    specs: {
                        'Type': 'Farm Land',
                        'Frontage': '150 Ft.',
                        'Zoning': 'Agricultural / NA'
                    },
                    amenities: [
                        { icon: 'fa-mountain', name: 'Hill View' },
                        { icon: 'fa-leaf', name: 'Soil Rich' },
                        { icon: 'fa-faucet-drip', name: 'Borewell Done' }
                    ],
                    actionTarget: 'contact.html?service=Property%20Management'
                },
                {
                    name: 'Bhiwandi Logistic Parcel',
                    location: 'Mumbai-Nashik Highway, Bhiwandi',
                    desc: 'High-connectivity commercial/industrial parcel ideal for warehousing, logistics hub, or corporate yards.',
                    price: '₹ 8.50 Cr',
                    area: '2.2 Acres',
                    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
                    badge: 'HIGHWAY ACCESS',
                    specs: {
                        'Type': 'Industrial Plot',
                        'Frontage': '200 Ft.',
                        'Zoning': 'Industrial Zone'
                    },
                    amenities: [
                        { icon: 'fa-truck-fast', name: 'Highway Front' },
                        { icon: 'fa-bolt', name: 'Power Line' },
                        { icon: 'fa-warehouse', name: 'Zoned NA' }
                    ],
                    actionTarget: 'contact.html?service=Property%20Management'
                }
            ]
        };

        async function renderCategoryShowcase(category) {
            let dataList = [];
            if (backendAvailable) {
                try {
                    const res = await fetch(`${API_BASE}/properties?category=${category}`);
                    if (res.ok) {
                        dataList = await res.json();
                    }
                } catch (e) {
                    console.error('Failed to fetch category showcase from backend:', e);
                }
            }
            
            // Fallback to local showcase data
            if (!dataList || dataList.length === 0) {
                dataList = categoryShowcaseData[category];
            }

            if (!dataList) return;

            categoryContent.innerHTML = `
                <div class="category-grid">
                    ${dataList.map(item => {
                        const specs = item.specs || {
                            'Type': item.type,
                            'Carpet': item.area,
                            'Status': item.status || 'Verified'
                        };
                        
                        let amenitiesHTML = '';
                        if (item.amenities && item.amenities.length > 0) {
                            amenitiesHTML = item.amenities.map(am => `
                                <span class="category-card-amenity-badge">
                                    <i class="fa-solid ${am.icon || 'fa-circle-check'}"></i> ${am.name || am}
                                </span>
                            `).join('');
                        } else {
                            const defaultAmenities = category === 'residential' 
                                ? [{ icon: 'fa-person-swimming', name: 'Pool' }, { icon: 'fa-dumbbell', name: 'Gym' }, { icon: 'fa-leaf', name: 'Garden' }]
                                : category === 'commercial'
                                ? [{ icon: 'fa-network-wired', name: 'Hi-Speed Fiber' }, { icon: 'fa-users', name: 'Conf Room' }, { icon: 'fa-square-parking', name: 'Valet' }]
                                : [{ icon: 'fa-road', name: '12m Road' }, { icon: 'fa-droplet', name: 'Water Line' }, { icon: 'fa-sun', name: 'Clear Sky View' }];
                            
                            amenitiesHTML = defaultAmenities.map(am => `
                                <span class="category-card-amenity-badge">
                                    <i class="fa-solid ${am.icon}"></i> ${am.name}
                                </span>
                            `).join('');
                        }

                        const actionTarget = category === 'residential' 
                            ? `property-details.html?id=${item.id}`
                            : `contact.html?service=${encodeURIComponent(category === 'commercial' ? 'Legal Advisory' : 'Property Management')}`;

                        return `
                        <div class="category-card">
                            <div class="category-card-img-wrapper">
                                <img src="${item.image}" alt="${item.name}" class="category-card-img" onerror="this.src='https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600'">
                                ${item.badge ? `<span class="category-card-badge">${item.badge}</span>` : ''}
                            </div>
                            <div class="category-card-content">
                                <h3 class="category-card-title">${item.name}</h3>
                                <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem; font-weight: 500;">
                                    <i class="fa-solid fa-location-dot" style="color: var(--color-gold);"></i> ${item.location}
                                </p>
                                <p class="category-card-desc">${item.description1 || item.desc || ''}</p>
                                <div class="category-card-specs">
                                    ${Object.entries(specs).map(([label, val]) => `
                                        <div class="category-card-spec-item">
                                            <span class="category-card-spec-label">${label}</span>
                                            <span class="category-card-spec-value">${val}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="category-card-amenities">
                                    ${amenitiesHTML}
                                </div>
                                <div class="category-card-footer">
                                    <div class="category-card-price">${item.price}</div>
                                    <button class="btn btn-dark category-card-btn" onclick="window.location.href='${actionTarget}'">
                                        ${category === 'residential' ? 'View Details' : 'Inquire Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            `;
        }

        // Setup click handlers for tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                // Get selected category
                const selectedCat = btn.dataset.category;
                // Render corresponding category data
                renderCategoryShowcase(selectedCat);
            });
        });

        // Initialize showing residential category
        renderCategoryShowcase('residential');
    }

    // Trigger background loading of live properties from backend
    loadLiveProperties();

});
