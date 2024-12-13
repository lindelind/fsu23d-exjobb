import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebaseConfig";


const API_URL =
  import.meta.env.MODE === "production"
    ? "https://fsu23d-exjobb.onrender.com/api"
    : "http://localhost:3000/api";

console.log(`API_URL is set to: ${API_URL}`);

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await axios.post(`${API_URL}/register`, {
      uid: user.uid,
      name, 
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};


export const loginUser = async (
email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;


    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const fetchIdToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is logged in");
    return null;
  }

  const idToken = await user.getIdToken();
  console.log("Fetched ID token:", idToken);
  return idToken;
};

export const logoutUser = async () => {
  try {
    await signOut(auth); // Loggar ut från Firebase Authentication
    console.log("Successfully logged out from Firebase");
  } catch (error) {
    console.error("Error logging out from Firebase:", error);
    throw error;
  }
};
