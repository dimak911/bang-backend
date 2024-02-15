import { RoleEnum } from '../common/enums/role.enum';
import { shuffle } from './shuffle.util';

export default function getAvailableRolesUtil(totalPlayers: number) {
  const baseRoles = [
    RoleEnum.SHERIFF,
    RoleEnum.RENEGADE,
    RoleEnum.OUTLAW,
    RoleEnum.OUTLAW,
  ];

  switch (totalPlayers) {
    case 5:
      baseRoles.push(RoleEnum.DEPUTY);
      break;

    case 6:
      baseRoles.push(RoleEnum.OUTLAW, RoleEnum.DEPUTY);
      break;

    case 7:
      baseRoles.push(RoleEnum.OUTLAW, RoleEnum.DEPUTY, RoleEnum.DEPUTY);
      break;
  }

  return shuffle<RoleEnum>(baseRoles);
}
