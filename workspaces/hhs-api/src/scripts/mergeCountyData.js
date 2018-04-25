const fs = require('fs');
const path = require('path');

const rawCounties = fs.readFileSync(
  path.join(__dirname, '..', 'data', 'counties.json')
);
const rawExtraData = fs.readFileSync(
  path.join(__dirname, 'sanitizedCounties.json')
);

const extraData = JSON.parse(rawExtraData);
const counties = JSON.parse(rawCounties);

const filteredCounties = counties.features.filter(
  feature => feature.properties.STATE !== '72'
);
const newData = Object.assign(filteredCounties, {
  features: filteredCounties.map(feature => {
    return Object.assign(feature, {
      properties: Object.assign(
        feature.properties,
        extraData[feature.properties.STATE][feature.properties.COUNTY]
      )
    });
  })
});

const outFile = fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'mergedCounties5.json'),
  JSON.stringify(Object.assign(counties, { features: newData }))
);
