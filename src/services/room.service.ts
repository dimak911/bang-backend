import { PhaseEnum } from '../common/enums/phase.enum';
import { RoleEnum } from '../common/enums/role.enum';
import assignRoleToPlayerUtil from '../utils/assign-role-to-player.util';
import CharacterModel from '../models/Character/character.model';
import { RedisService } from './redis.service';
import { RoomType } from './room/types/room.type';
import { Player } from './room/types/player.type';

export async function createRoomState(
  roomId: string,
  roomOwner: Player,
): Promise<RoomType> {
  const state: RoomType = {
    id: roomId,
    owner: roomOwner,
    players: [roomOwner],
    phase: PhaseEnum.PREPARE,
    sheriff: null,
  };

  await RedisService.setData<RoomType>(state.id, state);

  return state;
}

export async function getExistingRoomState(roomId: string): Promise<RoomType> {
  const roomState = await RedisService.getDataByKey<RoomType>(roomId);

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

  await RedisService.setData<RoomType>(roomId, roomState);
}

export async function removePlayerFromRoom(
  roomId: string,
  playerId: string,
): Promise<void> {
  const roomState = await getExistingRoomState(roomId);

  roomState.players = roomState.players.filter(
    (player) => player.id !== playerId,
  );

  await RedisService.setData<RoomType>(roomId, roomState);
}

export async function beforeStartRoomState(roomId: string): Promise<RoomType> {
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
      id: player.id,
      character: player.character,
      username: player.username,
      health: player.health,
      weapon: player.weapon,
    } as Player;
  });
  roomState.phase = PhaseEnum.PREPARE;
  roomState.sheriff = sheriff;

  await RedisService.setData<RoomType>(roomId, roomState);

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
