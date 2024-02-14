import { HOST } from '../config';
import CharacterModel from '../models/Character/character.model';

const characters = [
  new CharacterModel({
    name: 'Default character',
    health: 4,
    image: `${HOST}/images/default-character.png`,
  }),
];

export async function seedCharacters() {
  characters.map(async (character, index) => {
    await character.save();

    if (index === characters.length - 1) {
      console.log('seedCharacters DONE!');
    }
  });
}
