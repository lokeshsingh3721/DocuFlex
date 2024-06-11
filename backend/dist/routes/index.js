import express from "express";
import { directoryRouter } from "./Directory.js";
import { userRouter } from "./User.js";
const router = express.Router();
router.use("/directory", directoryRouter);
router.use("/user", userRouter);
export default router;
