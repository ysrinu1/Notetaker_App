// Add all required npm's
const util = require("util");
const fs = require("fs");
const uuid = require("uuid").v1;
// Sets variables for reading/writing to the db
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    // Method to read the db file
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    // Method to write to the db file
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    // Method that will inject the db with what's entered by the end user
    addNote(note) {
        const { title, text } = note
        // Warns the end user that they need a title AND text, in order to save their note
        if (!title || !text) {
            throw new Error("You must add a Title AND Note, before saving!")
        }
        // Writes the text into the DB when entered and saved correctly
        const newNote = { title, text, id: uuid() }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    // Method for reading and preparing the current list of notes, to the HTML file
    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }

    // Method for displaying the list of notes, following the removal (deletion) of a note
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Store();