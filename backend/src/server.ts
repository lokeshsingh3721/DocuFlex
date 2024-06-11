import express, { json } from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";
import WebSocket, { WebSocketServer } from "ws";

type RecentFiles = {
  _id: string;
  name: string;
  createdAt: string;
  isFolder: boolean;
  parent: string;
  last_edit: string;
  size: string;
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
  let recentFiles: RecentFiles[] = [];

  wss.on("connection", (ws) => {
    console.log("new client is connected ");

    ws.on("message", (message: any) => {
      const data = JSON.parse(message);
      if (data.type === "addFile") {
        const newFile: RecentFiles = {
          _id: data._id,
          name: data.name,
          createdAt: data.createdAt,
          isFolder: data.isFolder,
          parent: data.parent,
          last_edit: data.last_edit,
          size: data.size,
        };

        const hasFile = recentFiles.some((el) => el._id == newFile._id);

        if (!hasFile) {
          recentFiles = [newFile, ...recentFiles].slice(0, 10);
        }

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "newFile", files: recentFiles }));
        }
      }
    });

    ws.on("close", () => {
      console.log("connection disconnected ");
    });
  });
})();
