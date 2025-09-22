import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import therapistRoutes from "./routes/therapistRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import meditationRoutes from "./routes/meditationRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/therapists", therapistRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/meditations", meditationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
