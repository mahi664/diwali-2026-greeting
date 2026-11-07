// Firebase Web configuration. Replace these values with your Firebase project's Web App config.
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "REPLACE_WITH_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_PROJECT_ID",
  appId: "REPLACE_WITH_FIREBASE_APP_ID"
};
export const firebaseConfigured = !Object.values(firebaseConfig).some(v => String(v).startsWith("REPLACE_WITH"));
