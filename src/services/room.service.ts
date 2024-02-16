import { Player } from '../common/interfaces/player.interface';
import { PhaseEnum } from '../common/enums/phase.enum';
import { RoleEnum } from '../common/enums/role.enum';
import assignRoleToPlayerUtil from '../utils/assign-role-to-player.util';
import { getDataByKey, setData } from './redis.service';
import CharacterModel from '../models/Character/character.model';

export interface RoomState {
  roomId: string;
  players: Player[];
  phase: PhaseEnum;
  sheriff: Player | null;
}

export async function createRoomState(
  roomId: string,
  roomOwner: Player,
): Promise<RoomState> {
  const state: RoomState = {
    roomId,
    players: [roomOwner],
    phase: PhaseEnum.PREPARE,
    sheriff: null,
  };

  await setData<RoomState>(state.roomId, state);

  return state;
}

export async function getExistingRoomState(roomId: string): Promise<RoomState> {
  const roomState = await getDataByKey<RoomState>(roomId);

  if (!roomState) {
    throw new Error('Room not found');
  }

  return roomState;
}

export async function joinPlayerToRoom(
  roomId: string,
  newPlayer: Player,
): Promise<void> {
  const roomState = await getExistingRoomState(roomId);

  roomState.players.push(newPlayer);

  await setData<RoomState>(roomId, roomState);
}

export async function removePlayerFromRoom(
  roomId: string,
  playerId: string,
): Promise<void> {
  const roomState = await getExistingRoomState(roomId);

  roomState.players = roomState.players.filter(
    (player) => player.uuid !== playerId,
  );

  await setData<RoomState>(roomId, roomState);
}

export async function beforeStartRoomState(roomId: string): Promise<RoomState> {
  const roomState = await getExistingRoomState(roomId);

  if (roomState.players.length < 4 || roomState.players.length > 7) {
    throw new Error('Invalid number of players');
  }

  const playersWithRoles = await attachCharacterToPlayer(
    assignRoleToPlayerUtil(roomState.players),
  );
  const [sheriff] = playersWithRoles.filter(
    (player) => player.role === RoleEnum.SHERIFF,
  );

  sheriff.health += 1;

  roomState.players = playersWithRoles.map((player) => {
    return {
      uuid: player.uuid,
      socketId: player.socketId,
      character: player.character,
      userName: player.userName,
      health: player.health,
      weapon: player.weapon,
    } as Player;
  });
  roomState.phase = PhaseEnum.PREPARE;
  roomState.sheriff = sheriff;

  await setData<RoomState>(roomId, roomState);

  return roomState;
}

async function attachCharacterToPlayer(players: Player[]): Promise<Player[]> {
  const character = await CharacterModel.findOne({ name: 'Default character' });

  if (!character) {
    throw new Error('No character found');
  }

  return players.map((player) => {
    player.character = character._id;
    player.health = character.health;

    return player;
  });
}
