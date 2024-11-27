import express from "express";
import cors from "cors";
const petFirstAidRoutes = require("./firebase/Pet First Aid/petFirstAid.router")

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", petFirstAidRoutes);
const port = 3000;


app.listen(port, () => {
  console.log("Server is running!");
});
