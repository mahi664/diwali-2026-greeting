# Diwali personalisation tracker setup

The frontend remains usable without tracking configured. Personalisation records are written only when a visitor explicitly checks the consent box before sharing.

## 1. Create Firebase project
1. Create a Firebase project and register a Web App.
2. Copy its Web App config into `firebase-config.js` (apiKey, authDomain, projectId, appId).
3. In Firebase Authentication, enable **Anonymous** and **Email/Password** sign-in.
4. Create a Firestore database.

## 2. Secure Firestore
1. In `firestore.rules`, replace `REPLACE_WITH_ADMIN_EMAIL` with the exact administrator email address.
2. Publish these rules in Firebase Console → Firestore Database → Rules.
3. Create an administrator user in Firebase Authentication using that email, verify the email address, and use a strong unique password.
4. Do not put an admin password or service-account key in this repository.

Rules permit anonymous authenticated clients to create only validated, consented records. Public reads, edits and deletes are denied. Only the verified administrator email can read records.

## 3. Use the dashboard
Open `/admin.html` on the deployed site and sign in with the administrator account. The dashboard shows the latest 1,000 records and exports them as CSV.

## Data and privacy
- Stored fields: sender type, sender name (only after opt-in), consent flag, share method and server timestamp.
- No email, phone number, IP address, device identifier or recipient identity is collected.
- Visitors who decline consent can still share; their sender details are not recorded.
- The tracker counts consented link creations, not unique humans, recipients, link opens or forwards.
- Set a retention period and delete old records from Firestore when no longer needed.
- Firebase web config is public by design; Firestore security rules enforce access. Consider enabling Firebase App Check before promoting the site widely.
