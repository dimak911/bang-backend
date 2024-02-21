export enum SocketEventsEnum {
  CONNECTION = 'connection',
  DISCONNECTED = 'disconnected',
  DISCONNECT = 'disconnect',

  JOIN_ROOM = 'joinRoom',
  USER_CONNECTED = 'userConnected',
  USER_FIRST_CONNECTED = 'userFirstConnected',

  MESSAGE = 'message',
  CHAT_MESSAGE = 'chatMessage',

  ROOM_USERS = 'roomUsers',

  ROOM_LOG = 'roomLog',
}
