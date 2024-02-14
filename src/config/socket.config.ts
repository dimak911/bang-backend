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
    socket.on(SocketEvents.JOIN_ROOM, (room: string | undefined) => {
      const roomId = room ? room : socket.id;
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
      socket.emit('message', `${new Date().toISOString()}: ${msg}`);
    });
  });

  return io;
}
