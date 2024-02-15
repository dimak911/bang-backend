import getAvailableRolesUtil from './get-available-roles.util';
import { shuffle } from './shuffle.util';
import { Player } from '../common/interfaces/player.interface';

export default function assignRoleToPlayerUtil(players: Player[]) {
  const roles = getAvailableRolesUtil(players.length);
  const shuffledPlayers = shuffle<Player>(players);

  for (let i = roles.length - 1; i >= 0; i--) {
    const [selectedRole] = roles.splice(
      Math.floor(Math.random() * roles.length),
      1,
    );

    shuffledPlayers[i].role = selectedRole;
  }

  return shuffledPlayers;
}
