import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig, firebaseConfigured } from "./firebase-config.js";

let ready;
async function init() {
  if (!firebaseConfigured) throw new Error("Firebase has not been configured yet.");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  await signInAnonymously(auth);
  return { db };
}
window.DiwaliTracker = {
  async record({ type, name, method }) {
    if (!firebaseConfigured) throw new Error("Tracking is not configured yet.");
    ready ||= init();
    const { db } = await ready;
    const cleanName = String(name || "").trim().replace(/\\s+/g, " ").slice(0, 60);
    const ref = await addDoc(collection(db, "personalisationEvents"), {
      senderType: type,
      senderName: type === "generic" ? "" : cleanName,
      consent: true,
      shareMethod: method,
      createdAt: serverTimestamp()
    });
    return ref.id;
  }
};
