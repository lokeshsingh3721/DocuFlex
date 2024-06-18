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
  console.log(hasFile.length);
  return hasFile.length < 0 || hasFile.length == 0 ? false : true;
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

const deleteFileFromRecent = async (_id: string) => {
  await Recent.deleteOne({
    fileId: _id,
  });
};

const checkhasFile = async (_id: string) => {
  const file = await Recent.findOne({
    fileId: _id,
  });
  return file ? true : false;
};

export {
  checkUserExist,
  getFilesByUserId,
  checkHasFiles,
  createFile,
  deleteFileFromRecent,
  checkhasFile,
};
