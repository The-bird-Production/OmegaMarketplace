require("dotenv").config(); // For loading environment variables
const GITHUB_API_URL = process.env.GITHUB_API_URL; // Replace {owner} and {repo}
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Set your GitHub personal access token
const extractZip = require("../lib/extractZip.js");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const TEMP_ZIP_DIR = path.join(process.cwd(), "temp_zip");
const VALIDATED_PLUGIN_DIR = path.join(process.cwd(), "validated_plugins");

async function downloadAndExtractValidatedPlugins() {
  try {
    console.log("Fetching artifacts from GitHub...");
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const artifacts = response.data.artifacts
      .filter((artifact) => artifact.name === "validated-plugins")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date (latest first)

    if (artifacts.length === 0) {
      console.log("No validated plugin artifacts found.");
      return;
    }

    const latestArtifact = artifacts[0];
    console.log(`Downloading latest artifact: ${latestArtifact.name}`);

    const downloadResponse = await axios.get(
      latestArtifact.archive_download_url,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        responseType: "arraybuffer",
      }
    );

    // Save the downloaded ZIP file temporarily
    const zipPath = path.join(TEMP_ZIP_DIR, `${latestArtifact.id}.zip`);
    if (!fs.existsSync(TEMP_ZIP_DIR)) {
      fs.mkdirSync(TEMP_ZIP_DIR, { recursive: true });
    }
    fs.writeFileSync(zipPath, downloadResponse.data);

    console.log("Extracting plugins...");

    await extractZip(zipPath, VALIDATED_PLUGIN_DIR);

    console.log("Plugins extracted successfully.");
  } catch (error) {
    console.error("Error downloading or extracting plugins:", error.message);
  }
}
module.exports = downloadAndExtractValidatedPlugins;
