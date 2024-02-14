import { Schema, model } from "mongoose";

import { ICharacter } from "./character.interface";

const characterSchema = new Schema<ICharacter>({
  name: { type: String, required: true },
  health: { type: Number, required: true },
  image: { type: String, required: true },
  userName: String,
});

const CharacterModel = model("Character", characterSchema);

export default CharacterModel;
