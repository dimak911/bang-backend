import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors'

const app = express();

app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.send('Works!')
});

io.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    socket.emit('message', `${new Date().toISOString()}: ${msg}`)
  });
});


server.listen(3333, () => {
  console.log('server running at http://localhost:3000');
});