const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'about.html',
    'contact.html',
    'explore.html',
    'property-details.html',
    'admin.html'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Titles
    content = content.replace(/Elite Estates/g, 'Elev8 Properties');
    content = content.replace(/ELITE ESTATES/g, 'ELEV8 PROPERTIES');
    content = content.replace(/Elite<span>Estates<\/span>/g, 'Elev8<span>Properties<\/span>');

    // 2. Header logo replacement
    content = content.replace(
        /<a href="index\.html" class="logo-text">Elev8 Properties<\/a>/g,
        `<a href="index.html" style="display: flex; align-items: center;"><img src="logo.jpg" alt="Elev8 Properties" style="height: 42px; border-radius: 6px; object-fit: contain; box-shadow: var(--shadow-sm);"></a>`
    );

    // 3. Footer logo brand replacement
    content = content.replace(
        /<h2 class="footer-logo">ELEV8 PROPERTIES<\/h2>/g,
        `<img src="logo.jpg" alt="Elev8 Properties" style="height: 48px; border-radius: 6px; object-fit: contain; margin-bottom: 1.25rem;">`
    );

    // 4. Contact email
    content = content.replace(/contact@eliteestates\.com/g, 'contact@elev8properties.com');

    // 5. Admin layout adjustments
    if (file === 'admin.html') {
        // Login panel logo
        content = content.replace(
            /<div class="login-logo">Elev8<span>Properties<\/span><\/div>/g,
            `<div class="login-logo" style="display: flex; justify-content: center; margin-bottom: 0.5rem;"><img src="logo.jpg" alt="Elev8 Properties" style="height: 52px; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);"></div>`
        );
        // Sidebar header
        content = content.replace(
            /<div class="sidebar-header">[\s\S]*?<\/div>\s*<\/div>/g,
            `<div class="sidebar-header" style="padding: 1.5rem; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--color-admin-border);"><img src="logo.jpg" alt="Elev8 Properties" style="height: 38px; border-radius: 4px;"></div>`
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated brand and logo in: ${file}`);
});
