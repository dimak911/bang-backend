import { Types } from 'mongoose';

import { RoleEnum } from '../enums/role.enum';

export interface Player {
  uuid: string;
  role: RoleEnum | null;
  character: Types.ObjectId | null;
  userName: string;
}
