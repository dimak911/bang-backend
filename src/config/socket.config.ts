import {
  SocketEvents,
  SocketGameEvents,
} from '../common/constant/socketEvents';
import { Server } from 'socket.io';
import * as http from 'http';

export function setupSocketServer(server: http.Server): Server {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on(SocketEvents.CONNECTION, (socket) => {
    const roomId = socket.id;

    socket.on(SocketEvents.JOIN_ROOM, () => {
      socket.join(roomId);
      io.to(roomId).emit(SocketEvents.USER_CONNECTED, {
        userId: socket.id,
        roomId: roomId,
      });
    });

    socket.on(SocketGameEvents.BANG, (room: string, targetId) => {
      io.to(room).emit(SocketGameEvents.BANG, { action: 'dmg' });
    });

    socket.on(SocketEvents.CHAT_MESSAGE, (msg) => {
      io.to(roomId).emit('message', `${new Date().toISOString()}: ${msg}`);
    });
  });

  return io;
}
