const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'dropbox.json'), 'utf8');

const mapMarkers = JSON.parse(input);

const output = mapMarkers.map(marker =>
  Object.assign(marker, {
    googleMapsUrl: `https://www.google.com/maps/place/${encodeURI(
      marker.address
    )}`
  })
);

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'map_markers.json'),
  JSON.stringify(output)
);
