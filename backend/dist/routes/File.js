import express from "express";
import { createFile } from "../controllers/FileController.js";
const fileRouter = express.Router();
fileRouter.post("/create", createFile);
export { fileRouter };
