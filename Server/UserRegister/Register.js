const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

// 🔐 Firebase Admin Setup
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 🚀 REGISTER USER API
app.post("/registerUser", async (req, res) => {
  try {
    const { email, method, dob, username } = req.body;

    // 🧠 Calculate Age
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    const isEligible = age >= 13;

    // ⚠️ Check username uniqueness
    const existing = await db.collection("users")
      .where("UserName", "==", username)
      .get();

    if (!existing.empty) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // 📦 Create User Object
    const userData = {
      // Frontend data
      RegisteredEmail: email,
      RegisterationMethod: method,
      DateOfBirth: dob,
      UserName: username,

      // Calculated
      Age: age,
      isEligible: isEligible,

      // Defaults
      isActive: true,
      isBanned: false,
      isVerified: true,
      AppInPurchases: isEligible,
      DateOfRegisteration: new Date().toLocaleDateString(),
      TimeOfRegisteration: new Date().toLocaleTimeString(),
      Rank: "Rookie III",
      Money: 2500,
      MoneyInWallet: 500,
      TotalMatches: 0,
      TotalWins: 0,
      TotalDraws: 0,
      TotalLoses: 0
    };

    // 💾 Save to Firestore
    const userRef = await db.collection("users").add(userData);

    res.json({
      success: true,
      userId: userRef.id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ▶️ Start Server
app.listen(4889, () => {
  console.log("Server running on port 5000");
});