const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: { type: [String], required: true }, // Ex: ["React", "Node"]
  githubLink: { type: String, default: "#" },
  demoLink: { type: String, default: "#" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);