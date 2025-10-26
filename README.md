# 🖼️ NFT Collection #1

> Galerie NFT minimaliste — construite avec **Vite + TypeScript**

---

![Vite](https://img.shields.io/badge/Vite-5A29E4?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## Présentation

**NFT Collection #1** est une galerie web moderne et légère permettant d’afficher, filtrer et gérer une première collection NFT.  
Ce projet met en avant une architecture claire, performante et extensible, avec un code entièrement en **TypeScript** et un environnement propulsé par **Vite**.
Peut etre utilisé comme template générale ou layout

Objectif : créer une base de template solide pour de futures collections reliées à la blockchain (smart contracts, IPFS, Web3).

---

## Stack technique

| Technologie                | Rôle                                   |
| -------------------------- | -------------------------------------- |
| **Vite**                   | Bundler et serveur de dev ultra-rapide |
| **TypeScript**             | Langage typé pour un code robuste      |
| **HTML / SCSS / CSS**      | Interface moderne et responsive        |
| **Vanilla JS DOM**         | Manipulation dynamique du DOM          |
| **Architecture modulaire** | Découpage domain / data / ui / lib     |

---

## Prérequis

Avant de cloner le projet, vérifie que tu disposes de :

| Outil       | Version minimale | Vérification    |
| ----------- | ---------------- | --------------- |
| **Node.js** | 18+              | `node -v`       |
| **npm**     | 9+               | `npm -v`        |
| **Git**     | —                | `git --version` |

---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/Alyaesub/NFT-Collection-1.git
cd nft-collection-1
Installer les dépendances
npm install
```

⸻

## Scripts npm

```bash
Script	Commande	Description
Dev	npm run dev	Lance le serveur local avec hot reload
Build	npm run build	Génère le build de production (/dist)
Preview	npm run preview	Simule la version hébergée du build
Typecheck	npm run typecheck	Vérifie les types TypeScript sans compiler
```

⸻

## Fonctionnalités

### Front

-   Affichage dynamique de toutes les cartes NFT
-   Barre de recherche en temps réel (filtrage par titre, description ou créateur)
-   Compteur automatique du nombre de NFTs visibles
-   Loader & message d’état vide 🫥
-   Animation d’apparition fluide des cartes (fade-in)
-   Page de détails avec toutes les infos du NFT
-   Responsive design (mobile / desktop)
-   Structure modulaire et claire (`data`, `ui`, `domain`, `lib`)

### Sécurité

-   Aucune injection via `innerHTML`
-   Toutes les données injectées via `textContent` et `createElement`
-   Validation stricte des URLs d’images
-   Code entièrement _safe-by-default_ (protection XSS)

## Structure du projet

nft-collection-1/
│
├── public/ → fichiers statiques (images, JSON, etc.)
│ └── images/
│
├── src/ → code source TypeScript
│ ├── main.ts → point d’entrée de l’app
│ ├── app.ts → logique principale (init, filtrage…)
│ ├── ui/ → fonctions liées au DOM
│ ├── data/ → données, listes, API simulées
│ ├── domain/types/ → définitions de types TypeScript
│ └── lib/ → helpers & fonctions pures
│
├── index.html → page principale (entrée du projet)
├── tsconfig.json → configuration TypeScript
├── vite.config.ts → configuration Vite (alias, build)
└── package.json → scripts & dépendances

⸻

## Développement

Démarrer le serveur local

npm run dev

## Accède à l'app sur :

👉 http://localhost:5173

Chaque modification est rechargée automatiquement grâce au Hot Reload de Vite ⚡

⸻

## Build de production

Créer le build optimisé

npm run build

Résultat : un dossier /dist contenant :
• index.html final
• fichiers JS/CSS minifiés
• assets optimisés

Tester le build localement

npm run preview

⸻

## Déploiement

Sur GitHub Pages
npm i -D gh-pages
npm run build
npx gh-pages -d dist

⸻

## Sur Netlify / Vercel

    Build command : vite build
    Output directory : dist

⸻

## .gitignore recommandé

node_modules/
dist/
.vite/
.DS_Store
built/

⸻

## Workflow résumé

npm init -y
npm i -D vite typescript
npm run dev # dev local
npm run build # build final
npm run preview # test prod

# déploie le dossier /dist

⸻

## Auteur

Pascal Reynier
Développeur Web & Web3

⸻

## Licence

Projet distribué sous licence MIT.
Libre à toi de le modifier, l’adapter ou le partager.
