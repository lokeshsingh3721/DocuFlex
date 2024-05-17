var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const createDir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isFolder, parent } = req.body;
        if (parent) {
            const parentExist = yield Directory.findById({
                _id: parent,
            });
            if (!parentExist) {
                return res.status(404).json({
                    sucess: false,
                    message: "parent doesnt exist ",
                });
            }
        }
        // zod validation
        const { success, data } = createDir.safeParse({ name, isFolder, parent });
        if (!success) {
            return res.status(404).json({
                success: false,
                message: "invalid input",
            });
        }
        const directoryExist = yield Directory.findOne({
            name,
            isFolder,
            parent,
        });
        if (directoryExist) {
            return res.status(400).json({
                success: false,
                message: "already exists",
            });
        }
        const directory = yield Directory.create({
            name,
            isFolder,
            parent,
        });
        res.status(200).json({
            success: true,
            data: directory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(501).json({
                success: false,
                message: error.message,
            });
        }
    }
});
