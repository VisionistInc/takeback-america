const path = require("path");

const dir = require("node-dir");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const jsonParser = bodyParser.json();

// Initialize common middleware
app.use(cors(), jsonParser);

/* Dynamically add all API Routes */
const apiRouter = express.Router();
const apiPath = path.join(__dirname, "..", "routes");

dir.files(apiPath, (err, files) => {
  if (err) throw err;
  files.forEach(filePath => require(filePath)(apiRouter));
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "..", "..", "public")));
}

app.use("/api", apiRouter);
/* End API Routes */

module.exports = app;
