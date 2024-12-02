const admin = require("firebase-admin");

const verifySessionCookie = async (req: any, res: any, next: any) => {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res
      .status(401)
      .send({ error: "Unauthorized: You are not logged in" });
  }

  try {
    const decodedToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    console.log("Verifierad inloggad användare:", decodedToken);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Session cookie verification failed:", error);
    res.status(403).send({ error: "Unauthorized: Invalid session cookie" });
  }
};

export { verifySessionCookie };
