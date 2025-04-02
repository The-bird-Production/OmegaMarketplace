const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const VALIDATED_PLUGIN_DIR = path.join(process.cwd(), "validated_plugins");

router.get("/", (req, res) => {
  if (!fs.existsSync(VALIDATED_PLUGIN_DIR)) {
    return res.status(200).json({ plugins: [] });
  }

  const plugins = fs.readdirSync(VALIDATED_PLUGIN_DIR).map((plugin) => {
    const pluginJsonPath = path.join(
      VALIDATED_PLUGIN_DIR,
      plugin,
      "plugin.json"
    );
    const pluginInfo = fs.existsSync(pluginJsonPath)
      ? require(pluginJsonPath)
      : { name: plugin };

    return {
      id: pluginInfo.id || plugin,
      name: pluginInfo.name || plugin,
      version: pluginInfo.version || "none",
      description: pluginInfo.description || "No description available",
      downloadUrl: `/download/${pluginInfo.id || plugin}`,
    };
  });

  res.status(200).json({ plugins });
});


module.exports = router;