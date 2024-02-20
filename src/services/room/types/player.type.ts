import { ICharacter } from '../../../models/Character/character.interface';
import { RoleEnum } from '../../../common/enums/role.enum';

export type Player = {
  username: string;
  hero?: ICharacter;
  role?: RoleEnum;
  id: string;
}