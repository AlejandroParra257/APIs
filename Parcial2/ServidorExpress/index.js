const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/parcial2', (req, res) => {
    res.json({
        mensaje: "Servidor Express funcionando - Parcial 2",
        materia: "APIs",
        estudiante: "Alejandro Parra"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});