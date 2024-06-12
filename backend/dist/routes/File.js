import express from "express";
import { createFile, getFilesByParent, getFilesByType, } from "../controllers/FileController.js";
const fileRouter = express.Router();
fileRouter.post("/create", createFile);
fileRouter.get("/fileByParentId/:id", getFilesByParent);
fileRouter.get("/fileByType/:filetype", getFilesByType);
export { fileRouter };
