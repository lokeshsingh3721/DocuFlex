import express from "express";
import { createDir, deleteDir, getAllRootDir, getDirById, updateDir, } from "../controllers/DirController.js";
const directoryRouter = express.Router();
directoryRouter.post("/create", createDir);
directoryRouter.get("/getAllRootDir", getAllRootDir);
directoryRouter.get("/:id", getDirById);
directoryRouter.delete("/:id", deleteDir);
directoryRouter.put("/:id", updateDir);
export { directoryRouter };
