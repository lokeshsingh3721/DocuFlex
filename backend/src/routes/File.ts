import express from "express";
import { Request, Response } from "express";
import File from "../models/fileModel.js";
import { createFile } from "../controllers/FileController.js";

const fileRouter = express.Router();

fileRouter.post("/create", createFile);

export { fileRouter };
