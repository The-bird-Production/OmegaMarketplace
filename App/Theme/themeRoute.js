const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const VALIDATED_THEME_DIR = path.join(process.cwd(), "validated_themes");

router.get("/", (req, res) => {
  if (!fs.existsSync(VALIDATED_THEME_DIR)) {
    return res.status(200).json({ themes: [] });
  }

  const themes = fs.readdirSync(VALIDATED_THEME_DIR).map((theme) => {
    const themeJsonPath = path.join(VALIDATED_THEME_DIR, theme, "theme.json");
    const themeInfo = fs.existsSync(themeJsonPath)
      ? require(themeJsonPath)
      : { name: plugin };

    return {
      id: themeInfo.id || plugin,
      name: themeInfo.name || plugin,
      version: themeInfo.version || "none",
      description: themeInfo.description || "No description available",
      downloadUrl: `/download/theme/${themeInfo.id || plugin} `,
    };
  });

  res.status(200).json({ themes });
});

module.exports = router;