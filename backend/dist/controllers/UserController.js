var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, data } = ParseCreateUser.safeParse(req.body);
        if (!success) {
            return res.status(401).json({
                success: false,
                message: "invalid input ",
            });
        }
        // check user exist or not
        const userExist = yield User.findOne({
            email: data.email,
        });
        if (userExist) {
            return res.status(401).json({
                success: false,
                message: "email already exist",
            });
        }
        // hash the password
        data.password = yield bcrypt.hash(data.password, 10);
        // generate the token
        // saving into the db
        const user = yield User.create(data);
        const token = jwt.sign({ userId: user._id }, "SECRET");
        res.status(200).json({
            success: true,
            message: "user created successfully",
            user,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(501).json({
                success: false,
                message: error.message,
            });
        }
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let userExist = yield User.findOne({
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
