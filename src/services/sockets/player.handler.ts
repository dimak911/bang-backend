import { Server, Socket } from 'socket.io';

import { SocketEventsEnum } from '../../common/enums/socket/socket-events.enum';
import { RedisService } from '../redis.service';
import { SocketAuth } from '../room/types/socket-auth.type';
import { PhaseEnum } from '../../common/enums/phase.enum';

export const playerHandler = (io: Server, socket: Socket) => {
  socket.on(SocketEventsEnum.ROOM_USERS, async (roomId) => {
    const room = await RedisService.getRoomCache(roomId);

    if (!room) return;

    io.to(room.id).emit(SocketEventsEnum.ROOM_USERS, room.players);
  });

  socket.emit(SocketEventsEnum.USER_FIRST_CONNECTED, {
    userId: socket.id,
  });

  socket.broadcast.emit(SocketEventsEnum.USER_CONNECTED, {
    userId: socket.id,
    username: socket.username,
  });

  socket.on(SocketEventsEnum.MESSAGE, async ({ roomId, message }) => {
    const room = await RedisService.getRoomCache(roomId);

    if (!room) return;

    io.to(room.id).emit(SocketEventsEnum.MESSAGE, message);
  });

  socket.on(SocketEventsEnum.DISCONNECT, async () => {
    const { roomId, username } = socket.handshake.auth as SocketAuth;

    if (roomId) {
      const room = await RedisService.getRoomCache(roomId);

      if (room?.phase === PhaseEnum.PREPARE) {
        room.players = room.players.filter(
          (player) => player.username !== username,
        );

        await RedisService.setRoomCache(roomId, room);

        io.to(roomId).emit(SocketEventsEnum.ROOM_USERS, room.players);
      }

      socket.to(roomId).emit(SocketEventsEnum.ROOM_LOG, {
        id: crypto.randomUUID(),
        user: 'admin',
        text: `${username} was disconnected`,
      });
    }
  });
};
