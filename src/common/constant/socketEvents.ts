export enum SocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',

  JOIN_ROOM = 'join room',
  USER_CONNECTED = 'user connected',

  CHAT_MESSAGE = 'chat message',
}

export enum SocketGameEvents {
  BANG = 'bang',
  MISS = 'miss',
}
