// config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectToDB() {
  try {
    await client.connect();
    db = client.db("database"); // defaults to db name from URI
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}
