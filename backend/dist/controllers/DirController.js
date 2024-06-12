var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Directory from "../models/dirModel.js";
import { z } from "zod";
import User from "../models/userModel.js";
import { getFileType } from "../utils/getFileType.js";
const createDirValidation = z.object({
    name: z.string(),
    parent: z.string().optional(),
    lastEdit: z.date().optional(),
    createdAt: z.date().optional(),
    userId: z.string(),
});
export const createDir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation
        const { success, data } = createDirValidation.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
            });
        }
        if (data.parent) {
            const parentExist = yield Directory.findById(data.parent);
            if (!parentExist) {
                return res.status(404).json({
                    success: false,
                    message: "Parent doesn't exist",
                });
            }
        }
        // check user exist or not
        const userExist = yield User.findById({
            _id: data.userId,
        });
        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "user doesnt exist ",
            });
        }
        const directoryExist = yield Directory.findOne({
            name: data.name,
            parent: data.parent,
        });
        if (directoryExist) {
            return res.status(400).json({
                success: false,
                message: "Directory already exists",
            });
        }
        const fileType = getFileType(data.name);
        // @ts-ignore
        data.fileType = fileType;
        const directory = yield Directory.create(data);
        res.status(200).json({
            success: true,
            data: directory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(501).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred",
        });
    }
});
export const getAllRootDir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDir = yield Directory.find({
            parent: null,
        });
        return res.status(200).json({
            success: true,
            data: allDir,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
});
export const getDirById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || typeof id != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid id",
            });
        }
        const items = yield Directory.find({
            parent: id,
        });
        res.status(200).json({
            success: true,
            data: items,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(501).json({
                success: false,
                message: error.message,
            });
        }
    }
});
export const deleteDir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id || typeof id != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid id",
            });
        }
        // recursively delete all the  sub folders
        function deleteAll(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const subDirs = yield Directory.find({
                    parent: id,
                });
                for (const dirs of subDirs) {
                    deleteAll(dirs._id);
                    yield Directory.deleteOne({
                        _id: dirs._id,
                    });
                }
            });
        }
        yield deleteAll(id);
        // delete the root folder
        yield Directory.deleteOne({
            _id: id,
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(501).json({
                success: false,
                message: error.message,
            });
        }
    }
});
export const updateDir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, parent } = req.body;
        if (!id || !parent || typeof id != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid id",
            });
        }
        const alreadyExist = yield Directory.find({
            name,
            parent,
        });
        if (alreadyExist.length > 0) {
            return res.status(404).json({
                success: false,
                message: "already exist ",
            });
        }
        const updatedDir = yield Directory.findByIdAndUpdate({
            _id: id,
        }, {
            name,
        }, { new: true });
        res.status(200).json({
            success: true,
            data: updatedDir,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(501).json({
                success: false,
                message: error.message,
            });
        }
    }
});
