
const admin = require("firebase-admin");


const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).send({ error: "Unauthorized: Invalid token" });
  }
};
 export {verifyToken};
