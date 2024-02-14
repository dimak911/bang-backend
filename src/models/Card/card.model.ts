import { Schema, model } from "mongoose";

import { ICard } from "./card.interface";

const cardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  suit: { type: String, required: true },
  rank: { type: String, required: true },
  type: { type: String, required: true },
  target: { type: String, required: true },
  cardAction: { type: String, required: true },
  cardBlockers: { type: [Schema.Types.ObjectId], ref: "Card" },
  actionAmount: { type: Number, required: true },
  blockAmount: { type: Number, required: true },
  distance: { type: Number, required: true },
});

const CardModel = model("Card", cardSchema);

export default CardModel;
