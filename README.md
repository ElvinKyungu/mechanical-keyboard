# 🎹 Clavier 3D Interactif - Nuxt 4

Une reproduction moderne et améliorée du clavier 3D interactif avec des animations de vagues colorées, construite avec **Nuxt 4**, **GSAP**, et **Tailwind CSS**.

![Keyboard Demo](https://via.placeholder.com/800x400/0a0a0a/ffffff?text=3D+Interactive+Keyboard+Demo)

## ✨ Fonctionnalités

- 🎮 **Interactions clavier en temps réel** - Chaque touche répond instantanément
- 🌊 **Animations de vagues colorées** - Propagation depuis les touches macro
- 🎯 **Perspective 3D dynamique** - Contrôlée par les touches fléchées
- 🎨 **7 couleurs d'animation** - Orange, Rouge, Jaune, Vert, Bleu, Violet
- ⚡ **Performance optimisée** - Animations fluides avec GSAP
- 📱 **Interface responsive** - Adaptée à tous les écrans
- 🔧 **Code TypeScript** - Type-safe et maintenable

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+ 
- npm ou pnpm

### Étapes d'installation

1. **Cloner ou créer le projet**
```bash
# Créer un nouveau projet Nuxt 4
npx nuxi@latest init nuxt-3d-keyboard
cd nuxt-3d-keyboard
```

2. **Installer les dépendances**
```bash
# Avec npm
npm install @nuxtjs/tailwindcss @nuxtjs/google-fonts gsap

# Ou avec pnpm
pnpm add @nuxtjs/tailwindcss @nuxtjs/google-fonts gsap
```

3. **Copier les fichiers**
Copiez tous les composants et fichiers de configuration fournis dans leur structure respective.

4. **Lancer le développement**
```bash
npm run dev
```

5. **Accéder à l'application**
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
nuxt-3d-keyboard/
├── components/
│   ├── Keyboard3D.vue          # Composant principal du clavier
│   ├── KeyButton.vue           # Composant de touche individuelle
│   ├── ParticleEffect.vue      # Système de particules
│   └── LoadingScreen.vue       # Écran de chargement
├── pages/
│   └── index.vue               # Page principale
├── layouts/
│   └── default.vue             # Layout par défaut
├── composables/
│   └── useKeyboard.ts          # Logique de gestion du clavier
├── utils/
│   └── keyboardUtils.ts        # Utilitaires pour le clavier
├── types/
│   └── keyboard.ts             # Types TypeScript
├── plugins/
│   └── gsap.client.ts          # Configuration GSAP
├── middleware/
│   └── keyboard.global.ts      # Middleware global
├── assets/
│   └── css/
│       └── main.css            # Styles globaux
├── nuxt.config.ts              # Configuration Nuxt
├── tailwind.config.js          # Configuration Tailwind
└── package.json                # Dépendances
```

## 🎯 Guide d'Utilisation

### Contrôles de Base
- **Toutes les touches** → Animation de pression 3D
- **Touches fléchées** → Rotation du clavier en 3D
- **CapsLock** → Active/désactive les macros
- **Échap** → Vague orange
- **Enter** → Vague verte  
- **Shift** → Vague jaune
- **Ctrl** → Vague rouge
- **Alt** → Vague bleue
- **Win/Cmd** → Vague violette

### Interactions Spéciales
- **Clic sur les touches colorées** → Déclenche immédiatement les vagues
- **Maintenir CapsLock** → Permet les animations Space et Shift
- **Combinaisons de touches** → Effets superposés

## 🛠️ Personnalisation

### Modifier les Couleurs
```typescript
// Dans keyboardUtils.ts
export const colorMap = {
  orange: '#f97316',
  red: '#ef4444', 
  // Ajoutez vos couleurs...
}
```

### Ajuster les Animations
```typescript
// Dans Keyboard3D.vue
const dilation = 100 // Épaisseur de la vague
const waveSpeed = 1  // Vitesse de propagation
```

### Personnaliser les Touches
```vue
<!-- Ajouter une nouvelle touche macro -->
<KeyButton 
  code="F1" 
  color="cyan" 
  macro="cyan:F1"
  @animate="handleMacroAnimation"
>
  F1
</KeyButton>
```

## ⚡ Performance

### Optimisations Incluses
- **Animations GPU** - Transform3D et CSS transforms
- **Debouncing** - Limitation des événements répétitifs  
- **RequestAnimationFrame** - Synchronisation 60fps
- **Nettoyage mémoire** - Suppression des listeners
- **Lazy loading** - Composants chargés à la demande

### Métriques Cibles
- **FPS** : 60fps stable
- **Input Latency** : < 16ms
- **Bundle Size** : < 500KB (gzipped)
- **First Paint** : < 1.5s

## 🎨 Thèmes et Styles

### Variables CSS Personnalisables
```css
:root {
  --key-height: 50px;
  --key-gap: 15px;
  --wave-duration: 100ms;
  --rotation-speed: 0.1s;
}
```

### Classes Tailwind Étendues
```javascript
// tailwind.config.js
theme: {
  extend: {
    animation: {
      'wave': 'wave 0.5s ease-out',
      'key-press': 'keyPress 0.1s ease-in-out'
    }
  }
}
```

## 🐛 Dépannage

### Problèmes Courants

**Les animations ne se lancent pas**
- Vérifiez que GSAP est bien installé
- Assurez-vous que le composant est dans `<ClientOnly>`

**Touches qui ne répondent pas**
- Vérifiez la configuration des `data-code`
- Confirmez que les event listeners sont actifs

**Performance dégradée**
- Réduisez le nombre de particules
- Augmentez la valeur de `dilation` pour des vagues moins denses

**Erreurs TypeScript**
- Vérifiez l'importation des types dans `keyboard.ts`
- Mettez à jour les versions des dépendances

## 🚀 Déploiement

### Build Production
```bash
npm run build
npm run preview
```

### Déploiement Vercel
```bash
npx vercel --prod
```

### Déploiement Netlify
```bash
npm run generate
# Upload dist/ folder
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🎉 Remerciements

- Inspiration du design original Dribbble
- Nuxt.js team pour Nuxt 4
- GSAP pour les animations fluides  
- Tailwind CSS pour le styling moderne

---

**Créé avec ❤️ par [Votre Nom]**

Pour toute question ou support, ouvrez une issue sur GitHub!