import { SocketEventsEnum } from '../../common/enums/socket/socket-events.enum';
import { Server, Socket } from 'socket.io';

export const PlayerHandler = (io: Server, socket: Socket) => {
  const users = [];
  for (const [id, socket] of io.of('/').sockets) {
    users.push({
      userId: id,
      username: socket.username,
    });
  }
  socket.emit(SocketEventsEnum.ROOM_USERS, users);

  socket.emit(SocketEventsEnum.USER_FIRST_CONNECTED, {
    userId: socket.id,
  });

  socket.broadcast.emit(SocketEventsEnum.USER_CONNECTED, {
    userId: socket.id,
    username: socket.username,
  });

  socket.on(SocketEventsEnum.MESSAGE, ({ message, to }) => {
    console.log('sending message');
    socket.to(to).emit(SocketEventsEnum.CHAT_MESSAGE, {
      message: message,
      from: socket.id,
    });
  });

  // socket.on(SocketEventsEnum.JOIN_ROOM, (room: string | undefined) => {
  //   const roomId = room ? room.replace(/\s+/g, '') : socket.id;
  //   console.log(roomId);
  //   console.log('user: ', socket.id);
  //   socket.join(roomId);
  //   io.to(roomId).emit(SocketEventsEnum.USER_CONNECTED, {
  //     userId: socket.username,
  //     roomIdConnected: roomId,
  //   });
  // });
};
