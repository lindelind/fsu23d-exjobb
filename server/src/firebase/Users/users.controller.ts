const admin = require("firebase-admin");

const registerUser = async (req: any, res: any) => {

  const { uid, name, email } = req.body;

  try {
    const db = admin.firestore();

    await db.collection("users").doc(uid).set({
      name,
      email,
      savedClinics: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("User data saved successfully to Firestore");
    res.status(200).send({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).send({ error: "Failed to save user data" });
  }
};



const getUserData = async (req: any, res: any) => {
  try {
    const userId = req.user.uid;

    const user = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!user.exists) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send(user.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send({ error: "Failed to fetch user data" });
  }
};

export { registerUser, getUserData };
