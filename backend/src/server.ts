import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";
import WebSocket, { WebSocketServer } from "ws";
import {
  checkHasFiles,
  createFile,
  getFilesByUserId,
} from "./utils/RecentFunctions.js";

type RecentFiles = {
  _id: string;
  name: string;
  createdAt: string;
  isFolder: boolean;
  parent: string;
  last_edit: string;
  size: string;
  userId: string;
};

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
      // send the initial data
      if (data.type === "initial") {
        const files = await getFilesByUserId(data.userId);
        ws.send(JSON.stringify({ type: "initial", files: files }));
        return;
      }
      if (data.type === "addFile") {
        const newFile: RecentFiles = {
          _id: data._id,
          name: data.name,
          createdAt: data.createdAt,
          isFolder: data.isFolder,
          parent: data.parent,
          last_edit: data.last_edit,
          size: data.size,
          userId: data.userId,
        };

        // if already exist file no need to add in recent

        const hasFile = await checkHasFiles(newFile._id);

        if (ws.readyState === WebSocket.OPEN && !hasFile) {
          await createFile(newFile);
          const files = await getFilesByUserId(newFile.userId);
          ws.send(JSON.stringify({ type: "newFile", files }));
        }
      }
    });

    ws.on("close", () => {
      console.log("connection disconnected ");
    });
  });
})();
