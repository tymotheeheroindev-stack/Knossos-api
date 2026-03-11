const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Configuration initiale
dotenv.config();
const app = express();

// 2. Middlewares de sécurité et de parsing
app.use(express.json()); 

// Configuration CORS (Nettoyée pour éviter l'erreur PathError)
const corsOptions = {
  origin: ["https://mon-portfolio-l2vk.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// 3. Connexion MongoDB Atlas
// On utilise les options recommandées pour une connexion stable sur le Cloud
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie ! ✨"))
  .catch((err) => console.log("Échec de connexion MongoDB :", err));

// 4. Routes de l'API
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Route de base (Santé de l'API)
app.get('/', (req, res) => {
  res.send("L'API Knossos est opérationnelle ! 🚀");
});

// Route Login Admin sécurisée
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Comparaison avec la variable d'environnement définie sur Render
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true, message: "Authentifié avec succès !" });
  } else {
    res.status(401).json({ success: false, message: "Accès refusé" });
  }
});

// 5. Lancement du serveur
// Render utilise process.env.PORT, en local on garde 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur actif et prêt sur le port : ${PORT}`);
});