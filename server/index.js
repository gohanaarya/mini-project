// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/canteens", userRoutes);
app.use("/api/orders", userRoutes);

// Start Server after DB Connect
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
