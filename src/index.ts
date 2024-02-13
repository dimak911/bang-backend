import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

import 'dotenv/config'
import { SocketEvents } from "./common/constant/socketEvents";
import { SetupSocketServer } from "./config/socket.config";

const PORT = process.env.PORT

const app = express();

app.use(cors())

const server = createServer(app);



app.get('/', (req, res) => {
  res.send('Works!')
});


const io = SetupSocketServer(server);

server.listen(PORT, () => {
  console.log('server running at: ' + PORT);
});