import Recent from "../models/recentModel.js";
import User from "../models/userModel.js";

const getFilesByUserId = async (userId: string) => {
  const files = await Recent.find({
    userId,
  });
  return files;
};

const checkHasFiles = async (fileId: string) => {
  const hasFile = await Recent.find({
    fileId,
  });
  return hasFile.length > 0 ? true : false;
};

const createFile = async (data: any) => {
  const files = await Recent.create(data);
  return files;
};

const checkUserExist = async (_id: string) => {
  const user = await User.findById({
    _id,
  });
  return user;
};

export { checkUserExist, getFilesByUserId, checkHasFiles, createFile };
