const path = require("path");

const root = path.normalize(`${__dirname}/..`);

module.exports = {
  root,
  context: path.join(root, "src"),
  output: path.join(root, "public"),
  pathToStatic: path.join(root, "public/static/"),
};