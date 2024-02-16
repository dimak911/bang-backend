import { Schema, model } from 'mongoose';

import { ICard } from './card.interface';
import { CardSuitEnum } from '../../common/enums/card/card-suit.enum';
import { CardRankEnum } from '../../common/enums/card/card-rank.enum';
import { CardTypeEnum } from '../../common/enums/card/card-type.enum';
import { CardTargetEnum } from '../../common/enums/card/card-target.enum';
import { CardActionEnum } from '../../common/enums/card/card-action.enum';

const cardSchema = new Schema<ICard>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    suit: { type: String, enum: CardSuitEnum, required: true },
    rank: { type: String, enum: CardRankEnum, required: true },
    type: { type: String, enum: CardTypeEnum, required: true },
    target: { type: String, enum: CardTargetEnum, required: true },
    cardAction: { type: String, enum: CardActionEnum, required: true },
    cardBlockers: { type: [Schema.Types.ObjectId], ref: 'Card' },
    actionAmount: { type: Number, required: true },
    blockAmount: { type: Number, required: true },
    distance: { type: Number, required: true },
  },
  { timestamps: true },
);

const CardModel = model('Card', cardSchema);

export default CardModel;
