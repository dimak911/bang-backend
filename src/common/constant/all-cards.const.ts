import { CardRankEnum } from '../enums/card/card-rank.enum';
import { CardSuitEnum } from '../enums/card/card-suit.enum';

const suits = Object.values(CardSuitEnum);
const ranks = Object.values(CardRankEnum);

const allCardsConst: { rank: CardRankEnum; suit: CardSuitEnum }[] = [];

suits.forEach((suit) => {
  ranks.forEach((rank) => {
    allCardsConst.push({ suit, rank });
  });
});

export default allCardsConst;
