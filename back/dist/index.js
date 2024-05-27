"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Route pour la page de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Remplacer par une logique d'authentification réelle
    if (username === 'admin' && password === 'password') {
        res.status(200).send('Connexion réussie!');
    }
    else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});
// Route pour lister les fichiers dans un répertoire spécifique
app.get('/files', (req, res) => {
    const directoryPath = path_1.default.join(__dirname, '..', '..', 'front', 'public'); // Spécifiez le répertoire à lister
    fs_1.default.readdir(directoryPath, (err, files) => {
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
