import Recent from "../models/recentModel.js";

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
  return hasFile;
};

const createFile = async (data: any) => {
  const files = await Recent.create(data);
  return files;
};

export { getFilesByUserId, checkHasFiles, createFile };
