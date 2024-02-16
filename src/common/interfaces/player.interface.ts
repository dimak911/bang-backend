import { Types } from 'mongoose';

import { RoleEnum } from '../enums/role.enum';
import { ICard } from '../../models/Card/card.interface';

export interface Player {
  uuid: string;
  socketId: string | null;
  role: RoleEnum | null;
  character: Types.ObjectId | null;
  userName: string;
  health: number;
  weapon: null | ICard;
}
