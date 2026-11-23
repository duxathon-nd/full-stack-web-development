import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pokemon from './models/pokemon.js';

dotenv.config();

const pokemon = [
  {
    name: 'Dragon Pokemon',
    type: 'Fire',
    rarity: 'rare',
    description: 'A mythical creature that expells fire.',
  },
  {
    name: 'Unicorn Pokemon',
    type: 'Earth',
    rarity: 'rare',
    description: 'A legendary creature with a single horn at its center.',
  },
  {
    name: 'Phoenix Pokemon',
    type: 'Fire',
    rarity: 'rare',
    description: 'A mythical creature that regenerates from its ashes.',
  },
];

try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pokemonDB');
    await pokemon.deleteMany({});
    await pokemon.insertMany(pokemon);
    console.log('Database seeded successfully!');
} catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
}finally {
    await mongoose.disconnect();
}