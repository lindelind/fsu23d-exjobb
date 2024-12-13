// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser"; 
// import petFirstAidRouter from "./firebase/Pet First Aid/petFirstAid.router"
// import usersRouter from "./firebase/Users/users.router";
// import clinicsRouter from "./firebase/Clinics/clinics.router"
// import reviewRoutes from "./firebase/Reviews/reviews.router";

// const app = express();
// app.use(express.json());
// app.use(cookieParser()); 


// app.use(
//   cors({
//     origin: "https://hittavet-c3cf4.web.app",
//     credentials: true,
//   })
// );

// app.use("/api", petFirstAidRouter);
// app.use("/api", usersRouter);
// app.use("/api", clinicsRouter);
// app.use("/api", reviewRoutes);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import petFirstAidRouter from "./firebase/Pet First Aid/petFirstAid.router";
import usersRouter from "./firebase/Users/users.router";
import clinicsRouter from "./firebase/Clinics/clinics.router";
import reviewRoutes from "./firebase/Reviews/reviews.router";

const app = express();


app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "https://hittavet-c3cf4.web.app", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// Handle Preflight Requests
app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://hittavet-c3cf4.web.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

// API Routes
app.use("/api", petFirstAidRouter);
app.use("/api", usersRouter);
app.use("/api", clinicsRouter);
app.use("/api", reviewRoutes);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
