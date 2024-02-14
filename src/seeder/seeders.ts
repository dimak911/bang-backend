import { seedCards } from './seedCards';
import { seedCharacters } from './seedCharacters';

interface Seeder {
  collectionName: string;
  seeder: () => Promise<void>;
}

export const seeders: Seeder[] = [
  {
    collectionName: 'cards',
    seeder: seedCards,
  },
  {
    collectionName: 'characters',
    seeder: seedCharacters,
  },
];
