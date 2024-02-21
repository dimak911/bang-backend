import { Player } from './player.type';
import { PhaseEnum } from '../../../common/enums/phase.enum';
import { OwnerType } from './owner.type';

export type RoomType = {
  id: string;
  owner: OwnerType;
  players: Player[];
  phase: PhaseEnum;
  sheriff: Player | null;
};
