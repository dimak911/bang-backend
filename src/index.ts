import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

import { MONGODB_URI, ORIGIN, PORT } from "./config";

const mongoClient = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
    await mongoClient.connect();
    await mongoClient.db("mongo").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    server.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } finally {
    await mongoClient.close();
  }
}

run().catch(console.dir);
