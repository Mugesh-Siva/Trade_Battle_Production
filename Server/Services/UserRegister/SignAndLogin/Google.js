// Server/Services/UserRegister/SignAndLogin/Google.js

const admin = require("firebase-admin");

// ==============================
// 📌 GOOGLE LOGIN
// ==============================
const loginWithGoogle = async (idToken) => {
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    // OPTIONAL: ensure user exists
    let user;
    try {
      user = await admin.auth().getUser(decoded.uid);
    } catch {
      user = await admin.auth().createUser({
        uid: decoded.uid,
        email: decoded.email,
      });
    }

    return {
      success: true,
      uid: decoded.uid,
      email: decoded.email,
    };

  } catch (error) {
    return {
      success: false,
      error: "Invalid Google token",
    };
  }
};

module.exports = {
  loginWithGoogle,
};