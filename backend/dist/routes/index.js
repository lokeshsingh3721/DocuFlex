import express from "express";
import { directoryRouter } from "./Directory.js";
import { userRouter } from "./User.js";
import { fileRouter } from "./File.js";
const router = express.Router();
router.use("/directory", directoryRouter);
router.use("/user", userRouter);
router.use("/file", fileRouter);
export default router;
