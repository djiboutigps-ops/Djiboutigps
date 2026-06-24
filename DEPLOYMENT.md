# 🚀 Guide de Déploiement Automatisé - DTS GPS

## 📋 Configuration Actuelle

Le projet **Djibouti Telematics Solutions** est configuré pour un déploiement automatique sur **Vercel** avec intégration GitHub.

---

## ⚙️ Configuration Automatique

### 1. Vercel (Déploiement Automatique)

Le fichier `vercel.json` est configuré pour :
- ✅ Déploiement automatique à chaque push sur `main`/`master`
- ✅ Build automatique avec Vite
- ✅ Headers de sécurité (CSP, XSS Protection, etc.)
- ✅ Cache optimisé pour les assets
- ✅ Région CDG1 (Paris) pour performance optimale

### 2. GitHub Actions (CI/CD)

Deux workflows sont configurés :

#### `.github/workflows/deploy.yml` - Déploiement Production
- ✅ Validation du code (type-check, build test)
- ✅ Déploiement automatique sur Vercel
- ✅ Notifications de succès
- 🔥 **Déclencheur** : Push sur `main` ou `master`

#### `.github/workflows/ci.yml` - Intégration Continue
- ✅ Tests sur les Pull Requests
- ✅ Vérification de build
- 🔥 **Déclencheur** : Pull Requests

---

## 🔐 Secrets GitHub à Configurer

Pour activer le déploiement automatique via GitHub Actions, configurez ces secrets dans votre repository GitHub :

### Étape 1 : Aller dans Settings > Secrets and variables > Actions

### Étape 2 : Ajouter ces secrets

1. **VERCEL_TOKEN**
   - Obtenir sur : https://vercel.com/account/tokens
   - Créer un token avec les permissions de déploiement

2. **VERCEL_ORG_ID**
   - Commande pour obtenir : `npx vercel link`
   - Ou sur Vercel Dashboard > Settings > General

3. **VERCEL_PROJECT_ID**
   - Commande pour obtenir : `npx vercel link`
   - Ou sur Vercel Dashboard > Settings > General

---

## 🚀 Workflow de Déploiement

### Méthode 1 : Push Direct (Recommandé)

```bash
# 1. Ajouter vos modifications
git add .

# 2. Commit avec message descriptif
git commit -m "feat: Ajout de la plateforme Traccar dans DTSGPS"

# 3. Pousser sur GitHub
git push origin main

# 4. ✅ Déploiement automatique déclenché !
```

**Résultat** : 
- GitHub Actions lance la validation
- Vercel déploie automatiquement
- Site mis à jour sur https://djiboutigps.com en 2-3 minutes

### Méthode 2 : Via Pull Request

```bash
# 1. Créer une branche
git checkout -b feature/traccar-integration

# 2. Commit vos modifications
git add .
git commit -m "feat: Integration Traccar"

# 3. Pousser la branche
git push origin feature/traccar-integration

# 4. Créer une Pull Request sur GitHub

# 5. ✅ Tests automatiques lancés

# 6. Après merge : Déploiement automatique !
```

---

## 📊 Monitoring du Déploiement

### Sur GitHub
1. Aller dans l'onglet **Actions** de votre repository
2. Voir le statut en temps réel du workflow
3. Vérifier les logs en cas d'erreur

### Sur Vercel
1. Dashboard : https://vercel.com/dashboard
2. Voir les déploiements en cours
3. Logs détaillés disponibles

---

## 🔧 Commandes Utiles

### Déploiement Manuel via Vercel CLI (si nécessaire)

```bash
# Installation Vercel CLI
npm install -g vercel

# Premier déploiement (configuration)
vercel

# Déploiement production
vercel --prod
```

### Tests Locaux Avant Push

```bash
# Build local
npm run build

# Preview du build
npm run preview

# Vérification TypeScript
npm run type-check
```

---

## 🎯 Avantages du Déploiement Automatique

✅ **Gain de temps** : Push = Déploiement automatique  
✅ **Sécurité** : Validation avant déploiement  
✅ **Traçabilité** : Historique complet sur GitHub Actions  
✅ **Rollback facile** : Retour en arrière instantané sur Vercel  
✅ **Preview automatique** : Chaque PR a sa propre URL de preview  

---

## 🆘 Dépannage

### Le déploiement échoue

1. Vérifier les secrets GitHub sont bien configurés
2. Vérifier les logs GitHub Actions
3. Tester le build localement : `npm run build`

### Vercel ne détecte pas les changements

1. Vérifier l'intégration GitHub/Vercel est active
2. Dashboard Vercel > Project Settings > Git
3. Vérifier "Auto-deploy" est activé

### Build réussi mais site non mis à jour

1. Vider le cache Cloudflare/CDN
2. Forcer un redéploiement sur Vercel
3. Vérifier le DNS pointe bien vers Vercel

---

## 📞 Support

**Email** : dts@djiboutigps.com  
**Site** : https://djiboutigps.com  
**Domaine** : Géré via Squarespace DNS → Vercel

---

## 🎉 Configuration Actuelle du Projet

- ✅ Domain : `djiboutigps.com`
- ✅ Hosting : Vercel
- ✅ DNS : Squarespace → Vercel
- ✅ CI/CD : GitHub Actions
- ✅ Auto-deploy : Activé
- ✅ Preview URLs : Activées pour PR
- ✅ Analytics : Google Analytics (G-E9DSGL91VT)

---

**Dernière mise à jour** : 24 Juin 2026  
**Version** : 0.0.1
