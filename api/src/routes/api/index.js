const fs = require('fs');
const path = require('path');

module.exports = router => {
  router.route('/geojson/states').get((req, res, next) => {
    const statesJson = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'states.json')
    );
    const states = JSON.parse(statesJson);
    res.json(states);
  });

  router.route('/geojson/counties').get((req, res, next) => {
    const countiesJson = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'mergedCounties4.json')
    );
    const counties = JSON.parse(countiesJson);
    res.json(counties);
  });

  router.route('/geojson/drop_markers').get((req, res, next) => {
    const dropMarkersJson = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'map_markers.json')
    );
    const dropMarkers = JSON.parse(dropMarkersJson);
    res.json(dropMarkers);
  });

  router.route('/lat_lng/zipcode').get((req, res, next) => {
    const zipcodeDataJson = fs.readFileSync(
      path.join(__dirname, '..', '..', 'data', 'ziplocs.json'),
      'utf8'
    );

    const zipcodeData = JSON.parse(zipcodeDataJson);
    res.json(zipcodeData);
  });
};
