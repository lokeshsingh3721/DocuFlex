var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Recent from "../models/recentModel.js";
const getFilesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield Recent.find({
        userId,
    });
    return files;
});
const checkHasFiles = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const hasFile = yield Recent.findById({
        _id,
    });
    return hasFile;
});
const createFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield Recent.create(data);
    return files;
});
export { getFilesByUserId, checkHasFiles, createFile };