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
import File from "../models/fileModel.js";
import Recent from "../models/recentModel.js";
import { z } from "zod";
import { getFileType } from "../utils/getFileType.js";
const parseFileType = z.object({
    name: z.string(),
    createdAt: z.date().optional(),
    lastEdit: z.date().optional(),
    size: z.number(),
    parent: z.string(),
    userId: z.string(),
    fileType: z.string().optional(),
});
const parseFileUpdate = z.object({
    name: z.string(),
    fileId: z.string(),
    userId: z.string(),
});
export const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation
        const { name, createdAt, lastEdit, size, parent } = req.body;
        const userId = req.headers["userId"];
        const { success, data } = parseFileType.safeParse({
            name,
            createdAt,
            lastEdit,
            size,
            parent,
            userId,
        });
        if (!success) {
            return res.status(404).json({
                success: false,
                message: "invalid input type",
            });
        }
        // check file already exist within same parent folder
        const hasFile = yield File.find({
            name: data.name,
            parent: data.parent,
            userId: data.userId,
        });
        if (hasFile.length > 0) {
            return res.status(404).json({
                success: false,
                message: "file already exists ",
            });
        }
        // get the file type
        const fileType = getFileType(data.name);
        data.fileType = fileType;
        // create a file
        const file = yield File.create(data);
        res.status(200).json({
            success: true,
            message: "file created successfully",
            file,
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
export const getFilesByParent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: parent } = req.params;
        console.log("parentid", parent);
        if (typeof parent != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid input ",
            });
        }
        // check parent exist or not
        const hasParent = yield Directory.findById({
            _id: parent,
        });
        if (!hasParent) {
            res.status(404).json({
                success: false,
                message: "parent doesnt not exist ",
            });
        }
        // get all the files
        const files = yield File.find({
            parent,
        });
        res.status(200).json({
            success: true,
            message: "files fetched successfully",
            files,
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
export const getFilesByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filetype } = req.params;
        const userId = req.headers["userId"];
        if (typeof filetype != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid input ",
            });
        }
        const files = yield File.find({
            fileType: filetype,
            userId,
        });
        return res.status(200).json({
            success: true,
            message: "files fetched successfully",
            files,
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
export const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"];
        const { parent, id } = req.query;
        if (typeof id != "string") {
            return res.status(404).json({
                success: false,
                message: "invalid input",
            });
        }
        // check file exist or not
        const doesFileExist = yield File.find({
            _id: id,
            userId,
        });
        if (doesFileExist.length <= 0) {
            return res.status(404).json({
                success: false,
                message: "file does not exist ",
            });
        }
        // check if file exist in recent
        const fileExistInRecent = yield Recent.findOne({
            fileId: id,
            userId,
        });
        if (fileExistInRecent) {
            yield Recent.deleteOne({
                fileId: id,
                userId,
            });
        }
        // delete the file
        yield File.deleteOne({
            _id: id,
            userId,
        });
        // get all the files
        const files = yield File.find({
            parent,
            userId,
        });
        res.status(200).json({
            success: true,
            message: "file deleted successfully",
            files,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(501).json({
                success: false,
                message: error.message,
            });
            console.log(error.message);
        }
    }
});
export const updateFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId, name } = req.query;
        const userId = req.headers["userId"];
        console.log(fileId, name);
        // zod validation
        const { success, data } = parseFileUpdate.safeParse({
            fileId,
            name,
            userId,
        });
        if (!success) {
            return res.status(404).json({
                success: false,
                message: "invalid input",
            });
        }
        // check file exist or not
        const fileExist = yield File.findById({
            _id: data.fileId,
        });
        if (!fileExist) {
            return res.status(404).json({
                success: false,
                message: "file doesnot exist",
            });
        }
        // update file
        yield File.findOneAndUpdate({ _id: data.fileId, name: data.name });
        return res.status(200).json({
            success: true,
            message: "update successfully",
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(501).json({
                success: false,
                message: error.message,
            });
    }
});
