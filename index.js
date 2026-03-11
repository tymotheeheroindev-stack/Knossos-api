const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuration
dotenv.config();
const app = express();

// Middlewares
// On autorise localhost pour tes tests et ta future URL Vercel
app.use(cors({
  origin: ["https://mon-portfolio-l2vk.vercel.app", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json()); 

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie ! ✨"))
  .catch((err) => console.log("Échec de connexion MongoDB :", err));

// Route de base pour tester
app.get('/', (req, res) => {
  res.send("L'API du Portfolio tourne à plein régime ! 🚀");
});

// Route Login Admin
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true, message: "Authentifié !" });
  } else {
    res.status(401).json({ success: false, message: "Mot de passe incorrect" });
  }
});

// Lancement du serveur
// IMPORTANT : On enlève 'localhost' du listen pour que Render puisse l'exposer sur le web
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur actif sur le port : ${PORT}`);
});