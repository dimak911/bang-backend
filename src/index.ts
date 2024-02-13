import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

import { DB_PASSWORD, DB_USER, MONGODB_URI, ORIGIN, PORT } from "./config";

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ORIGIN,
  },
});

app.get("/", (req, res) => {
  res.send("Works!");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    socket.emit("message", `${new Date().toISOString()}: ${msg}`);
  });
});

async function run() {
  try {
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

    server.listen(PORT, () => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Server running at port ${PORT} 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀`,
      );
    });
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
