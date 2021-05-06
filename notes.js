const fs = require('fs');
const chalk = require('chalk');
const { array } = require('yargs');


const addNote = (title, body) => {
    const notes = loadNotes();

    const dupeNote = notes.find((note) => note.title === title)

    if(!dupeNote) {
        notes.push({
            title: title,
            body: body
        });        
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    } else {
        console.log(chalk.red.inverse('Duplicate note not added'));
    }

}

const saveNotes = (aryNotes) => {
    const data = JSON.stringify(aryNotes);
    fs.writeFileSync('notes.json', data);
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
    
}


const listNotes = () => {
    console.clear();
    const notes = loadNotes();

    if(notes.length !== 0) {
        console.log(chalk.blue.inverse(' -= YOUR NOTES =- '));
        notes.forEach(note => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.red.inverse('No Notes Found'));
    }
}


const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note)  {
        console.log(chalk.green.inverse(note.title), note.body)
    } else {
        console.log(chalk.red.inverse('Not Found!'));
    }
}



const removeNote = (title) => {
    const notes = loadNotes();
    const noteIdx = notes.findIndex((note) => note.title === title);
    
    if (noteIdx !== -1) {
        notes.splice(noteIdx,1)
        saveNotes(notes);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}