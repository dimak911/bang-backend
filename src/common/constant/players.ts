import mongoose from 'mongoose';

import { Player } from '../interfaces/player.interface';

export const players: Player[] = [
  {
    uuid: crypto.randomUUID(),
    userName: 'Player1',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player2',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player3',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player4',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player5',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player6',
    role: null,
    character: null,
  },
  {
    uuid: crypto.randomUUID(),
    userName: 'Player7',
    role: null,
    character: null,
  },
];

export async function getPlayers() {
  const character = await mongoose.connection.db
    .collection('characters')
    .findOne();

  return players.map((player) => {
    if (character) {
      player.character = character._id;
    }

    return player;
  });
}
