import express from 'express';
import mongoose from 'mongoose';
import Plant from '../models/Plants.js';

const router = express.Router();

// GET all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new plant
router.post('/', async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    height: req.body.height,
    season: req.body.season,
    rarity: req.body.rarity,
    description: req.body.description,
  });

  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a plant by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(updatedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a plant by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;