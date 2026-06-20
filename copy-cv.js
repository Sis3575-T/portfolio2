const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'public', 'cv.pdf');
const dst = path.join(__dirname, 'frontend', 'public', 'cv.pdf');
fs.copyFileSync(src, dst);
console.log('Copied cv.pdf from root public/ to frontend/public/');
