const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../../helpers/fsUtils');

router.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {

        if (err) {
            res.status(500).json(err)
        }

        const notes = JSON.parse(data)

        res.json(notes)
    })
});

// Post request
router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newRouter = {
            title,
            text,
            id: uuidv4(),
        };
        const parsedData = readAndAppend(newRouter, './db/db.json');
        res.json(parsedData);
    } else {
        res.json('Error in adding a Note');
    }
});

// DELETE request
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((ids) => ids.id !== id);

            writeToFile('./db/db.json', result);

            res.json(`Item ${id} has been deleted 🗑️`);
        });
});


module.exports = router;