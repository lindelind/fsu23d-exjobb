
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import petFirstAidRouter from "./firebase/Pet First Aid/petFirstAid.router";
import usersRouter from "./firebase/Users/users.router";
import clinicsRouter from "./firebase/Clinics/clinics.router";
import reviewRoutes from "./firebase/Reviews/reviews.router";
// import { exec } from "child_process";
// const cron = require("node-cron");

const app = express();


const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://hittavet-c3cf4.web.app"] // Produktion
    : ["http://localhost:5173"]; // Utveckling

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Unexpected origin: ${origin}`);
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", (req, res) => {
  const origin = req.headers.origin || ""; 
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.sendStatus(204);
  } else {
    res.status(403).send("CORS policy violation");
  }
});

// API Routes
app.use("/api", petFirstAidRouter);
app.use("/api", usersRouter);
app.use("/api", clinicsRouter);
app.use("/api", reviewRoutes);


// cron.schedule('0 13 2 */2 *', {
//   scheduled: true,
//   timezone: "Europe/Stockholm" }, () => {
//   // Kör klockan 13 den 2:a i varannan månad(start 2 januari)
//   console.log("Starting fetchClinics...");
//   exec("npx ts-node ./src/google/fetchClinics.ts", (error, result) => {
//     if (error) {
//       console.error("Error during fetchClinics:", error);
//       return;
//     }
//     console.log("fetchClinics completed:", result);

//     console.log("Starting uploadClinics...");
//     exec(
//       "npx ts-node ./src/google/uploadClinics.ts",
//       (uploadError, uploadResult) => {
//         if (uploadError) {
//           console.error("Error during uploadClinics:", uploadError);
//           return;
//         }
//         console.log("uploadClinics completed:", uploadResult);
//       }
//     );
//   });
// });


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
