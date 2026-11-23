import express from 'express';
import mongoose from 'mongoose';
import pokemon from '../models/Pokemon.js';

const router = express.Router();

// GET all pokemon
router.get('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single pokemon by ID
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new pokemon
router.post('/', async (req, res) => {
  const pokemon = new Pokemon({
    name: req.body.name,
    type: req.body.type,
    season: req.body.season,
    rarity: req.body.rarity,
    description: req.body.description,
  });

  try {
    const newPokemon = await pokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a pokemon by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a pokemon by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json({ message: 'Pokemon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;