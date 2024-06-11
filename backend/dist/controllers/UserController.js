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
const ParseCreateUser = z.object({
    first: z.string(),
    last: z.string(),
    password: z.string(),
    email: z.string().email(),
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
        // saving into the db
        const user = yield User.create(data);
        res.status(200).json({
            success: true,
            message: "user created successfully",
            user,
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
