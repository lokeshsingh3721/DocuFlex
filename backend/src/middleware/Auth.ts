import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the token
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "invalid access",
    });
  }
  // verify the token
  const payload = jwt.verify(token.split(" ")[1], "SECRET") as JwtPayload;
  if (!payload) {
    return res.status(404).json({
      success: false,
      message: "invalid token",
    });
  }
  // check user exist or not
  const user = await User.findById({
    _id: payload.userId,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesnt exist ",
    });
  }
  // appending userId to the request
  req.headers["userId"] = payload.userId;
  next();
};

export default authMiddleware;
