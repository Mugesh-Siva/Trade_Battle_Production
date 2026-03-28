//The below code is only example for generating 12 digit short ID from Firebase UID. You can modify it as per your requirements and integrate it into your user registration flow.

// firebase-short-id.js

const admin = require("firebase-admin");
const crypto = require("crypto");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

/**
 * Convert Firebase UID to 12-digit number
 * @param {string} uid - Firebase Auth auto-generated UID
 * @returns {string} 12-digit numeric string
 */
function uidTo12Digit(uid) {
  // SHA256 hash of UID
  const hash = crypto.createHash("sha256").update(uid).digest("hex");

  // Convert first 15 hex digits to integer (more than 12 digits)
  const bigIntValue = BigInt("0x" + hash.substring(0, 15));

  // Reduce to 12 digits using modulo
  const twelveDigit = bigIntValue % 1000000000000n;

  // Pad with leading zeros if necessary
  return twelveDigit.toString().padStart(12, "0");
}

/**
 * Assign a short 12-digit ID to new users
 * @param {string} uid - Firebase Auth UID
 */
async function assignShortId(uid) {
  const shortId = uidTo12Digit(uid);

  // Save in Firestore under users collection
  await db.collection("users").doc(uid).set(
    {
      shortId,
    },
    { merge: true }
  );

  console.log(`Assigned shortId ${shortId} to user ${uid}`);
}

// Example usage
const exampleUID = "Kf8j1L9mN3oP0qRstUVWxyzABCdE"; // Replace with real UID
assignShortId(exampleUID)
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));