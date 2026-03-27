// Server/Firebase/Firebase.js

import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Validate env
if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY
) {
  throw new Error("❌ Missing Firebase Admin credentials");
}

// Initialize Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

// Core Services
const db = admin.firestore();
const auth = admin.auth();

// 🔥 Advanced Utilities
const FieldValue = admin.firestore.FieldValue;
const Timestamp = admin.firestore.Timestamp;

// Batch write helper
const createBatch = () => db.batch();

// Transaction helper
const runTransaction = async (callback) => {
  return await db.runTransaction(callback);
};

// Server time
const serverTime = () => FieldValue.serverTimestamp();

export {
  db,
  auth,
  FieldValue,
  Timestamp,
  createBatch,
  runTransaction,
  serverTime,
};