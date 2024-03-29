import { Server, Socket } from 'socket.io';
import http from 'http';
import { instrument } from '@socket.io/admin-ui';

import { SocketEventsEnum } from '../common/enums/socket/socket-events.enum';
import registerPlayerHandlers from '../services/sockets/player.handler';
import { RoomService } from '../services/room/room.service';

declare module 'socket.io' {
  interface Socket {
    username: string;
  }
}

export function setupSocketServer(server: http.Server): void {
  const io = new Server(server, {
    cors: {
      origin: [
        'https://admin.socket.io',
        'http://localhost:3003',
        'http://localhost:3000',
        'http://localhost:3001',
      ],
      credentials: true,
    },
  });

  instrument(io, {
    auth: false,
    mode: 'development',
  });

  const onConnection = (io: Server, socket: Socket) => {
    socket.onAny((event, ...args) => console.log('logger: ', event, ...args));

    RoomService.addToUserRoomOrCreate(socket);

    registerPlayerHandlers(io, socket);
  };

  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
  });

  io.on(SocketEventsEnum.CONNECTION, (socket: Socket) => {
    onConnection(io, socket);
  });
}
