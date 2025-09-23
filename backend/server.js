import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import therapistRoutes from "./routes/therapistRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import meditationRoutes from "./routes/meditationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/therapists", therapistRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
