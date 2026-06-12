const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Initial seed data representing all properties from the original script.js
const INITIAL_PROPERTIES = [
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
        badgeColor: '',
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
        category: 'residential',
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
        floor: '12th of 20',
        furniture: 'Fully',
        status: 'Ready',
        sqFtPrice: '₹ 26,086 / Sq. Ft.',
        builtUpArea: '1,200 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale',
        reraNumber: 'P51800098765',
        description1: 'Elite Heights by Lodha Group is a luxury residential masterpiece located in the heart of Andheri East. This property offers cross-ventilation, panoramic views, and premium Italian marble flooring.',
        description2: 'Equipped with a modern modular kitchen, high-quality sanitary fixtures, and direct access to state-of-the-art club amenities.',
        category: 'residential',
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
        badgeColor: '',
        floor: '6th of 15',
        furniture: 'Unfurnished',
        status: 'Ready',
        sqFtPrice: '₹ 24,571 / Sq. Ft.',
        builtUpArea: '1,100 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'New Booking',
        reraNumber: 'P51800044556',
        description1: 'Imperial Vista features beautifully designed 2 BHK apartments in a high-rise tower, boasting modern aesthetic, wide balconies, and ample natural light.',
        description2: 'Perfect for families seeking a peaceful retreat within a well-connected corporate corridor.',
        category: 'residential',
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
        badgeColor: '',
        floor: '22nd of 30',
        furniture: 'Fully',
        status: 'Ready',
        sqFtPrice: '₹ 30,000 / Sq. Ft.',
        builtUpArea: '1,650 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale',
        reraNumber: 'P51800077889',
        description1: 'The Grand Regency represents pure opulence. Located at a premium high-rise in Andheri East, this massive 3 BHK apartment boasts top-tier imported finishes and smart-home automation.',
        description2: 'Includes personal servant quarters, 3 allocated car parks, and access to a rooftop sky lounge and infinity pool.',
        category: 'residential',
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
        badgeColor: '',
        floor: '15th of 25',
        furniture: 'Semi',
        status: 'Ready',
        sqFtPrice: '₹ 28,275 / Sq. Ft.',
        builtUpArea: '1,900 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale / New Booking',
        reraNumber: 'P51800055221',
        description1: 'Enjoy serene Powai lake views from the Prestige Solitaire. Featuring a large floor layout with high ceilings and grand french doors.',
        description2: 'Surrounded by lush greens, standard 3 BHK premium bedrooms, matching designer toilets, and complete security framework.',
        category: 'residential',
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
        badgeColor: '',
        floor: '28th of 28 (Penthouse)',
        furniture: 'Fully',
        status: 'Ready',
        sqFtPrice: '₹ 44,642 / Sq. Ft.',
        builtUpArea: '3,600 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale',
        reraNumber: 'P51800088990',
        description1: 'Ultra-exclusive 4 BHK Penthouse at Bandra West. Offers unparalleled, unobstructed view of the Arabian Sea and the Bandra-Worli Sea Link.',
        description2: 'Features a massive private deck, personal elevator access, private splash pool, and Italian modular fittings.',
        category: 'residential',
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
        badgeColor: '',
        floor: 'G + 2 Floors',
        furniture: 'Semi',
        status: 'Ready',
        sqFtPrice: '₹ 25,625 / Sq. Ft.',
        builtUpArea: '4,000 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale / New Booking',
        reraNumber: 'P51800033445',
        description1: 'Luxury independent living at Greenwood Villa. Nestled against the Aarey green colony boundaries, this villa provides tranquil privacy combined with modern luxury.',
        description2: 'Features a private lawn garden, double-height living room, 4 car parking bays, and independent security surveillance.',
        category: 'residential',
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
        badgeColor: '',
        floor: '10th of 18',
        furniture: 'Unfurnished',
        status: 'Ready',
        sqFtPrice: '₹ 29,081 / Sq. Ft.',
        builtUpArea: '1,300 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'New Booking',
        reraNumber: 'P51800022312',
        description1: 'Aura Grande by Adani Realty sets new design standards in Andheri West. This modern 2 BHK provides elegant fixtures, layout efficiencies, and cross-ventilation.',
        description2: 'Equipped with multiple sports facilities, central gardens, automated parking systems, and reliable backup generator loops.',
        category: 'residential',
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
        badgeColor: '',
        floor: '34th of 45',
        furniture: 'Semi',
        status: 'Ready',
        sqFtPrice: '₹ 34,375 / Sq. Ft.',
        builtUpArea: '2,100 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale',
        reraNumber: 'P51800044321',
        description1: 'Signature Heights by Indiabulls located in the luxury epicenter of Lower Parel. Soar high on the 34th floor and enjoy gorgeous sea-breeze vectors.',
        description2: 'Proximity to premium corporate hubs (Palladium, Kamala Mills), standard luxury fittings, custom modular kitchen, and double floor parking bays.',
        category: 'residential',
        gallery: [
            { url: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&q=80&w=800', label: 'Lounge' },
            { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600', label: 'Primary Bedroom' },
            { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', label: 'Spa Bath' },
            { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Living Area' },
            { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600', label: 'Exterior' }
        ]
    },
    // Commercial Listings (original list items inside categoryShowcaseData)
    {
        id: 10,
        name: 'Vanguard Corporate Plaza',
        location: 'Bandra Kurla Complex (BKC), Mumbai',
        type: 'Office Space',
        area: '4,500 Sq. Ft.',
        developer: 'Vanguard Group',
        price: '₹ 18.50 Cr',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        badge: 'EXCLUSIVE AGENT',
        badgeColor: '',
        floor: '14th Floor',
        furniture: 'Fully Furnished (Grade A)',
        status: 'Ready',
        sqFtPrice: '₹ 41,111 / Sq. Ft.',
        builtUpArea: '5,500 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Exclusive Booking',
        reraNumber: 'P51800099001',
        description1: 'Grade A premium executive office suite with floor-to-ceiling double-glazed glass windows and smart parking systems. Ideally located in the core of Bandra Kurla Complex (BKC), the financial hub of Mumbai.',
        description2: 'Features include high-speed fiber internet, corporate reception desk, fully equipped conference rooms, executive cabins, and dedicated cafeteria.',
        category: 'commercial',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', label: 'Corporate Exterior' },
            { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', label: 'Executive Boardroom' },
            { url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800', label: 'Lobby' }
        ]
    },
    {
        id: 11,
        name: 'Apex Commercial Hub',
        location: 'Andheri East, Mumbai',
        type: 'HQ Studio',
        area: '1,800 Sq. Ft.',
        developer: 'Apex Realty',
        price: '₹ 4.20 Cr',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        badge: 'GRADE A OFFICE',
        badgeColor: '',
        floor: '5th Floor',
        furniture: 'Semi Furnished',
        status: 'Ready',
        sqFtPrice: '₹ 23,333 / Sq. Ft.',
        builtUpArea: '2,200 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'New Launch',
        reraNumber: 'P51800099002',
        description1: 'Boutique office suites designed for corporate HQs and tech startups, featuring 100% power generator backup. Placed in a high-connectivity sector in Andheri East.',
        description2: 'Includes central air-conditioning, high-speed elevators, 3-tier security monitoring, and secure entry/exit controls.',
        category: 'commercial',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', label: 'Office Layout' },
            { url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800', label: 'Workspaces' }
        ]
    },
    {
        id: 12,
        name: 'Pinnacle Business Park',
        location: 'Lower Parel, Mumbai',
        type: 'Boutique Office',
        area: '2,400 Sq. Ft.',
        developer: 'Pinnacle Corp',
        price: '₹ 7.80 Cr',
        image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
        badge: 'INVESTMENT OPPORTUNITY',
        badgeColor: '',
        floor: '21st Floor',
        furniture: 'Fully Furnished',
        status: 'Ready',
        sqFtPrice: '₹ 32,500 / Sq. Ft.',
        builtUpArea: '2,900 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Resale',
        reraNumber: 'P51800099003',
        description1: 'Centrally located luxury workspace with panoramic city skyline views, executive lounge, and cafeteria access. Offers premium address status in Lower Parel.',
        description2: 'Equipped with premium glass partitions, designer desk areas, modern electrical loops, and smart security sensors.',
        category: 'commercial',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800', label: 'Executive Lounge' },
            { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', label: 'Desks View' }
        ]
    },
    // Land Listings (original list items inside categoryShowcaseData)
    {
        id: 13,
        name: 'Alibaug Coastal View Plots',
        location: 'Mandwa Jetty Area, Alibaug',
        type: 'Villa Plot',
        area: '12,000 Sq. Ft.',
        developer: 'Alibaug Developers',
        price: '₹ 3.40 Cr',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
        badge: 'RERA VERIFIED',
        badgeColor: '',
        floor: 'NA',
        furniture: 'None',
        status: 'Ready',
        sqFtPrice: '₹ 2,833 / Sq. Ft.',
        builtUpArea: '12,000 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Direct Sale',
        reraNumber: 'P51800099004',
        description1: 'Pristine coastal villa plot, cleared titles, fully fenced boundary, featuring 100% RERA title verification. Situated just 10 minutes from Mandwa Jetty Area, Alibaug.',
        description2: 'Perfect for building a bespoke luxury weekend getaway villa with stunning clear sea-sky perspectives.',
        category: 'land',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', label: 'Land Plot View' },
            { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', label: 'Sunset Surroundings' }
        ]
    },
    {
        id: 14,
        name: 'Golden Crest Farms',
        location: 'Karjat Foothills, Mumbai Outer',
        type: 'Farm Land',
        area: '1.5 Acres',
        developer: 'Sahyadri Lands',
        price: '₹ 1.95 Cr',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
        badge: 'HIGH APPRECIATION',
        badgeColor: '',
        floor: 'NA',
        furniture: 'None',
        status: 'Ready',
        sqFtPrice: '₹ 30 / Sq. Ft.',
        builtUpArea: '65,340 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Direct Sale',
        reraNumber: 'P51800099005',
        description1: 'Lush agricultural / non-agricultural land parcel perfect for farmhouses or boutique eco-resort projects, situated in the beautiful Karjat Foothills.',
        description2: 'Fully demarcated plots, rich fertile soil, immediate water connection with borewell setup, and stunning mountain ridges as backdrop.',
        category: 'land',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', label: 'Farm View' },
            { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', label: 'Karjat Peaks' }
        ]
    },
    {
        id: 15,
        name: 'Bhiwandi Logistic Parcel',
        location: 'Mumbai-Nashik Highway, Bhiwandi',
        type: 'Industrial Plot',
        area: '2.2 Acres',
        developer: 'Bhiwandi Logistics Infra',
        price: '₹ 8.50 Cr',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
        badge: 'HIGHWAY ACCESS',
        badgeColor: '',
        floor: 'NA',
        furniture: 'None',
        status: 'Ready',
        sqFtPrice: '₹ 88 / Sq. Ft.',
        builtUpArea: '95,832 Sq. Ft.',
        ownership: 'Freehold',
        transactionType: 'Direct Sale',
        reraNumber: 'P51800099006',
        description1: 'High-connectivity commercial/industrial parcel ideal for warehousing, logistics hub, or corporate yards. Boasts direct access to Mumbai-Nashik Highway, Bhiwandi.',
        description2: 'High density location with wide frontage (200 Ft), clear titles (Industrial Zone NA), and high voltage power grid connection already enabled.',
        category: 'land',
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
        gallery: [
            { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', label: 'Highway View' }
        ]
    }
];

// Initial mock Inquiries (leads)
const INITIAL_INQUIRIES = [
    {
        id: 1,
        name: 'Aarav Mehta',
        email: 'aarav.mehta@gmail.com',
        phone: '+91 98765 43210',
        message: 'I would like to schedule a site visit for Skyline Residency this Saturday. Please call me back.',
        propertyId: 1,
        propertyName: 'Skyline Residency',
        status: 'pending', // pending, contacted
        date: new Date('2026-06-05T10:30:00Z').toISOString()
    }
];

// Initial mock Newsletter subscribers
const INITIAL_NEWSLETTER = [
    {
        id: 1,
        email: 'info@luxuryresidences.in',
        date: new Date('2026-06-04T12:00:00Z').toISOString()
    }
];

// Initial admin credential
const INITIAL_ADMIN = {
    username: 'admin',
    password: 'admin123' // simple plain text default, configurable
};

class DatabaseManager {
    constructor() {
        this.data = {
            properties: [],
            inquiries: [],
            newsletter: [],
            admin: {}
        };
        this.isMongo = !!process.env.MONGODB_URI;
        this.mongoConnected = false;
        
        if (this.isMongo) {
            this.client = new MongoClient(process.env.MONGODB_URI);
            this.mongoPromise = this.connectMongo();
        } else {
            this.init();
        }
    }

    async connectMongo() {
        try {
            console.log('Connecting to MongoDB Atlas...');
            await this.client.connect();
            this.db = this.client.db();
            
            this.propertiesColl = this.db.collection('properties');
            this.inquiriesColl = this.db.collection('inquiries');
            this.newsletterColl = this.db.collection('newsletter');
            this.adminColl = this.db.collection('admin');
            
            // Check if database needs seeding
            const count = await this.propertiesColl.countDocuments();
            if (count === 0) {
                console.log('MongoDB is empty. Seeding database with initial data...');
                await this.propertiesColl.insertMany(INITIAL_PROPERTIES);
                await this.inquiriesColl.insertMany(INITIAL_INQUIRIES);
                await this.newsletterColl.insertMany(INITIAL_NEWSLETTER);
                await this.adminColl.insertOne(INITIAL_ADMIN);
                console.log('Database seeded successfully.');
            } else {
                console.log('MongoDB connected and loaded successfully.');
            }
            this.mongoConnected = true;
        } catch (err) {
            console.error('Failed to connect to MongoDB, falling back to local file:', err);
            this.isMongo = false;
            this.init();
        }
    }

    init() {
        // Create DB directory if not exists
        if (!fs.existsSync(DB_DIR)) {
            fs.mkdirSync(DB_DIR, { recursive: true });
        }

        // Load or initialize DB file
        if (fs.existsSync(DB_FILE)) {
            try {
                const rawData = fs.readFileSync(DB_FILE, 'utf8');
                this.data = JSON.parse(rawData);
                
                // Ensure required schema elements are present
                if (!this.data.properties) this.data.properties = [];
                if (!this.data.inquiries) this.data.inquiries = [];
                if (!this.data.newsletter) this.data.newsletter = [];
                if (!this.data.admin) this.data.admin = INITIAL_ADMIN;

                console.log('Database loaded successfully from file.');
            } catch (err) {
                console.error('Error reading database file, resetting to initial state:', err);
                this.resetToInitial();
            }
        } else {
            console.log('Database file not found. Initializing with seed data...');
            this.resetToInitial();
        }
    }

    resetToInitial() {
        this.data = {
            properties: INITIAL_PROPERTIES,
            inquiries: INITIAL_INQUIRIES,
            newsletter: INITIAL_NEWSLETTER,
            admin: INITIAL_ADMIN
        };
        this.save();
    }

    save() {
        if (this.isMongo) return; // DB handles saving
        try {
            fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (err) {
            console.error('Failed to write to database file:', err);
        }
    }

    // --- Properties Operations ---
    async getProperties(filters = {}) {
        if (this.isMongo) {
            await this.mongoPromise;
            let query = {};
            if (filters.category && filters.category !== 'all') {
                query.category = filters.category;
            }
            if (filters.location && filters.location !== 'all') {
                query.location = { $regex: filters.location, $options: 'i' };
            }
            if (filters.bhk && filters.bhk !== 'all') {
                query.type = { $regex: filters.bhk, $options: 'i' };
            }
            if (filters.developer && filters.developer !== 'all') {
                query.developer = { $regex: filters.developer, $options: 'i' };
            }
            if (filters.search) {
                const term = filters.search.trim();
                query.$or = [
                    { name: { $regex: term, $options: 'i' } },
                    { location: { $regex: term, $options: 'i' } },
                    { developer: { $regex: term, $options: 'i' } },
                    { type: { $regex: term, $options: 'i' } }
                ];
            }
            
            let results = await this.propertiesColl.find(query).toArray();
            
            if (filters.price && filters.price !== 'all') {
                results = results.filter(p => {
                    const croreMatch = p.price.match(/₹\s*([0-9.]+)\s*Cr/i);
                    if (!croreMatch) return true;
                    const val = parseFloat(croreMatch[1]);
                    if (filters.price === 'under-3cr') return val < 3.0;
                    if (filters.price === '3cr-6cr') return val >= 3.0 && val <= 6.0;
                    if (filters.price === 'above-6cr') return val > 6.0;
                    return true;
                });
            }
            return results;
        } else {
            let results = [...this.data.properties];

            if (filters.category && filters.category !== 'all') {
                results = results.filter(p => p.category === filters.category);
            }

            if (filters.location && filters.location !== 'all') {
                results = results.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
            }

            if (filters.bhk && filters.bhk !== 'all') {
                results = results.filter(p => p.type.toLowerCase().includes(filters.bhk.toLowerCase()));
            }

            if (filters.developer && filters.developer !== 'all') {
                results = results.filter(p => p.developer.toLowerCase().includes(filters.developer.toLowerCase()));
            }

            if (filters.price && filters.price !== 'all') {
                results = results.filter(p => {
                    const croreMatch = p.price.match(/₹\s*([0-9.]+)\s*Cr/i);
                    if (!croreMatch) return true;
                    const val = parseFloat(croreMatch[1]);
                    if (filters.price === 'under-3cr') return val < 3.0;
                    if (filters.price === '3cr-6cr') return val >= 3.0 && val <= 6.0;
                    if (filters.price === 'above-6cr') return val > 6.0;
                    return true;
                });
            }

            if (filters.search) {
                const term = filters.search.toLowerCase().trim();
                results = results.filter(p => 
                    p.name.toLowerCase().includes(term) ||
                    p.location.toLowerCase().includes(term) ||
                    p.developer.toLowerCase().includes(term) ||
                    p.type.toLowerCase().includes(term)
                );
            }

            return results;
        }
    }

    async getPropertyById(id) {
        if (this.isMongo) {
            await this.mongoPromise;
            return await this.propertiesColl.findOne({ id: parseInt(id) });
        } else {
            return this.data.properties.find(p => p.id === parseInt(id));
        }
    }

    async createProperty(propertyData) {
        if (this.isMongo) {
            await this.mongoPromise;
            const highestProp = await this.propertiesColl.find().sort({ id: -1 }).limit(1).toArray();
            const nextId = highestProp.length > 0 ? highestProp[0].id + 1 : 1;
            
            const newProperty = {
                id: nextId,
                ...propertyData,
                category: propertyData.category || 'residential',
                gallery: propertyData.gallery || []
            };
            
            await this.propertiesColl.insertOne(newProperty);
            return newProperty;
        } else {
            const nextId = this.data.properties.length > 0 
                ? Math.max(...this.data.properties.map(p => p.id)) + 1 
                : 1;
            
            const newProperty = {
                id: nextId,
                ...propertyData,
                category: propertyData.category || 'residential',
                gallery: propertyData.gallery || []
            };
            
            this.data.properties.push(newProperty);
            this.save();
            return newProperty;
        }
    }

    async updateProperty(id, propertyData) {
        if (this.isMongo) {
            await this.mongoPromise;
            const targetId = parseInt(id);
            const current = await this.propertiesColl.findOne({ id: targetId });
            if (!current) return null;
            
            const updated = {
                ...current,
                ...propertyData,
                id: targetId
            };
            
            delete updated._id;
            
            await this.propertiesColl.replaceOne({ id: targetId }, updated);
            return updated;
        } else {
            const index = this.data.properties.findIndex(p => p.id === parseInt(id));
            if (index === -1) return null;

            this.data.properties[index] = {
                ...this.data.properties[index],
                ...propertyData,
                id: parseInt(id)
            };
            this.save();
            return this.data.properties[index];
        }
    }

    async deleteProperty(id) {
        if (this.isMongo) {
            await this.mongoPromise;
            const res = await this.propertiesColl.deleteOne({ id: parseInt(id) });
            return res.deletedCount > 0;
        } else {
            const index = this.data.properties.findIndex(p => p.id === parseInt(id));
            if (index === -1) return false;

            this.data.properties.splice(index, 1);
            this.save();
            return true;
        }
    }

    // --- Inquiries Operations ---
    async getInquiries() {
        if (this.isMongo) {
            await this.mongoPromise;
            return await this.inquiriesColl.find().sort({ date: -1 }).toArray();
        } else {
            return [...this.data.inquiries].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    async createInquiry(inquiryData) {
        if (this.isMongo) {
            await this.mongoPromise;
            const highestInq = await this.inquiriesColl.find().sort({ id: -1 }).limit(1).toArray();
            const nextId = highestInq.length > 0 ? highestInq[0].id + 1 : 1;
            
            let propertyName = '';
            if (inquiryData.propertyId) {
                const prop = await this.getPropertyById(inquiryData.propertyId);
                if (prop) propertyName = prop.name;
            }
            
            const newInquiry = {
                id: nextId,
                name: inquiryData.name,
                email: inquiryData.email,
                phone: inquiryData.phone || '',
                message: inquiryData.message,
                propertyId: inquiryData.propertyId ? parseInt(inquiryData.propertyId) : null,
                propertyName: propertyName || inquiryData.propertyName || '',
                status: 'pending',
                date: new Date().toISOString()
            };
            
            await this.inquiriesColl.insertOne(newInquiry);
            return newInquiry;
        } else {
            const nextId = this.data.inquiries.length > 0
                ? Math.max(...this.data.inquiries.map(i => i.id)) + 1
                : 1;
            
            let propertyName = '';
            if (inquiryData.propertyId) {
                const prop = this.data.properties.find(p => p.id === parseInt(inquiryData.propertyId));
                if (prop) propertyName = prop.name;
            }

            const newInquiry = {
                id: nextId,
                name: inquiryData.name,
                email: inquiryData.email,
                phone: inquiryData.phone || '',
                message: inquiryData.message,
                propertyId: inquiryData.propertyId ? parseInt(inquiryData.propertyId) : null,
                propertyName: propertyName || inquiryData.propertyName || '',
                status: 'pending',
                date: new Date().toISOString()
            };

            this.data.inquiries.push(newInquiry);
            this.save();
            return newInquiry;
        }
    }

    async updateInquiryStatus(id, status) {
        if (this.isMongo) {
            await this.mongoPromise;
            const targetId = parseInt(id);
            await this.inquiriesColl.updateOne({ id: targetId }, { $set: { status } });
            return await this.inquiriesColl.findOne({ id: targetId });
        } else {
            const index = this.data.inquiries.findIndex(i => i.id === parseInt(id));
            if (index === -1) return null;

            this.data.inquiries[index].status = status;
            this.save();
            return this.data.inquiries[index];
        }
    }

    async deleteInquiry(id) {
        if (this.isMongo) {
            await this.mongoPromise;
            const res = await this.inquiriesColl.deleteOne({ id: parseInt(id) });
            return res.deletedCount > 0;
        } else {
            const index = this.data.inquiries.findIndex(i => i.id === parseInt(id));
            if (index === -1) return false;

            this.data.inquiries.splice(index, 1);
            this.save();
            return true;
        }
    }

    // --- Newsletter Operations ---
    async getNewsletterSubscribers() {
        if (this.isMongo) {
            await this.mongoPromise;
            return await this.newsletterColl.find().sort({ date: -1 }).toArray();
        } else {
            return [...this.data.newsletter].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    async subscribeToNewsletter(email) {
        const normalizedEmail = email.toLowerCase().trim();
        if (this.isMongo) {
            await this.mongoPromise;
            const existing = await this.newsletterColl.findOne({ email: normalizedEmail });
            if (existing) return existing;
            
            const highestSub = await this.newsletterColl.find().sort({ id: -1 }).limit(1).toArray();
            const nextId = highestSub.length > 0 ? highestSub[0].id + 1 : 1;
            
            const newSub = {
                id: nextId,
                email: normalizedEmail,
                date: new Date().toISOString()
            };
            await this.newsletterColl.insertOne(newSub);
            return newSub;
        } else {
            const existing = this.data.newsletter.find(n => n.email.toLowerCase() === normalizedEmail);
            if (existing) return existing;

            const nextId = this.data.newsletter.length > 0
                ? Math.max(...this.data.newsletter.map(n => n.id)) + 1
                : 1;

            const newSub = {
                id: nextId,
                email: normalizedEmail,
                date: new Date().toISOString()
            };

            this.data.newsletter.push(newSub);
            this.save();
            return newSub;
        }
    }

    async deleteNewsletterSubscriber(id) {
        if (this.isMongo) {
            await this.mongoPromise;
            const res = await this.newsletterColl.deleteOne({ id: parseInt(id) });
            return res.deletedCount > 0;
        } else {
            const index = this.data.newsletter.findIndex(n => n.id === parseInt(id));
            if (index === -1) return false;

            this.data.newsletter.splice(index, 1);
            this.save();
            return true;
        }
    }

    // --- Authentication ---
    async verifyAdmin(username, password) {
        if (this.isMongo) {
            await this.mongoPromise;
            const admin = await this.adminColl.findOne({});
            if (!admin) return false;
            return admin.username === username && admin.password === password;
        } else {
            return this.data.admin.username === username && this.data.admin.password === password;
        }
    }

    async updateAdminCredentials(username, password) {
        if (this.isMongo) {
            await this.mongoPromise;
            await this.adminColl.updateOne({}, { $set: { username, password } }, { upsert: true });
            return true;
        } else {
            this.data.admin = { username, password };
            this.save();
            return true;
        }
    }

    // --- Stats Aggregator ---
    async getStats() {
        if (this.isMongo) {
            await this.mongoPromise;
            const totalProperties = await this.propertiesColl.countDocuments();
            const totalInquiries = await this.inquiriesColl.countDocuments();
            const pendingInquiries = await this.inquiriesColl.countDocuments({ status: 'pending' });
            const newsletterSubscribers = await this.newsletterColl.countDocuments();

            return {
                totalProperties,
                totalInquiries,
                pendingInquiries,
                newsletterSubscribers
            };
        } else {
            const totalProperties = this.data.properties.length;
            const totalInquiries = this.data.inquiries.length;
            const pendingInquiries = this.data.inquiries.filter(i => i.status === 'pending').length;
            const newsletterSubscribers = this.data.newsletter.length;

            return {
                totalProperties,
                totalInquiries,
                pendingInquiries,
                newsletterSubscribers
            };
        }
    }
}

module.exports = new DatabaseManager();
