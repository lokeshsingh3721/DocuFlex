import Directory from "../models/dirModel.js";
import { any, string, z } from "zod";

import { Request, Response } from "express";
import mongoose from "mongoose";

type ObjectId = mongoose.Types.ObjectId;

const createDirValidation = z.object({
  name: z.string(),
  isFolder: z.boolean(),
  size: z.number(), // size can be string or undefined
  parent: z.string().optional(), // parent can be string or undefined
  lastEdit: z.date().optional(), // lastEdit can be date or undefined
  createdAt: z.date().optional(), // createdAt can be date or undefined
});

export const createDir = async (req: Request, res: Response) => {
  try {
    const { name, isFolder, size, parent, lastEdit, createdAt } = req.body;

    if (parent) {
      const parentExist = await Directory.findById(parent);
      if (!parentExist) {
        return res.status(404).json({
          success: false,
          message: "Parent doesn't exist",
        });
      }
    }

    // zod validation
    const parseResult = createDirValidation.safeParse({
      name,
      isFolder,
      size,
      parent,
      lastEdit,
      createdAt,
    });

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parseResult.error.errors,
      });
    }

    const { data } = parseResult;

    const directoryExist = await Directory.findOne({
      name,
      isFolder,
      parent,
    });

    if (directoryExist) {
      return res.status(400).json({
        success: false,
        message: "Directory already exists",
      });
    }

    const directory = await Directory.create(data);

    res.status(200).json({
      success: true,
      data: directory,
    });
  } catch (error: unknown) {
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
};

export const getAllRootDir = async (req: Request, res: Response) => {
  try {
    const allDir = await Directory.find({
      parent: null,
    });
    return res.status(200).json({
      success: true,
      data: allDir,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const getDirById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id != "string") {
      return res.status(404).json({
        success: false,
        message: "invalid id",
      });
    }
    const items = await Directory.find({
      parent: id,
    });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const deleteDir = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as ObjectId;

    if (!id || typeof id != "string") {
      return res.status(404).json({
        success: false,
        message: "invalid id",
      });
    }

    // recursively delete all the  sub folders

    async function deleteAll(id: ObjectId) {
      const subDirs = await Directory.find({
        parent: id,
      });
      for (const dirs of subDirs) {
        deleteAll(dirs._id);
        await Directory.deleteOne({
          _id: dirs._id,
        });
      }
    }

    await deleteAll(id);

    // delete the root folder

    await Directory.deleteOne({
      _id: id,
    });

    res.status(200).json({
      success: true,
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

export const updateDir = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, parent } = req.body;

    if (!id || !parent || typeof id != "string") {
      return res.status(404).json({
        success: false,
        message: "invalid id",
      });
    }

    const alreadyExist = await Directory.find({
      name,
      parent,
    });

    if (alreadyExist.length > 0) {
      return res.status(404).json({
        success: false,
        message: "already exist ",
      });
    }

    const updatedDir = await Directory.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedDir,
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
