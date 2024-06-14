import express from "express";
import Directory from "../models/dirModel.js";
import { Request, Response } from "express";
import File from "../models/fileModel.js";
import { z } from "zod";
import { parse } from "dotenv";
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

export const createFile = async (req: Request, res: Response) => {
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
    const hasFile = await File.find({
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
    const file = await File.create(data);
    res.status(200).json({
      success: true,
      message: "file created successfully",
      file,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getFilesByParent = async (req: Request, res: Response) => {
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
    const hasParent = await Directory.findById({
      _id: parent,
    });
    if (!hasParent) {
      res.status(404).json({
        success: false,
        message: "parent doesnt not exist ",
      });
    }
    // get all the files
    const files = await File.find({
      parent,
    });
    res.status(200).json({
      success: true,
      message: "files fetched successfully",
      files,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getFilesByType = async (req: Request, res: Response) => {
  try {
    const { filetype } = req.params;
    const userId = req.headers["userId"];
    if (typeof filetype != "string") {
      return res.status(404).json({
        success: false,
        message: "invalid input ",
      });
    }
    const files = await File.find({
      fileType: filetype,
      userId,
    });
    return res.status(200).json({
      success: true,
      message: "files fetched successfully",
      files,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  }
};
