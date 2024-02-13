import express from 'express';
import { createServer } from 'http';
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

app.get('/', (req, res) => {
  res.send('Works!')
});

io.on('connection', (socket) => {
  
  console.log('connected:', socket.id)

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    io.emit('message', `${new Date().toISOString()}: ${msg}`)
  });
});


server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});