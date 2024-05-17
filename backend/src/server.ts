import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./db.js";
import router from "./routes/index.js";

const PORT = process.env.SERVER_PORT || 4000;

(async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  app.use("/api", router);

  await dbConnect();

  app.listen(PORT, () => {
    console.log(`server is listening to the port ${PORT} `);
  });
})();
