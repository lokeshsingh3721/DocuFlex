import Recent from "../models/recentModel.js";
import User from "../models/userModel.js";

const getFilesByUserId = async (userId: string) => {
  const files = await Recent.find({
    userId,
  });
  return files;
};

const checkHasFiles = async (_id: string) => {
  const hasFile = await Recent.findById({
    _id,
  });
  return hasFile ? true : false;
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
