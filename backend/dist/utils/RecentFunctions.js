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
import User from "../models/userModel.js";
import File from "../models/fileModel.js";
const getFilesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield Recent.find({
        userId,
    });
    return files;
});
const checkHasFiles = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const hasFile = yield Recent.find({
        fileId,
    });
    console.log(hasFile.length);
    return hasFile.length < 0 || hasFile.length == 0 ? false : true;
});
const createFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield Recent.create(data);
    return files;
});
const checkUserExist = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById({
        _id,
    });
    return user;
});
const deleteFileFromRecent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Recent.deleteOne({
        fileId: _id,
    });
});
const getFileById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield File.findById({
        _id,
    });
    return file;
});
const updateFile = (_id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield Recent.findOneAndUpdate({
        fileId: _id,
    }, { name });
    const files = yield Recent.find();
    return files;
});
export { checkUserExist, getFilesByUserId, checkHasFiles, createFile, deleteFileFromRecent, getFileById, updateFile, };
