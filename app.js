// Code for Marketplace with Express.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");

const VALIDATED_THEME_DIR = path.join(__dirname, "validated_themes");
const VALIDATED_PLUGIN_DIR = path.join(__dirname, "validated_plugins");
const downloadAndExtractValidatedPlugins = require("./App/Plugins/downloadAndExtract");
const downloadAndExtractValidatedThemes = require("./App/Theme/downloadAndExtract");
//Routes
const pluginsRoute = require("./App/Plugins/pluginsRoute");
const themeRoute = require("./App/Theme/themeRoute");
const downloadRoute = require("./App/Download/DownloadRoute");

require("dotenv").config(); // For loading environment variables

const app = express();
const PORT = 3002;

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite à 100 requêtes par fenêtre de temps
    message: {
      success: false,
      error: "Trop de requêtes. Veuillez réessayer plus tard.",
    },
    headers: true, // Inclure les headers RateLimit
    keyGenerator: (req) => req.ip, // Utilisation de l'IP comme clé
    skip: (req) => req.user && req.user.role === "admin", // Exclure les admins
    handler: (req, res, next) => {
      console.warn(`Rate limit dépassé pour ${req.ip}`);
      res.status(429).json({
        success: false,
        error: "Trop de requêtes. Réessayez plus tard.",
      });
    },
  });

app.use(rateLimiter); 
app.use("/plugins", pluginsRoute);
app.use("/themes", themeRoute);
app.use("/download", downloadRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Marketplace server running on port ${PORT}`);
  if (!fs.existsSync(VALIDATED_PLUGIN_DIR)) {
    fs.mkdirSync(VALIDATED_PLUGIN_DIR, { recursive: true });
  }
  if (!fs.existsSync(VALIDATED_THEME_DIR)) {
    fs.mkdirSync(VALIDATED_THEME_DIR, { recursive: true });
  }

  downloadAndExtractValidatedPlugins(); // Initial download of plugins
  downloadAndExtractValidatedThemes(); // Initial download of plugins
  setInterval(downloadAndExtractValidatedPlugins, 600000); // Refresh every ten minutes
  setInterval(downloadAndExtractValidatedThemes, 600000); // Refresh every ten minutes
});
