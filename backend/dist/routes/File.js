import express from "express";
import { createFile, deleteFile, getFilesByParent, getFilesByType, } from "../controllers/FileController.js";
import authMiddleware from "../middleware/Auth.js";
const fileRouter = express.Router();
fileRouter.post("/create", authMiddleware, createFile);
fileRouter.get("/fileByParentId/:id", authMiddleware, getFilesByParent);
fileRouter.get("/fileByType/:filetype", authMiddleware, getFilesByType);
fileRouter.delete("/delete/:id", authMiddleware, deleteFile);
export { fileRouter };
