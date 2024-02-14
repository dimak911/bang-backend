import CardModel from "../models/Card/card.model";
import { HOST } from "../config";
import { CardTypeEnum } from "../common/enums/card/card-type.enum";
import { CardTargetEnum } from "../common/enums/card/card-target.enum";
import { CardActionEnum } from "../common/enums/card/card-action.enum";
import { CardSuitEnum } from "../common/enums/card/card-suit.enum";
import { CardRankEnum } from "../common/enums/card/card-rank.enum";

const missCard = new CardModel({
  title: "Missed!",
  slug: "missed",
  image: `${HOST}/images/miss.png`,
  description: "Cancel the hit.",
  suit: CardSuitEnum.SPADES,
  rank: CardRankEnum.FIVE,
  type: CardTypeEnum.ONETIME,
  target: CardTargetEnum.SELF,
  cardAction: CardActionEnum.BLOCK,
  cardBlockers: [],
  actionAmount: 1,
  blockAmount: 1,
  distance: 1,
});

const cards = [
  missCard,
  new CardModel({
    title: "Bang!",
    slug: "bang",
    image: `${HOST}/images/bang.png`,
    description:
      "Play on a player at an available distance. He loses 1 unit of health if he fails to cancel the hit.",
    suit: CardSuitEnum.HEARTS,
    rank: CardRankEnum.KING,
    type: CardTypeEnum.ONETIME,
    target: CardTargetEnum.ONE,
    cardAction: CardActionEnum.DAMAGE,
    cardBlockers: [missCard],
    actionAmount: 1,
    blockAmount: 1,
    distance: 1,
  }),
];

export async function seedCards() {
  cards.map(async (card, index) => {
    await card.save();

    if (index === cards.length - 1) {
      console.log("seedCards DONE!");
    }
  });
}
