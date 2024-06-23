import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import {
  checkHasFiles,
  checkUserExist,
  createFile,
  deleteFileFromRecent,
  getFileById,
  getFilesByUserId,
  updateFile,
} from "./utils/RecentFunctions.js";
import { RecentFileType } from "../types.js";

const PORT = process.env.SERVER_PORT || 4000;

(async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  app.use("/api", router);

  await dbConnect();

  const server = app.listen(PORT, () => {
    console.log("server is listening to the port 4000");
  });
  const wss = new WebSocketServer({ server: server });

  wss.on("connection", (ws) => {
    console.log("new client is connected ");

    ws.on("message", async (message: any) => {
      const data = JSON.parse(message);
      // user validation check
      if (!data.token) {
        return ws.send(
          JSON.stringify({ type: "error", message: "invalid user " })
        );
      }

      const payload = jwt.verify(data.token, "SECRET") as JwtPayload;
      const userId = payload.userId;
      if (!userId) {
        return ws.send(
          JSON.stringify({ type: "error", message: "invalid user" })
        );
      }
      const userExist = await checkUserExist(userId);
      if (!userExist) {
        return ws.send(
          JSON.stringify({ type: "error", message: "user doesnot exist " })
        );
      }

      // send the initial data
      if (data.type === "initial") {
        const files = await getFilesByUserId(userId);
        ws.send(JSON.stringify({ type: "initial", files }));
        return;
      }
      if (data.type === "addFile") {
        const newFile: RecentFileType = {
          name: data.name,
          userId,
          fileId: data.fileId,
        };

        // if already exist file no need to add in recent

        const hasFile = await checkHasFiles(newFile.fileId);

        if (ws.readyState === WebSocket.OPEN && !hasFile) {
          await createFile(newFile);
          const files = await getFilesByUserId(newFile.userId);
          ws.send(JSON.stringify({ type: "newFile", files }));
        }
      }
      if (data.type === "delete") {
        // get the id
        const id = data.fileId;
        // delete the file
        if (ws.readyState === WebSocket.OPEN) {
          await deleteFileFromRecent(id);
          const files = await getFilesByUserId(userId);
          ws.send(JSON.stringify({ type: "delete", files }));
        }
      }
      if (data.type === "update") {
        const id = data.fileId;
        // get from File
        const file = await getFileById(id);
        // get all recent
        if (!file) {
          console.log("file doesnt exist");
          return;
        }
        const files = await updateFile(id, file.name);
        ws.send(JSON.stringify({ type: "update", files }));
      }
    });

    ws.on("close", () => {
      console.log("connection disconnected ");
    });
  });
})();
