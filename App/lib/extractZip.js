const fs = require("fs");
const unzipper = require("unzipper");

const extractZip = async function (zipPath, outputDir) {
  return fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .promise();
}
module.exports = extractZip ;