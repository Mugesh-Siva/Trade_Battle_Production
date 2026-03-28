// Server/Services/UserRegister/SignAndLogin/Email.js

const admin = require("firebase-admin");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// ==============================
// 📌 REGISTER USER
// ==============================
const registerWithEmail = async (email, password) => {
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    return {
      success: true,
      uid: user.uid,
      email: user.email,
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ==============================
// 📌 LOGIN USER
// ==============================
const loginWithEmail = async (email, password) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message,
      };
    }

    return {
      success: true,
      uid: data.localId,
      idToken: data.idToken,
      refreshToken: data.refreshToken,
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  registerWithEmail,
  loginWithEmail,
};