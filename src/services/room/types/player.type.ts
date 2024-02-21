import { Types } from 'mongoose';

import { ICard } from '../../../models/Card/card.interface';
import { RoleEnum } from '../../../common/enums/role.enum';

export type Player = {
  id: string;
  username: string;
  role: RoleEnum | null;
  character: Types.ObjectId | null;
  health: number;
  weapon: null | ICard;
};
