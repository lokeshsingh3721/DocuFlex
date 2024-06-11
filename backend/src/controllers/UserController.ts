import User from "../models/userModel.js";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

const ParseCreateUser = z.object({
  first: z.string(),
  last: z.string(),
  password: z.string(),
  email: z.string().email(),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { success, data } = ParseCreateUser.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        success: false,
        message: "invalid input ",
      });
    }
    // check user exist or not
    const userExist = await User.findOne({
      email: data.email,
    });
    if (userExist) {
      return res.status(401).json({
        success: false,
        message: "email already exist",
      });
    }
    // hash the password
    data.password = await bcrypt.hash(data.password, 10);

    // saving into the db
    const user = await User.create(data);
    res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  }
};
