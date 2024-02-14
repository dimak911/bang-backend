import { Schema, model } from "mongoose";
import { CardTypeEnum } from "../common/enums/card-type.enum";

const cardSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  suit: { type: String, required: true },
  rank: { type: String, required: true },
  type: { type: CardTypeEnum, required: true },
});

const Card = model("Card", cardSchema);

export default Card;

// {
//   "title": "Bang!",
//   "image": "path/to/image",
//   "description": "description",
//   "suit": "hearts",
//   "rank": "K",
//   "type": "onetime",
//   "target": "one",
//   "cardAction": "damage",
//   "cardBlockers": [2, 1],
//   "amountActions": 1,
//   "amountBlockers": 1,
//   "distance": 1
// }
