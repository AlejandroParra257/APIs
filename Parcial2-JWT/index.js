const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const LLAVE_SECRETA = "clave_maestra_parcial2";

// Ruta para generar el Token (Login)
app.post('/login', (req, res) => {
    const { username } = req.body;
    
    // El profesor mencionó que el token suele llevar datos del usuario
    const user = { nombre: username, rol: "estante" };

    // Firmar el token (Vence en 10 minutos)
    const token = jwt.sign(user, LLAVE_SECRETA, { expiresIn: '10m' });
    
    res.json({
        mensaje: "Autenticación exitosa",
        token: token
    });
});

// Middleware de verificación (como se mostró en la clase)
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    jwt.verify(token, LLAVE_SECRETA, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensaje: "Token inválido o expirado" });
        }
        req.user = decoded;
        next(); // Continuar a la ruta protegida
    });
};

// Ruta Protegida
app.get('/sistema', verificarToken, (req, res) => {
    res.json({
        mensaje: "Bienvenido al sistema protegido",
        datos_usuario: req.user
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor JWT ejecutándose en http://localhost:${PORT}`);
});