import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'

import 'dotenv/config'

const PORT = process.env.PORT

const app = express();

app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


app.get('/', (req, res) => {
  res.send('Works!')
});

io.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    socket.emit('message', `${new Date().toISOString()}: ${msg}`)
  });
});


server.listen(PORT || 3001, () => {
  console.log(`Server running at port ${PORT}`);
});