import { Socket } from 'socket.io';
import { SocketAuth } from './types/socket-auth.type';
import { getDataByKey, setData } from '../redis.service';
import { SocketEventsEnum } from '../../common/enums/socket/socket-events.enum';
import { Player } from './types/player.type';

type Room = {
  owner: Player;
  players: Player[];
  id: string;
};

namespace RoomService {
  const createRoom = async (username: string, id: string): Promise<Room> => {
    const owner = { id, username };
    const room = {
      owner,
      players: [],
      id,
    };

    await setData(`room-${room.id}`, room);

    return room;
  };

  export const addToUserRoomOrCreate = async (socket: Socket) => {
    const { username, roomId } = socket.handshake.auth as SocketAuth;
    const id = socket.id;
    const room = await (roomId
      ? getDataByKey<Room>(`room-${roomId}`)
      : createRoom(username, id));

    if (!room) {
      socket.emit('error', {
        message: 'RoomNotFound',
        code: 404,
      });

      return;
    }

    socket.broadcast.to(room.id).emit('message', {
      user: 'admin',
      text: `Player ${username} has joined`,
    });

    socket.join(room.id);

    room.players.push({ id, username });

    await setData(`room-${room.id}`, room);

    socket.emit(SocketEventsEnum.USER_FIRST_CONNECTED, {
      username: username,
      roomId: room.id,
    });
  };
}

export { RoomService };
