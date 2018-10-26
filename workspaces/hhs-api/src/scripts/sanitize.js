const fs = require('fs');
const path = require('path');

const zeropad = require('zeropad');

const inFile = fs.readFileSync(
  path.join(__dirname, 'newdata.json')
);

const rawData = JSON.parse(inFile);

delete rawData['00'];

const newData = Object.keys(rawData).reduce((prev, curr) => {
  delete rawData[curr]['000'];
  return Object.assign(prev, {
    [zeropad(curr, 2)]: Object.keys(rawData[curr]).reduce((_prev, _curr) => {
      return Object.assign(_prev, {
        [zeropad(_curr, 3)]: rawData[curr][_curr]
      });
    }, {})
  });
}, {});

const outFile = fs.writeFileSync(
  path.join(__dirname, 'sanitizedCounties.json'),
  JSON.stringify(newData)
);
