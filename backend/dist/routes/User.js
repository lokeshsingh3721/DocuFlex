import express from "express";
import { createUser, loginUser } from "../controllers/UserController.js";
const userRouter = express.Router();
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
export { userRouter };
