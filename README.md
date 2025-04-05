# 🛍️ Project Omega - Plugin Marketplace

Bienvenue sur la **Marketplace des Plugins** pour **Project Omega CMS** ! Ici, vous pouvez ajouter de nouveaux plugins pour étendre les fonctionnalités du CMS.

## 🚀 Créer un Plugin

Un plugin est un module autonome qui peut être installé et utilisé dans **Project Omega CMS** sans redémarrer le serveur.

### 📦 Structure d’un Plugin
Chaque plugin doit suivre cette structure minimale :
```
    example-plugin
   ├─ Controller
   │  └─ Controller.js
   ├─ Routes
   │  └─ MainRoutes.js
   ├─ admin
   │  └─ dashboard.js
   ├─ plugin.json
   └─ public
      └─ publicComponent.js

```

### 🔧 Configuration d'un plugin (`plugin.json`)
```json
{
  "id": "randomuid",
  "name": "Exemple plugin",
  "version": "1.0.0",
  "description": "Un plugin d'exemple",
  "folder": "example-plugin",
  "url": "/example-plugin"
}
```
## 🚀 Créer un Theme

Un theme est un module autonome qui peut être installé et utilisé dans **Project Omega CMS** sans redémarrer le serveur.

### 📦 Structure d’un theme
Chaque plugin doit suivre cette structure minimale :
```
    example-theme
   ├─ asset
   │  └─ Vos assets
   ├─ Components
   │  └─ Vos components
   ├─ style
   │  └─ style.css
   └─ theme.json
  

```
### 🔧 Configuration d'un theme (`theme.json`)
```json
{
  "id": "randomuid",
  "name": "Example Theme",
  "description": "A simple example theme for OMEGA CMS.",
  "version": "1.0.0",
  "author": "Your Name",
  "config": {
    //You can add all of your config and your components
    "fonts": {
      "body": "Roboto, sans-serif",
      "heading": "Montserrat, sans-serif"
    },
    "layout": {
      "header": "default",
      "footer": "default",
      "buttonStyle": "rounded"
    },
    "components": {
      "header": "./components/Header.js",
      "footer": "./components/Footer.js",
      "button": "./components/Button.js"
    }
  }
}
```

## 📥 Soumettre un Plugin ou un Theme
Si vous souhaitez partager votre plugin ou votre theme avec la communauté, voici la procédure :

### 🛠 Étapes pour proposer un plugin :
1. **Forker ce repository**.
2. **Créer un dossier** dans `plugins/` ou`theme/`  avec le nom de votre plugin ou votre theme.
3. **Ajouter votre plugin ou theme** en respectant la structure décrite plus haut.
4. **Créer une Pull Request** en expliquant votre plugin ou votre theme et ses fonctionnalités.

## 💡 Bonnes Pratiques
- Documentez bien votre plugin ou votre theme avec un `README.md`.
- Testez votre plugin ou votre theme avant de le soumettre.
- Respectez la structure standard des plugins ou des themes.

## 📄 Licence
Votre plugin ou vote theme doit être sous une licence libre compatible avec Project Omega CMS (MIT, GPL, etc.).

---
Rejoignez la communauté et enrichissez Project Omega CMS avec de nouveaux plugins ou thèmes ! 🚀

