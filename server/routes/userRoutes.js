// routes/userRoutes.js
import express from "express";
import { getAllUsers, getCanteenItems, getCollegeCanteens, getOrders, postOrders, verifyLogin, verifyUser } from "../controllers/userController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", verifyLogin);
router.get("/me",middleware, verifyUser);
router.get("/canteens",middleware, getCollegeCanteens);
router.get("/:id/foods",middleware, getCanteenItems);
router.post("/post",middleware, postOrders);
router.get("/list",middleware, getOrders);


export default router;
