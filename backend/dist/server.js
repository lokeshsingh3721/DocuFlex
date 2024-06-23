var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";
import jwt from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import { checkHasFiles, checkUserExist, createFile, deleteFileFromRecent, getFileById, getFilesByUserId, updateFile, } from "./utils/RecentFunctions.js";
const PORT = process.env.SERVER_PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan("tiny"));
    app.use("/api", router);
    yield dbConnect();
    const server = app.listen(PORT, () => {
        console.log("server is listening to the port 4000");
    });
    const wss = new WebSocketServer({ server: server });
    wss.on("connection", (ws) => {
        console.log("new client is connected ");
        ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
            const data = JSON.parse(message);
            // user validation check
            if (!data.token) {
                return ws.send(JSON.stringify({ type: "error", message: "invalid user " }));
            }
            const payload = jwt.verify(data.token, "SECRET");
            const userId = payload.userId;
            if (!userId) {
                return ws.send(JSON.stringify({ type: "error", message: "invalid user" }));
            }
            const userExist = yield checkUserExist(userId);
            if (!userExist) {
                return ws.send(JSON.stringify({ type: "error", message: "user doesnot exist " }));
            }
            // send the initial data
            if (data.type === "initial") {
                const files = yield getFilesByUserId(userId);
                ws.send(JSON.stringify({ type: "initial", files }));
                return;
            }
            if (data.type === "addFile") {
                const newFile = {
                    name: data.name,
                    userId,
                    fileId: data.fileId,
                };
                // if already exist file no need to add in recent
                const hasFile = yield checkHasFiles(newFile.fileId);
                if (ws.readyState === WebSocket.OPEN && !hasFile) {
                    yield createFile(newFile);
                    const files = yield getFilesByUserId(newFile.userId);
                    ws.send(JSON.stringify({ type: "newFile", files }));
                }
            }
            if (data.type === "delete") {
                // get the id
                const id = data.fileId;
                // delete the file
                if (ws.readyState === WebSocket.OPEN) {
                    yield deleteFileFromRecent(id);
                    const files = yield getFilesByUserId(userId);
                    ws.send(JSON.stringify({ type: "delete", files }));
                }
            }
            if (data.type === "update") {
                const id = data.fileId;
                // get from File
                const file = yield getFileById(id);
                // get all recent
                if (!file) {
                    console.log("file doesnt exist");
                    return;
                }
                const files = yield updateFile(id, file.name);
                ws.send(JSON.stringify({ type: "update", files }));
            }
        }));
        ws.on("close", () => {
            console.log("connection disconnected ");
        });
    });
}))();
