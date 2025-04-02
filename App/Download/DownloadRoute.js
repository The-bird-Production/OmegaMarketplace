const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const VALIDATED_PLUGIN_DIR = path.join(process.cwd(), "validated_plugins");
const TEMP_ZIP_DIR = path.join(process.cwd(), "temp_zip");
//Directory to store valited themes
const VALIDATED_THEME_DIR = path.join(process.cwd(), "validated_themes");



router.get("/theme/:themeId", (req, res) => {
  const { themeId } = req.params;
  // Locate theme name with the given themeId
  const themeName = fs.readdirSync(VALIDATED_THEME_DIR).find((theme) => {
    const themeJsonPath = path.join(VALIDATED_THEME_DIR, theme, "theme.json");
    const themeInfo = fs.existsSync(themeJsonPath)
      ? require(themeJsonPath)
      : { name: theme };
    return themeInfo.id === themeId;
  });

  const themePath = path.join(VALIDATED_THEME_DIR, themeName);

  if (!fs.existsSync(themePath)) {
    return res.status(404).json({ message: "Theme not found" });
  }

  const zipPath = path.join(TEMP_ZIP_DIR, `${themeName}.zip`);

  // Zip the plugin folder
  const archiver = require("archiver");
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(themePath, false);
  archive.finalize();

  output.on("close", () => {
    res.download(zipPath, `${themeName}.zip`, (err) => {
      if (!err) {
        fs.unlinkSync(zipPath); // Clean up the temporary ZIP after download
      }
    });
  });
});

// Route to download a validated plugin as a ZIP
router.get("/:pluginId", (req, res) => {
  const { pluginId } = req.params;
  // Locate plugin name with the given pluginId
  const pluginName = fs.readdirSync(VALIDATED_PLUGIN_DIR).find((plugin) => {
    const pluginJsonPath = path.join(
      VALIDATED_PLUGIN_DIR,
      plugin,
      "plugin.json"
    );
    const pluginInfo = fs.existsSync(pluginJsonPath)
      ? require(pluginJsonPath)
      : { name: plugin };
    return pluginInfo.id === pluginId;
  });

  const pluginPath = path.join(VALIDATED_PLUGIN_DIR, pluginName);

  if (!fs.existsSync(pluginPath)) {
    return res.status(404).json({ message: "Plugin not found" });
  }

  const zipPath = path.join(TEMP_ZIP_DIR, `${pluginName}.zip`);

  // Zip the plugin folder
  const archiver = require("archiver");
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(pluginPath, false);
  archive.finalize();

  output.on("close", () => {
    res.download(zipPath, `${pluginName}.zip`, (err) => {
      if (!err) {
        fs.unlinkSync(zipPath); // Clean up the temporary ZIP after download
      }
    });
  });
});

module.exports = router;