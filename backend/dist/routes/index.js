import express from "express";
import { directoryRouter } from "./Directory.js";
const router = express.Router();
router.use("/directory", directoryRouter);
export default router;
