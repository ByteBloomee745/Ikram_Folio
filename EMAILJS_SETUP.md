# Configuration EmailJS pour le Portfolio

## 📧 Instructions de configuration

Pour que le formulaire de contact fonctionne et que Ikram reçoive les emails, vous devez configurer EmailJS :

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Connectez-vous à votre tableau de bord

### 2. Configurer un service email
1. Dans le tableau de bord, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte email
5. **Copiez le Service ID** (ex: `service_xxxxxxx`)

### 3. Créer un template d'email
1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template :

```
Sujet: Nouveau message depuis votre portfolio - {{subject}}

Bonjour Ikram,

Vous avez reçu un nouveau message depuis votre portfolio :

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé depuis votre portfolio professionnel.
```

4. **Copiez le Template ID** (ex: `template_xxxxxxx`)

### 4. Obtenir votre clé publique
1. Allez dans **"Account"** > **"General"**
2. **Copiez votre Public Key** (ex: `xxxxxxxxxxxxxxx`)

### 5. Mettre à jour le code
Dans le fichier `script.js`, remplacez :

```javascript
// Ligne 286
emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique

// Ligne 318
'YOUR_SERVICE_ID', // Remplacez par votre Service ID

// Ligne 319  
'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID
```

### 6. Exemple de configuration finale
```javascript
// Initialize EmailJS
emailjs.init("user_abc123def456ghi789");

// Send email using EmailJS
const response = await emailjs.send(
    'service_gmail123', // Votre Service ID
    'template_portfolio456', // Votre Template ID
    templateParams
);
```

## ✅ Test du formulaire

1. Ouvrez votre portfolio dans un navigateur
2. Allez à la section "Contact"
3. Remplissez le formulaire
4. Cliquez sur "Envoyer le message"
5. Vérifiez que vous recevez l'email

## 🔧 Fonctionnalités incluses

- ✅ **Formulaire fonctionnel** avec validation
- ✅ **États de chargement** avec animation
- ✅ **Messages de statut** (succès/erreur)
- ✅ **Réinitialisation automatique** après envoi
- ✅ **Design responsive** et moderne
- ✅ **Validation des champs** obligatoires

## 📱 Responsive Design

Le formulaire s'adapte automatiquement à tous les écrans :
- Desktop : Formulaire côte à côte avec les informations de contact
- Mobile : Formulaire en pleine largeur
- Tablette : Layout adaptatif

## 🎨 Styles inclus

- **États de chargement** avec spinner animé
- **Messages de statut** colorés (vert/rouge/bleu)
- **Effets de survol** sur les boutons
- **Animations fluides** pour une meilleure UX

## 🚀 Prêt à utiliser !

Une fois EmailJS configuré, votre formulaire de contact sera entièrement fonctionnel et Ikram recevra tous les messages directement dans sa boîte email !
