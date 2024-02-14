import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

import { DB_PASSWORD, DB_USER, MONGODB_URI, ORIGIN, PORT } from "./config";
import { runSeeders } from "./seeder";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ORIGIN,
  },
});

app.get("/", async (req, res) => {
  res.send("Works!");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    socket.emit("message", `${new Date().toISOString()}: ${msg}`);
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

async function run() {
  await mongoose.connect(MONGODB_URI, {
    auth: {
      username: DB_USER,
      password: DB_PASSWORD,
    },
  });

  console.log(
    "\x1b[32m%s\x1b[0m",
    "You successfully connected to MongoDB! 👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀",
  );

  runSeeders(mongoose.connection.db);

  server.listen(PORT, () => {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Server running at port ${PORT} 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀`,
    );
  });
}

run().catch(console.dir);
