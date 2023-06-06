const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
//const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());




app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = Math.floor(Math.random() * 5000);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
            res.json(newNote);
        });
    });
});

app.delete('./api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== parseInt(req.params.id));
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err, data) => {
            res.json({ msg: 'successful' });
        });
    });
});



app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.get('/api/notes/:id', (req, res) => {
    res.json(notes[req.params.id]);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});