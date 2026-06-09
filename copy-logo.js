const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Varun\\.gemini\\antigravity-ide\\brain\\a3ca4f16-6d10-4365-8c7c-079da15c19bb\\media__1781006894627.jpg';
const dest = path.join(__dirname, 'logo.jpg');

try {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('✅ Logo copied successfully to:', dest);
    } else {
        console.error('❌ Source logo file not found in artifacts:', src);
    }
} catch (err) {
    console.error('❌ Error copying logo:', err.message);
}
