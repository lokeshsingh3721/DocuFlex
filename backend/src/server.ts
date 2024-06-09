import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";
import WebSocket, { WebSocketServer } from "ws";

type RecentFiles = {
  name: string;
  timestamp: string;
};

const PORT = process.env.SERVER_PORT || 4000;

(async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  app.use("/api", router);

  await dbConnect();

  const server = app.listen(4000, () => {
    console.log("server is listening to the port 4000");
  });
  const wss = new WebSocketServer({ server: server });
  let recentFiles: RecentFiles[] = [];

  wss.on("connection", (ws) => {
    console.log("new client is connected ");
    ws.send(JSON.stringify({ type: "initial", files: recentFiles }));

    ws.on("message", (message: any) => {
      const data = JSON.parse(message);
      if (data.type === "addFile") {
        const newFile = {
          name: data.name,
          timestamp: new Date().toISOString(),
        };
        recentFiles = [newFile, ...recentFiles].slice(0, 10);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({ type: "newFile", files: recentFiles })
            );
          }
        });
      }
    });

    ws.on("close", () => {
      console.log("connection disconnected ");
    });
  });
})();
