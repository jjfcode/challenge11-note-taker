const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {

        if (err) {
            res.status(500).json(err)
        }

        const notes = JSON.parse(data)

        res.json(notes)
    })
});

// Post request reference week 11 mini project in routes->tips.js
router.post('/', (req, res)=>{
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        const newRouter = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newRouter, './db/db.json');
        res.json('New Note added successfully');
    } else {
        res.error('Error in adding a Note');
    } 
});


module.exports = router;