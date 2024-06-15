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
    var _a;
    try {
        // get the token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "invalid access",
            });
        }
        // verify the token
        const payload = jwt.verify(token, "SECRET");
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
export default authMiddleware;
