# Site vitrine FabStep — fabstep.app

Site statique (HTML + CSS + un petit script local pour les animations, aucune dépendance, aucune étape de build).
Sans JavaScript, la page reste complète ; si « Réduire les animations » est activé sur l'appareil, tout est affiché sans mouvement.
Aucun cookie, aucun traceur, aucune ressource externe : pas de bandeau cookies nécessaire.

## Arborescence

```
.
├── index.html               Accueil
├── confidentialite.html     Politique de confidentialité (URL à donner à Apple)
├── assistance.html          Assistance (URL d'assistance à donner à Apple)
├── mentions-legales.html    Mentions légales (LCEN)
├── 404.html                 Page d'erreur (unique, bilingue)
├── en/                      Version anglaise : index.html, privacy.html, support.html, legal.html
├── sitemap.xml · robots.txt
├── CNAME                    Domaine pour GitHub Pages (option A)
├── .htaccess                Configuration Apache pour Hostinger (option B)
├── assets/
│   ├── css/style.css        LA feuille de style unique
│   ├── js/main.js           Animations (compteurs, apparitions, effet 3D) — facultatif
│   ├── js/fabstep-walker.js Marcheur officiel de l'app (composant <fabstep-walker>, ne pas modifier)
│   ├── fonts/               Inter 400/500/600 + Instrument Serif italique (woff2, licences OFL)
│   └── img/                 logo, favicon, icône iOS, image de partage, écrans montre
└── _sources/                Fichiers de travail (NON publiés) : exports Figma en PNG,
                             sources HTML de og.png et apple-touch-icon.png
```

URL à renseigner dans App Store Connect :
- Politique de confidentialité : `https://fabstep.app/confidentialite.html`
- URL d'assistance : `https://fabstep.app/assistance.html`
- URL marketing : `https://fabstep.app/`

Pour la fiche App Store en anglais : `https://fabstep.app/en/privacy.html`, `https://fabstep.app/en/support.html`
et `https://fabstep.app/en/`.

## Deux langues (français / anglais)

Chaque page française a sa jumelle dans `en/`. **Toute modification de texte doit être faite dans les deux fichiers.**

| Français | Anglais |
|---|---|
| `index.html` | `en/index.html` |
| `confidentialite.html` | `en/privacy.html` |
| `assistance.html` | `en/support.html` |
| `mentions-legales.html` | `en/legal.html` |

- Les pages se désignent mutuellement par les balises `<link rel="alternate" hreflang="…">` (pour Google) et par
  le bouton `EN` / `FR` de l'en-tête. Aucune redirection automatique selon la langue du navigateur.
- Les pages anglaises chargent les mêmes fichiers `../assets/` (une seule feuille de style, un seul script).
- Le script lit `<html lang>` pour le format des nombres (`11 490` en français, `11,490` en anglais).
- Les versions anglaises de la politique de confidentialité et des mentions légales sont des traductions de
  courtoisie : la version française fait foi (c'est écrit en haut de ces pages).
- **Reste à faire** : les captures iPhone affichées sur `en/index.html` sont celles de l'app en français.
  Quand des captures en anglais existent, les enregistrer en `assets/img/iphone-N-en.webp` (+ `-390`)
  et changer les `src` / `srcset` / `alt` dans `en/index.html`.

---

## Prévisualiser en local

1. Ouvre le dossier du projet dans **VS Code**.
2. Installe l'extension **Live Server** (éditeur : Ritwick Dey).
3. Clic droit sur `index.html` → **Open with Live Server**. Le site s'ouvre sur `http://127.0.0.1:5500`.

> N'ouvre pas les fichiers en double-cliquant dessus : la page 404 utilise des chemins absolus
> (`/assets/…`) qui ne fonctionnent qu'avec un serveur.

---

## ⚠️ À savoir avant tout : le domaine .app exige HTTPS

Tout le domaine `.app` est inscrit dans la liste « HSTS preload » des navigateurs : Chrome, Safari,
Firefox **refusent d'afficher le site en http://**. Tant que le certificat SSL n'est pas actif,
le site est inaccessible (erreur de connexion). C'est normal pendant l'installation : il faut
simplement attendre que le certificat soit émis (quelques minutes à 24 h).

---

## Quel hébergeur choisir ? (recommandation : option A, GitHub Pages)

| | Coût / an | Mise en place | Limites | Verdict |
|---|---|---|---|---|
| **A. GitHub Pages** | **0 €** | DNS chez Hostinger (A/AAAA + CNAME), HTTPS auto | ~100 Go de trafic/mois (limite souple) | ✅ **Recommandé** : gratuit, fiable, rien ne se coupe |
| Cloudflare Pages | 0 € | Il faut **déplacer les serveurs DNS** du domaine chez Cloudflare | Très larges | Bon, mais plus technique pour débuter |
| Netlify (gratuit) | 0 € | Glisser-déposer, 1 enregistrement DNS | 300 crédits/mois (~15 Go) ; **au-delà, le site est mis en pause** jusqu'au mois suivant | ⚠️ Risqué : ton URL d'assistance Apple pourrait tomber |
| B. Hébergement Hostinger | ~40 à 120 € (prix promo, puis renouvellement plus cher) | Envoi de fichiers dans hPanel | — | Inutile pour un site de 5 pages, sauf si tu l'as déjà |

**Seul coût réel : le renouvellement annuel du domaine `fabstep.app` chez Hostinger** (vérifie le prix de
renouvellement dans hPanel → Domaines). L'e-mail contact@fabstep.app peut rester gratuit (ImprovMX).

Si tu choisis GitHub Pages, garde la **variante A (GitHub)** de l'hébergeur dans `mentions-legales.html`
(c'est celle affichée actuellement). Le fichier `_config.yml` empêche la publication de `README.md` et `.htaccess`.

## Option A — GitHub Pages + domaine chez Hostinger (0 €)

### 1. Mettre le site sur GitHub

1. Crée un compte sur <https://github.com> (gratuit).
2. Bouton **New repository** → nom : `fabstep-site` → **Public** → **Create repository**.
   (GitHub Pages gratuit exige un dépôt public ; le code du site devient donc visible, ce qui ne pose
   aucun problème ici : il ne contient aucun secret.)
3. Sur la page du dépôt vide : **uploading an existing file** → glisse **tout le contenu** du dossier
   (y compris `CNAME` et `_config.yml` ; `_sources`, `README.md` et `.htaccess` ne seront pas publiés
   grâce à `_config.yml`) → **Commit changes**.
   Astuce : sur Mac, les fichiers commençant par un point (`.htaccess`) sont cachés dans le Finder
   (`Cmd + Maj + .` pour les afficher). Il n'est de toute façon pas utile sur GitHub Pages.
4. Dans le dépôt : **Settings → Pages**
   - *Source* : **Deploy from a branch**
   - *Branch* : **main** / **/(root)** → **Save**
   - *Custom domain* : `fabstep.app` → **Save** (le fichier `CNAME` fait déjà ce réglage).

### 2. (Recommandé) Vérifier le domaine auprès de GitHub

Empêche quelqu'un d'autre de « prendre » ton domaine sur GitHub Pages.
Ton profil GitHub → **Settings → Pages → Add a domain** → `fabstep.app`. GitHub affiche un
enregistrement **TXT** (`_github-pages-challenge-TONPSEUDO`) à créer dans hPanel (voir étape 3),
puis clique **Verify**.

### 3. Créer les enregistrements DNS dans hPanel (Hostinger)

hPanel → **Domaines** → `fabstep.app` → **DNS / Serveurs de noms** → **Gérer les enregistrements DNS**.

1. **Supprime** l'enregistrement **A** existant sur `@` (page de parking Hostinger) et le **CNAME**
   `www` existant s'il pointe ailleurs.
2. Ajoute :

| Type  | Nom | Pointe vers                 | TTL   |
|-------|-----|-----------------------------|-------|
| A     | @   | `185.199.108.153`           | 3600  |
| A     | @   | `185.199.109.153`           | 3600  |
| A     | @   | `185.199.110.153`           | 3600  |
| A     | @   | `185.199.111.153`           | 3600  |
| AAAA  | @   | `2606:50c0:8000::153`       | 3600  |
| AAAA  | @   | `2606:50c0:8001::153`       | 3600  |
| AAAA  | @   | `2606:50c0:8002::153`       | 3600  |
| AAAA  | @   | `2606:50c0:8003::153`       | 3600  |
| CNAME | www | `TONPSEUDO.github.io`       | 3600  |

(Remplace `TONPSEUDO` par ton identifiant GitHub. Adresses officielles :
<https://docs.github.com/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>.)

### 4. Activer HTTPS

Retourne dans **Settings → Pages** du dépôt. Quand le message « DNS check successful » apparaît
et que le certificat est prêt (quelques minutes à 24 h), coche **Enforce HTTPS**.
Si la case est grisée : attends, puis réessaie (retirer et remettre le domaine personnalisé
relance l'émission du certificat).

### 5. Mettre à jour le site plus tard

Dans le dépôt : **Add file → Upload files**, glisse les fichiers modifiés → **Commit changes**.
En ligne en 1 à 2 minutes.

---

## Option B — Hébergement web Hostinger existant

1. hPanel → **Sites web** → ton site → **Gestionnaire de fichiers** → ouvre `public_html`.
2. Supprime le fichier `default.php` (ou `index.php`) de bienvenue s'il existe.
3. Envoie (bouton **Envoyer / Upload**) : les 5 fichiers `.html`, `sitemap.xml`, `robots.txt`,
   `.htaccess` et le dossier `assets` complet.
   **N'envoie pas** : `_sources/`, `README.md`, `CNAME` (inutiles ici).
4. SSL : hPanel → **Sécurité → SSL** → installe le certificat **gratuit** pour `fabstep.app`
   (et `www.fabstep.app`). Attends qu'il soit **Actif**.
5. Le fichier `.htaccess` fourni se charge du reste :
   - redirige `http://` et `www.` vers `https://fabstep.app` ;
   - affiche `404.html` pour les pages inexistantes ;
   - bloque l'accès public à `_sources/` si tu l'envoies par erreur ;
   - ajoute les en-têtes de sécurité (dont une politique CSP qui interdit toute ressource externe)
     et le cache navigateur.
6. Dans `mentions-legales.html`, garde la **variante B (Hostinger)** de l'hébergeur et supprime la A.

---

## Adresse e-mail contact@fabstep.app

Un seul fournisseur de réception à la fois : les enregistrements **MX** de l'un remplacent ceux
de l'autre. Et un seul enregistrement **TXT SPF** (`v=spf1 …`) sur `@`.

### Option gratuite — redirection vers Gmail avec ImprovMX

1. Crée un compte sur <https://improvmx.com> avec ton adresse Gmail.
2. Ajoute le domaine `fabstep.app`, puis l'alias `contact` → ton adresse Gmail.
3. Dans hPanel → DNS de `fabstep.app` : supprime les MX Hostinger éventuels, puis ajoute :

| Type | Nom | Valeur                                   | Priorité |
|------|-----|------------------------------------------|----------|
| MX   | @   | `mx1.improvmx.com`                       | 10       |
| MX   | @   | `mx2.improvmx.com`                       | 20       |
| TXT  | @   | `v=spf1 include:spf.improvmx.com ~all`   | —        |

4. Retourne sur ImprovMX et clique **Check again** jusqu'à ce que tout soit vert.
5. Envoie un test à contact@fabstep.app depuis une autre adresse.

Limite : la version gratuite sert à **recevoir**. Pour **répondre en tant que**
contact@fabstep.app, il faut un serveur d'envoi (SMTP), inclus dans les formules payantes
d'ImprovMX — vérifie les conditions actuelles sur leur site. Sinon tu réponds depuis ton Gmail.

### Option payante — e-mail Hostinger

1. hPanel → **E-mails** → choisis/active une offre pour `fabstep.app` (certaines formules
   d'hébergement web incluent déjà des boîtes : regarde avant de payer).
2. Crée la boîte `contact@fabstep.app`. Hostinger ajoute en général les MX et le SPF lui-même ;
   sinon, l'assistant DNS de la page E-mails indique les valeurs exactes à créer.
3. Lis tes messages sur webmail Hostinger, ou ajoute le compte dans Mail sur iPhone / Mac
   (paramètres IMAP/SMTP donnés dans hPanel). Envoi et réception depuis contact@fabstep.app.

---

## Marcheur animé et sécurité (CSP)

Le composant `assets/js/fabstep-walker.js` injecte un petit style interne. La politique de sécurité
du `.htaccess` (option B) l'autorise par son empreinte `sha256-…`. **Si tu remplaces ce fichier par
une nouvelle version**, recalcule l'empreinte (Terminal, dans le dossier du site) :

```sh
node -e "const s=require('fs').readFileSync('assets/js/fabstep-walker.js','utf8');console.log('sha256-'+require('crypto').createHash('sha256').update(s.match(/<style>([\s\S]*?)<\/style>/)[1]).digest('base64'))"
```

et remplace l'ancienne valeur dans `.htaccess`. Sinon le bonhomme s'affiche mal et une erreur apparaît
dans la console. (GitHub Pages n'envoie pas cette politique : rien à faire pour l'option A.)
Tailles des bonshommes : par classes CSS (`.walker--hero`, etc.), jamais par `style="…"`.

## Images

Les écrans Apple Watch viennent des maquettes Figma (export @2x, 832 × 992, convertis en WebP).
Les captures iPhone (1320 × 2868, profil Display P3) sont converties en **sRGB** avant le WebP,
sinon les couleurs sortent délavées sur le web. Originaux convertis : `_sources/iphone/`.
Pour convertir une nouvelle capture en WebP (macOS, `brew install webp`) :

```sh
cwebp -q 85 capture.png -o assets/img/iphone-1.webp
```

---

## Le jour de la sortie sur l'App Store

> **Fait le 4 octobre 2026** : l'app est en ligne (`id6816154235`), les badges et les liens sont actifs sur les pages
> françaises et anglaises. Les étapes ci-dessous restent pour mémoire.

1. Récupère l'adresse de la fiche (App Store Connect → ton app → « Afficher sur l'App Store ») :
   `https://apps.apple.com/fr/app/fabstep/id…`
2. Dans `index.html`, aux deux commentaires `TODO lien App Store`, remplace le `<button … disabled>` par le
   bloc `<a class="store-badge" …>` fourni juste au-dessus en commentaire, avec le vrai identifiant `id…`.
3. Dans l'en-tête de chaque page, remplace le lien « Bientôt sur l'App Store » (`href="…#telecharger"`)
   par l'adresse de la fiche, et son texte par « Télécharger ».
   Faire de même dans `en/index.html`, avec le badge **anglais** d'Apple (« Download on the App Store »),
   à télécharger sur la page des règles marketing ci-dessous et à enregistrer sous
   `assets/img/badges/app-store-download-black.svg` (ce fichier n'est pas encore dans le dépôt).
4. Le badge officiel français est déjà dans `assets/img/badges/` (fourni par Apple — ne pas le modifier, ne pas
   l'animer). Tant que l'app n'est pas disponible, **ni ce badge ni le logo Apple ne doivent apparaître**
   (règles marketing d'Apple : https://developer.apple.com/app-store/marketing/guidelines/).
