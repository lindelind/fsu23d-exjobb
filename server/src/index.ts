import express from "express";
import cors from "cors";
import petFirstAidRouter from "./firebase/Pet First Aid/petFirstAid.router"
import placesRouter from "./google/google.router"

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", petFirstAidRouter);
app.use("/api", placesRouter);
const port = 3000;


app.listen(port, () => {
  console.log("Server is running!");
});
