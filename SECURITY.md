# 🔐 Security Policy

## Overview

This document outlines the security measures and best practices for the ArenaQuest application.

## 🛡️ Firebase API Keys - Important Information

### Understanding Firebase Web API Keys

**Firebase API keys for web applications are NOT secret keys** - they are designed to be publicly exposed in client-side code. This is intentional and by design.

#### Why Firebase API Keys are Public

1. **Client-Side Nature**: Web apps run in the browser, making any embedded credentials visible
2. **Not Authentication**: The API key identifies your Firebase project, not your user
3. **Security Through Rules**: Firebase security comes from Database Rules and Authentication, not from hiding the API key

#### Real Security Measures

Your Firebase project is secured by:

1. **Firebase Authentication**: Users must authenticate before accessing data
2. **Database Security Rules**: Control who can read/write data (see `database.rules.json`)
3. **Admin Custom Claims**: Only authorized users have admin privileges
4. **Domain Restrictions**: Limit API key usage to specific domains in Firebase Console

### Current Security Implementation

✅ **Implemented Security Measures:**
- Firebase Authentication with email/password
- Custom admin claims for role-based access
- Database security rules enforcing authentication
- Admin verification before sensitive operations
- Environment variables for credentials (best practice)

## 🔄 Rotating Your Firebase API Key (If Needed)

If you still want to rotate your Firebase API key:

### Step 1: Create a New Web App in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`roomtracker-8855b`)
3. Go to **Project Settings** → **General**
4. Scroll to "Your apps" section
5. Click **Add app** → **Web**
6. Register a new app (e.g., "ArenaQuest-New")
7. Copy the new configuration values

### Step 2: Update Environment Variables

1. Open your `.env` file (not tracked by git)
2. Replace the Firebase configuration values:
   ```env
   VITE_FIREBASE_API_KEY=your_new_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_new_auth_domain
   # ... etc
   ```

### Step 3: Remove Old App (Optional)

1. In Firebase Console → **Project Settings** → **General**
2. Find the old app configuration
3. Click the three dots → **Delete app**

### Step 4: Test Everything

```bash
# Clear build cache
rm -rf dist node_modules/.vite

# Reinstall and test
npm install
npm run dev
```

## 🔒 Additional Security Best Practices

### 1. Restrict API Key Usage

**Firebase Console** → **Project Settings** → **General** → **Web API Key**

Restrict your API key to:
- Specific domains (e.g., `yourapp.com`, `localhost:3000`)
- Specific HTTP referrers

### 2. Database Security Rules

Review and update your `database.rules.json`:

```json
{
  "rules": {
    "rooms": {
      "$roomCode": {
        ".read": "auth != null",
        ".write": "auth != null",
        "adminId": {
          ".write": "!data.exists() || data.val() == auth.uid"
        }
      }
    }
  }
}
```

### 3. Environment Variables

**Never commit these files:**
- `.env` - Your actual credentials (gitignored)
- `.env.local` - Local overrides (gitignored)
- `serviceAccountKey.json` - Firebase Admin SDK key (gitignored)

**Safe to commit:**
- `.env.example` - Template with placeholders

### 4. Regular Security Audits

- Review Firebase Authentication logs monthly
- Check Database security rules
- Monitor unusual activity in Firebase Console
- Update dependencies regularly: `npm audit fix`

## 📋 Security Checklist

Before deploying to production:

- [ ] Firebase Database Rules are properly configured
- [ ] Authentication is required for all sensitive operations
- [ ] Admin custom claims are set up correctly
- [ ] API keys are restricted to your domains
- [ ] `.env` files are gitignored
- [ ] `serviceAccountKey.json` is gitignored
- [ ] All dependencies are up to date
- [ ] Security rules are tested in Firebase Emulator

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public GitHub issue
2. Email security concerns to: adityaissc7@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We'll respond within 48 hours.

## 📚 Additional Resources

- [Firebase Security Documentation](https://firebase.google.com/docs/rules)
- [Firebase Security Best Practices](https://firebase.google.com/support/guides/security-checklist)
- [Understanding Firebase API Keys](https://firebase.google.com/docs/projects/api-keys)
- [Securing Your Database](https://firebase.google.com/docs/database/security)

## 📝 Change Log

### 2025-10-23
- **FIXED**: Moved Firebase credentials to environment variables
- **ADDED**: Comprehensive security documentation
- **UPDATED**: .gitignore to exclude .env files
- **CREATED**: .env.example template for new developers

---

**Remember**: The best security comes from proper Firebase configuration, not from hiding API keys! 🔐

