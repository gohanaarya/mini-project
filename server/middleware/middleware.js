import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import { getDB } from "../config/db.js";

dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const db = getDB();
    const usercollection = db.collection("users");

    const authHeader = req.headers.authorization;
    // console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKENSECRETKEY);
    // console.log("Decoded token:", decoded);

    const user = await usercollection.findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // console.error("Middleware error:", error.message);
    return res.status(500).json({ success: false, message: "Please login" });
  }
};

export default middleware;
