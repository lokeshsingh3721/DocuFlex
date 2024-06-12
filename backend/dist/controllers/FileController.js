var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import File from "../models/fileModel.js";
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
export const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation
        const { success, data } = parseFileType.safeParse(req.body);
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
