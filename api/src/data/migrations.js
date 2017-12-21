const fs = require('fs');
const path = require('path');

const inFile = fs.readFileSync(path.join(__dirname, 'map_markers.json'));

const rawData = JSON.parse(inFile);
