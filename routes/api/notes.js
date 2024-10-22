const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../../helpers/fsUtils');

// GET request to retrieve all notes
router.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {

        if (err) {
            // Respond with error if read fails
            res.status(500).json(err)
        }
        // Parse and send notes data as JSON
        const notes = JSON.parse(data)

        res.json(notes)
    })
});

// POST request to add a new note
router.post('/', (req, res) => {
    console.log(req.body);
    // Create a new note object with a unique ID
    const { title, text } = req.body;

    if (req.body) {
        const newRouter = {
            title,
            text,
            id: uuidv4(),
        };
        // Append the new note to the file
        const parsedData = readAndAppend(newRouter, './db/db.json');
        res.json(parsedData);
    } else {
        // Respond with an error message if note data is missing
        res.json('Error in adding a Note');
    }
});

// DELETE request to remove a note by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Filter out the note with the specified ID
            const result = json.filter((ids) => ids.id !== id);
            // Write the updated data back to the file
            writeToFile('./db/db.json', result);
            // Respond with a confirmation message
            res.json(`Item ${id} has been deleted 🗑️`);
        });
});


module.exports = router;