# Changelog - NFT Collection #1

## Modifications apportées le 25/10/25 par lazard

**Correction des memory leaks** : J'ai remarqué que les event listeners s'accumulaient à chaque recherche sans jamais être nettoyés. Du coup, j'ai créé un module `eventManager` qui track tous les listeners et les nettoie automatiquement. Au passage, j'ai aussi splitté la grosse fonction `populateCard()` en 3 fonctions plus petites pour que ce soit plus lisible.

**Optimisation de la recherche** : La recherche était super lente parce qu'elle refiltrait tout à chaque lettre tapée. J'ai ajouté un debounce de 300ms (`src/utils/debounce.ts`) et un cache pour les éléments DOM qu'on utilise souvent (`src/utils/domCache.ts` avec les fonctions `getDOMElements()`, `getSearchInput()`, `getCardContainer()`), ça change vraiment la fluidité.

**Amélioration du CSS** : J'ai ajouté des animations au clic sur les cartes (effet pulse, loading avant de naviguer) et des transitions plus smooth sur la page détail. Ça rend le tout beaucoup plus agréable à utiliser.

**Création du dossier contrat**: J'ai commencé a créer le dossier pour les smarts contracts, je penses que je vais partir sur du ERC21, mais je ne sais pas encore comment je vais faire pour le rendre free pour chaque users
