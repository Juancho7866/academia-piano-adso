const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express(); 

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// 1. RUTA PARA VER TODOS LOS CURSOS (CORREGIDA)
app.get('/cursos', async (req, res) => {
    try {
        // Aquí debe ser SELECT * FROM cursos
        const [rows] = await db.query('SELECT * FROM cursos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los cursos", detalle: error.message });
    } 
});

// 2. RUTA PARA LECCIONES ESPECÍFICAS (CORREGIDA LA "S")
app.get('/lecciones/:cursoId', async (req, res) => {
    const { cursoId } = req.params;
    try {
        // Agregamos la 's' a cursos_id para que coincida con tu DB
        const [rows] = await db.query('SELECT * FROM lecciones WHERE cursos_id = ?', [cursoId]);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener lecciones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Configuración de Multer
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 3. RUTA PARA SUBIR VIDEO (CORREGIDA TOTALMENTE)
app.post('/subir-video', upload.single('videoPiano'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send(" Error: No se seleccionó ningún video.");
    }

    // EXTRAER LOS DATOS DEL FORMULARIO (Esto te faltaba)
    const { cursos_id, titulo_video } = req.body; 
    const url_video = `/uploads/${req.file.filename}`;

    try {
        // Usamos cursos_id con 's' como está en tu captura de MySQL
        await db.query(
            'INSERT INTO lecciones (cursos_id, titulo, video_url) VALUES (?, ?, ?)',
            [cursos_id, titulo_video, url_video]
        );
        res.send("🎬 Video subido y registrado con éxito");
    } catch (error) {
        console.error("Fallo en el INSERT:", error);
        res.status(500).send("Error en la base de datos: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n Servidor corriendo con éxito en http://localhost:${PORT}\n`);
});


