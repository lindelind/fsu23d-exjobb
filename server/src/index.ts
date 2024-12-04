import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import petFirstAidRouter from "./firebase/Pet First Aid/petFirstAid.router"
import usersRouter from "./firebase/Users/users.router";
import clinicsRouter from "./firebase/Clinics/clinics.router"

const app = express();
app.use(express.json());
app.use(cookieParser()); 


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", petFirstAidRouter);
app.use("/api", usersRouter);
app.use("/api", clinicsRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});