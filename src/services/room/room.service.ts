import { Socket } from 'socket.io';

import { SocketAuth } from './types/socket-auth.type';
import { SocketEventsEnum } from '../../common/enums/socket/socket-events.enum';
import { RoomType } from './types/room.type';
import { RedisService } from '../redis.service';
import { PhaseEnum } from '../../common/enums/phase.enum';
import { Player } from './types/player.type';

namespace RoomService {
  const createRoom = async (
    username: string,
    id: string,
  ): Promise<RoomType> => {
    const owner = { id, username };
    const room = {
      id,
      owner,
      players: [],
      phase: PhaseEnum.PREPARE,
      sheriff: null,
    };

    await RedisService.setRoomCache(room.id, room);

    return room;
  };

  export const addToUserRoomOrCreate = async (socket: Socket) => {
    const { username, roomId } = socket.handshake.auth as SocketAuth;
    const id = socket.id;

    const room = await (roomId
      ? RedisService.getRoomCache(roomId)
      : createRoom(username, id));

    if (!room) {
      socket.emit('error', {
        message: 'RoomNotFound',
        code: 404,
      });

      return;
    }

    socket.broadcast.to(room.id).emit(SocketEventsEnum.ROOM_LOG, {
      id: crypto.randomUUID(),
      user: 'admin',
      text: `Player ${username} has joined`,
    });

    socket.join(room.id);

    const existingPlayerIndex = room.players.findIndex(
      (player) => player.username === username,
    );

    if (existingPlayerIndex < 0) {
      const newPlayer: Player = {
        id,
        username,
        health: 0,
        character: null,
        role: null,
        weapon: null,
      };

      room.players.push(newPlayer);
    } else {
      room.players[existingPlayerIndex].id = socket.id;
    }

    await RedisService.setRoomCache(room.id, room);

    socket.emit(SocketEventsEnum.USER_FIRST_CONNECTED, {
      username: username,
      roomId: room.id,
    });
  };
}

export { RoomService };
