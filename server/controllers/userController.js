// controllers/userController.js
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function getAllUsers(req, res) {
  try {
    const db = getDB();
    const usercollection = await db.collection("users");
    res.json(usercollection);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function verifyLogin(req, res) {
  try {
    const db = getDB();
    const usercollection = await db.collection("users");
    const { email, password } = req.body;

    // Fetch user by email
    const user = await usercollection.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Convert password string ("YYYY-MM-DD") to Date
    const inputDOB = new Date(password);

    // Normalize both dates (remove time part)
    const formatDate = (date) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString();

    const inputDOBStr = formatDate(inputDOB);
    const storedDOBStr = formatDate(new Date(user.dob));

    if (inputDOBStr !== storedDOBStr) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid date of birth (password)" });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKENSECRETKEY, {
      expiresIn: "6h",
    });
    // Login success
    res.status(200).json({
      message: "Login successful",
      token,
      user,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function verifyUser(req, res) {
  return res
    .status(200)
    .json({ success: true, message: "Authorized user", user: req.user });
}

export async function getCollegeCanteens(req, res) {
  try {
    const db = getDB();
    const canteencollection = await db.collection("canteens");
    const college = req.user.college;
    const canteens = await canteencollection
      .find({ college: college })
      .toArray();
    return res.status(200).json({
      canteens,
      success: true,
      message: "canteens retrived successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "can't retrive canteens" });
  }
}

export async function getCanteenItems(req, res) {
  try {
    const db = getDB();
    const canteenitemscollection = await db.collection("fooditems");
    const { id } = req.params;
    // console.log("Canteen ID from frontend:", id);
    const fooditems = await canteenitemscollection
      .find({
        canteenId: id,
      })
      .toArray();
    // console.log(fooditems);
    return res.status(200).json({
      fooditems,
      success: true,
      message: "canteens items retrived successfully",
    });
  } catch (error) {
    // console.error("Error fetching canteen items:", error);
    return res
      .status(500)
      .json({ success: false, message: "can't retrive canteen items" });
  }
}

export async function postOrders(req, res) {
  try {
    const db = getDB();
    const ordercollection = await db.collection("orders");

    const { cart, address, paymentMethod, total, user, specialInstructions } =
      req.body;

    const newOrder = {
      cart,
      address,
      paymentMethod,
      total,
      user,
      specialInstructions,
      createdAt: new Date(), // Server-set timestamp
      status: "Pending", // Always enforce server-side
    };
    const result = await ordercollection.insertOne(newOrder);
    res.status(201).json({ success: true, _id: result.insertedId, ...newOrder });
  } catch (error) {
    // console.error("Error fetching canteen items:", error);
    return res
      .status(500)
      .json({ success: false, message: "can't post order" });
  }
}

export async function getOrders(req,res) {
  const { userEmail } = req.query;
  if (!userEmail) return res.status(400).json({ error: "Missing userEmail" });
  try{
    const db = getDB();
    const ordercollection = await db.collection("orders");
    const orders =await ordercollection.find({user:userEmail}).sort({createdAt:-1}).toArray();

    res.status(200).json(orders);

  }
  catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}