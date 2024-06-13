import User from "../models/userModel.js";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";

const ParseCreateUser = z.object({
  first: z.string(),
  last: z.string(),
  password: z.string(),
  email: z.string().email(),
});

const parseLoginUser = z.object({
  email: z.string().email(),
  password: z.string(),
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
    // generate the token
    // saving into the db
    const user = await User.create(data);
    const token = jwt.sign({ userId: user._id }, "SECRET");
    res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
      token,
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    // validate input
    const { success, data } = parseLoginUser.safeParse(req.body);
    console.log(success);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "invalid input",
      });
    }
    // user exist or not
    let userExist = await User.findOne({
      email: data.email,
    });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "user doesnt exist ",
      });
    }
    // generate the token
    const token = jwt.sign({ userId: userExist._id }, "SECRET");
    return res.status(200).json({
      success: true,
      message: "login successfully",
      token,
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
