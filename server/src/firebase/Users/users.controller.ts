import { db, FieldValue } from "../firebase"

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
  
    const userId = req.user.uid;

    const user = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

  try {

    if (!user.exists) {
      return res.status(404).send({ error: "User not found" });
    }

    const userData = {
      id: user.id,
      ...user.data(),
    };

    res.status(200).send(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send({ error: "Failed to fetch user data" });
  }
};



const createSessionCookie = async (req: any, res: any) => {
  const idToken = req.body.idToken; 

  if (!idToken) {
    return res.status(400).send({ error: "ID token is required" });
  }

  try {
    
   await admin.auth().verifyIdToken(idToken);
   
    const expiresIn = 7 * 24 * 60 * 60 * 1000; 
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    
   res.cookie("session", sessionCookie, {
     maxAge: expiresIn,
     httpOnly: true,
     secure: true,
     sameSite: "none",
   });

    res.status(200).send({ message: "Session cookie created successfully" });
  } catch (error) {
    console.error("Error creating session cookie:", error);
    res.status(401).send({ error: "Unauthorized: Invalid ID token" });
  }
};

const sessionLogout = (req: any, res: any) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: false, //ändra till true i prod
    sameSite: "lax",
  });
  res.status(200).send({ message: "Session cleared. You are logged out" });
};

const saveClinicToUser = async (req: any, res: any) => {
  const {id, clinicId } = req.body;

  try {
    await db
      .collection("users")
      .doc(id)
      .update({
        savedClinics: FieldValue.arrayUnion(clinicId)
      });

    res.status(200).send({ message: "Clinic ID saved" });
  } catch (error) {
    console.error("Error saving clinic ID:", error);
    res.status(500).send({ error: "Failed to save clinic ID" });
  }
};

const fetchSavedClinics = async (req: any, res: any) => {
  try {
    const user = await db.collection("users").doc(req.params.id).get();
    const { savedClinics = [] } = user.data();

    const clinics = await Promise.all(
      savedClinics.map((id: any) => db.collection("newTestClinics").doc(id).get())
    );

    res.status(200).send({clinics: clinics.filter((clinic) => clinic.exists)
        .map((clinic) => ({ id: clinic.id, ...clinic.data() })),
    });
  } catch (error) {
    console.error("Error fetching clinics", error)
    res.status(500).send({ error: "Failed to fetch clinics" });
  }
};


export { registerUser, getUserData, createSessionCookie, sessionLogout , saveClinicToUser, fetchSavedClinics};
