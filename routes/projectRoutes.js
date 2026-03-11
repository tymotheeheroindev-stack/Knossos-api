const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Route pour AJOUTER un projet
router.post('/add', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: err });
  }
});

// Route pour RECUPERER tous les projets
router.get('/all', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour SUPPRIMER (déjà prévue normalement)
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Projet supprimé" });
});

// Route pour MODIFIER
router.put('/:id', async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProject);
});

module.exports = router;