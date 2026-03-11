const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuration
dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); 

// Configuration CORS robuste pour Vercel + Localhost
app.use(cors({
  origin: ["https://mon-portfolio-l2vk.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Répondre aux requêtes "Preflight" (OPTIONS) pour éviter les erreurs CORS
app.options('*', cors());

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Connexion MongoDB
// On utilise process.env.MONGO_URI qui doit être configuré sur Render
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie ! ✨"))
  .catch((err) => console.log("Échec de connexion MongoDB :", err));

// Route de base pour tester
app.get('/', (req, res) => {
  res.send("L'API du Portfolio Knossos est en ligne ! 🚀");
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
// Render injecte automatiquement le PORT, sinon on utilise 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur actif sur le port : ${PORT}`);
});