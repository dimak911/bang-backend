import CardModel from '../models/Card/card.model';
import { ICard } from '../models/Card/card.interface';
import { shuffle } from './shuffle.util';
import deckCardsAmountConst from '../common/constant/deck-cards-amount.const';
import allCardsConst from '../common/constant/all-cards.const';

function generateUniqueCards(card: ICard, numCards: number): ICard[] {
  const shuffledAllCards = shuffle(allCardsConst);
  const cards: ICard[] = [];

  const cardForDeck = {
    _id: card._id,
    title: card.title,
    slug: card.slug,
    image: card.image,
    description: card.description,
    type: card.type,
    target: card.target,
    cardAction: card.cardAction,
    cardBlockers: card.cardBlockers,
    actionAmount: card.actionAmount,
    blockAmount: card.blockAmount,
    distance: card.distance,
  };

  for (let i = 0; i < numCards; i++) {
    cards.push({
      ...cardForDeck,
      suit: shuffledAllCards[i].suit,
      rank: shuffledAllCards[i].rank,
    });
  }

  return cards;
}

export default async function getDeckUtil() {
  const cards = await CardModel.find().exec();
  const deck: ICard[] = [];

  cards.map((card) => {
    deck.push(...generateUniqueCards(card, deckCardsAmountConst[card.slug]));
  });

  return shuffle(deck);
}
