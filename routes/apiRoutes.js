// Adding express  and db requirements
const router = require('express').Router();
const store = require('../db/store');

// This function will retrieve all current notes
router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// This will add the note to the db and respond within the terminal, stating the data entered
router.post('/notes', (req, res) => {
    console.log("ADDED a note with the following contents:")
    console.log(req.body)
    
    store
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// This will delete a note and post the deleted note's uuid within the terminal
router.delete('/notes/:id', (req, res) => {
    console.log("DELETED a note with the following UUID:")
    console.log(req.params)
    
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;

