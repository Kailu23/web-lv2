const express = require('express');
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs")
app.use(express.static('public')); // "posluzuje" index.html

// Automatski koristi sve iz mape public
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get('/slike', (req, res) => {
    const dataPath = path.join(__dirname, 'images.json');
    const images = JSON.parse(fs.readFileSync(dataPath));

    images.forEach((image, i) => {
        image.id = `slika${i + 1}`;
    });

    res.render('slike', { images });
});

app.listen(PORT, () => {
    console.log("Server pokrenut na portu ${PORT}");
});
