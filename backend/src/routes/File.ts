import express from "express";
import { Request, Response } from "express";
import File from "../models/fileModel.js";
import {
  createFile,
  getFilesByParent,
  getFilesByType,
} from "../controllers/FileController.js";

const fileRouter = express.Router();

fileRouter.post("/create", createFile);
fileRouter.get("/fileByParentId/:id", getFilesByParent);
fileRouter.get("/fileByType/:filetype", getFilesByType);

export { fileRouter };
