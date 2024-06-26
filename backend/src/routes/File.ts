import express from "express";
import {
  createFile,
  deleteFile,
  getFilesByParent,
  getFilesByType,
  updateFile,
  uploadFile,
} from "../controllers/FileController.js";
import authMiddleware from "../middleware/Auth.js";
import { upload } from "../utils/uploadFile.js";

const fileRouter = express.Router();

fileRouter.post("/create", authMiddleware, createFile);
fileRouter.get("/fileByParentId/:id", authMiddleware, getFilesByParent);
fileRouter.get("/fileByType/:filetype", authMiddleware, getFilesByType);
fileRouter.delete("/delete", authMiddleware, deleteFile);
fileRouter.put("/update", authMiddleware, updateFile);
fileRouter.post("/upload", upload.single("file"), uploadFile);

export { fileRouter };
