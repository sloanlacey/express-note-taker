// const db = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

// let id = generateUniqueId({
//     length: 10,
//     useLetters: false,
//     useNumbers: true
// });

require('./html-routes.js');

module.exports = app => {
// create notes var
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
     
        let notes = JSON.parse(data);

        // API routes

        // get route for /api/notes
        app.get('/api/notes', function (req, res) {
            res.json(notes);
        })
        // /api/notes post route
        app.post('/api/notes', function (req, res) {

            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: generateUniqueId({
                    length: 10,
                    useLetters: true,
                    useNumbers: true
                })
            };
            notes.push(newNote);
            updateNotesData(notes);
            res.json(notes);
            return console.log(`A new note has been added: ${newNote.title}`);
        })
        // get note with unique id
        app.get('/api/notes/:id', function (req, res) {
            res.json(notes[req.params.id]);
        })
        // delete a note with unique id
        app.delete('/api/notes/:id', function (req, res) {
            notes.splice(req.params.id, 1);
            updateNotesData(notes);
            res.json(notes);
            console.log(`Note with ID of ${req.params.id} has been deleted.`);
        })

    })

// update json file when notes are added or deleted
function updateNotesData(notes) {
    fs.writeFile('db/db.json', JSON.stringify(notes,'\t'), err => {
        if (err) throw err;
        return true;
    })
};

};