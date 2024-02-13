import { SocketEvents, SocketGameEvents } from "../common/constant/socketEvents";
import { Server } from "socket.io";
import * as http from "http";


export function SetupSocketServer(server: http.Server): Server {
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on(SocketEvents.CONNECTION, (socket) => {
    // console.log('user id:', socket.id)
    console.log('rooms:', socket.rooms)
    // console.log('handshake:', socket.handshake.auth.token)

    socket.on(SocketEvents.JOIN_ROOM, (room: string | undefined) => {
      const roomId = room ? room : socket.id
      socket.join(roomId)
      console.log('joined to: ', room)
      io.to(roomId).emit(SocketEvents.USER_CONNECTED, { userId: socket.id, roomId: roomId })
    })

    socket.on(SocketGameEvents.BANG, (room: string, targetId) => {
      io.to(room).emit(SocketGameEvents.BANG, {action: 'dmg'})
    })

    socket.on(SocketEvents.CHAT_MESSAGE, (msg) => {
      console.log('message: ' + msg);

      socket.emit('message', `${ new Date().toISOString() }: ${ msg }`)
    });


  });

  return io;
}