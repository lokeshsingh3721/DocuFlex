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
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the token
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "invalid access",
        });
    }
    // verify the token
    const payload = jwt.verify(token.split(" ")[1], "SECRET");
    if (!payload) {
        return res.status(404).json({
            success: false,
            message: "invalid token",
        });
    }
    // check user exist or not
    const user = yield User.findById({
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
});
export default authMiddleware;
