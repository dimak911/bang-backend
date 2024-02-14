import { Types } from "mongoose";

import { CardSuitEnum } from "../../common/enums/card/card-suit.enum";
import { CardRankEnum } from "../../common/enums/card/card-rank.enum";
import { CardTypeEnum } from "../../common/enums/card/card-type.enum";
import { CardTargetEnum } from "../../common/enums/card/card-target.enum";
import { CardActionEnum } from "../../common/enums/card/card-action.enum";

export interface ICard {
  title: string;
  slug: string;
  image: string;
  description: string;
  suit: CardSuitEnum.HEARTS;
  rank: CardRankEnum.KING;
  type: CardTypeEnum.ONETIME;
  target: CardTargetEnum.ONE;
  cardAction: CardActionEnum.DAMAGE;
  cardBlockers: Types.ObjectId[];
  actionAmount: number;
  blockAmount: number;
  distance: number;
}
