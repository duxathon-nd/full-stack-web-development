import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Creature from './models/Creature.js';

dotenv.config();

const plants = [
  {
    name: 'Dragon Plant',
    height: 'Large',
    season: 'Autumn',
    rarity: 'rare',
    description: 'A mythical plant that expells fire.',
  },
  {
    name: 'Unicorn Plant',
    height: 'Medium',
    season: 'Spring',
    rarity: 'rare',
    description: 'A legendary plant with a single horn at its center.',
  },
  {
    name: 'Phoenix Plant',
    height: 'Small',
    season: 'Summer',
    rarity: 'rare',
    description: 'A mythical plant that regenerates from its ashes.',
  },
];

try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/plantDB');
    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log('Database seeded successfully!');
} catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
}finally {
    await mongoose.disconnect();
}