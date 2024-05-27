import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour la page de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Remplacer par une logique d'authentification réelle
    if (username === 'admin' && password === 'password') {
        res.status(200).send('Connexion réussie!');
    } else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});

// Route pour lister les fichiers dans un répertoire spécifique
app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, '..', '..', 'front', 'public'); // Spécifiez le répertoire à lister

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            res.status(500).send('Unable to scan directory: ' + err);
            return;
        }
        res.status(200).json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
