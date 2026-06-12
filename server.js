const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and parsers
app.use(cors());

// Keep-alive self-ping to prevent Render spin-down (every 14 minutes)
const RENDER_URL = 'https://realestate-1-p4gy.onrender.com';
setInterval(() => {
    https.get(`${RENDER_URL}/api/properties?category=residential`, (res) => {
        console.log(`Self-ping status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('Self-ping error:', err.message);
    });
}, 14 * 60 * 1000); // 14 minutes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory sessions store for Admin login (avoids third-party JWT package dependencies)
const ACTIVE_SESSIONS = new Map();
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// Middleware: Authenticate Admin via Session Token
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const session = ACTIVE_SESSIONS.get(token);

    if (!session) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }

    // Check if session has expired
    if (Date.now() - session.createdAt > SESSION_EXPIRY_MS) {
        ACTIVE_SESSIONS.delete(token);
        return res.status(401).json({ error: 'Session expired' });
    }

    // Session is valid, attach admin details
    req.admin = session.username;
    next();
}

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// POST: Admin Login
// POST: Admin Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const isValid = await db.verifyAdmin(username, password);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate secure session token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Save session
    ACTIVE_SESSIONS.set(token, {
        username,
        createdAt: Date.now()
    });

    res.json({ 
        success: true, 
        message: 'Login successful', 
        token 
    });
});

// POST: Admin Logout
app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '').trim();
        ACTIVE_SESSIONS.delete(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
});

// GET: Validate Session Token
app.get('/api/auth/validate', authenticateAdmin, (req, res) => {
    res.json({ valid: true, admin: req.admin });
});


// ==========================================
// PROPERTIES ENDPOINTS
// ==========================================

// GET: Retrieve properties with filtering
app.get('/api/properties', async (req, res) => {
    const filters = {
        category: req.query.category || 'all',
        location: req.query.location || 'all',
        bhk: req.query.bhk || 'all',
        price: req.query.price || 'all',
        developer: req.query.developer || 'all',
        search: req.query.search || ''
    };

    try {
        const properties = await db.getProperties(filters);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve properties' });
    }
});

// GET: Retrieve single property details
app.get('/api/properties/:id', async (req, res) => {
    const property = await db.getPropertyById(req.params.id);
    if (!property) {
        return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
});

// POST: Create a new property (Admin Only)
app.post('/api/properties', authenticateAdmin, async (req, res) => {
    const requiredFields = ['name', 'location', 'type', 'area', 'developer', 'price', 'image', 'description1'];
    
    // Validation
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    try {
        const newProperty = await db.createProperty(req.body);
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create property' });
    }
});

// PUT: Update a property (Admin Only)
app.put('/api/properties/:id', authenticateAdmin, async (req, res) => {
    try {
        const updatedProperty = await db.updateProperty(req.params.id, req.body);
        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(updatedProperty);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update property' });
    }
});

// DELETE: Delete a property (Admin Only)
app.delete('/api/properties/:id', authenticateAdmin, async (req, res) => {
    try {
        const deleted = await db.deleteProperty(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json({ success: true, message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete property' });
    }
});


// ==========================================
// INQUIRIES ENDPOINTS
// ==========================================

// GET: Retrieve all inquiries (Admin Only)
app.get('/api/inquiries', authenticateAdmin, async (req, res) => {
    try {
        res.json(await db.getInquiries());
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve inquiries' });
    }
});

// POST: Submit a new inquiry (Public)
app.post('/api/inquiries', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        const inquiry = await db.createInquiry(req.body);
        res.status(201).json({ success: true, message: 'Inquiry received successfully', data: inquiry });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit inquiry' });
    }
});

// PUT: Update inquiry status (Admin Only - e.g., Mark as contacted)
app.put('/api/inquiries/:id/status', authenticateAdmin, async (req, res) => {
    const { status } = req.body;
    if (!status || !['pending', 'contacted'].includes(status)) {
        return res.status(400).json({ error: 'Invalid or missing status field' });
    }

    try {
        const updated = await db.updateInquiryStatus(req.params.id, status);
        if (!updated) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update inquiry status' });
    }
});

// DELETE: Delete an inquiry (Admin Only)
app.delete('/api/inquiries/:id', authenticateAdmin, async (req, res) => {
    try {
        const deleted = await db.deleteInquiry(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Inquiry not found' });
        }
        res.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
});


// ==========================================
// NEWSLETTER ENDPOINTS
// ==========================================

// GET: Retrieve all newsletter subscribers (Admin Only)
app.get('/api/newsletter', authenticateAdmin, async (req, res) => {
    try {
        res.json(await db.getNewsletterSubscribers());
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve newsletter list' });
    }
});

// POST: Subscribe to newsletter (Public)
app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const sub = await db.subscribeToNewsletter(email);
        res.status(201).json({ success: true, message: 'Subscribed successfully', data: sub });
    } catch (err) {
        res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
});

// DELETE: Delete a newsletter subscriber (Admin Only)
app.delete('/api/newsletter/:id', authenticateAdmin, async (req, res) => {
    try {
        const deleted = await db.deleteNewsletterSubscriber(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }
        res.json({ success: true, message: 'Subscriber unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete subscriber' });
    }
});


// ==========================================
// SYSTEM STATS ENDPOINTS
// ==========================================

// GET: Dashboard Stats Summary (Admin Only)
app.get('/api/stats', authenticateAdmin, async (req, res) => {
    try {
        res.json(await db.getStats());
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve system statistics' });
    }
});


// ==========================================
// STATIC FRONTEND SERVING
// ==========================================

// Serve static frontend assets
app.use(express.static(path.join(__dirname)));

// Route catch-all (optional fallback for SPA routing if needed, but since it's multi-page static html, it's served fine by express.static)
app.get('*', (req, res, next) => {
    // If API route, bypass static fall-through
    if (req.url.startsWith('/api/')) return next();
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` Elite Estates Server Running at http://localhost:${PORT}`);
    console.log(` Admin Credentials: admin / admin123`);
    console.log(`===================================================`);
});
