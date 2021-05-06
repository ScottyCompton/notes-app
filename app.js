const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customize yargs version
yargs.version('1.1.0');

//add, remove, read, list

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note details',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})


yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Remove a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})



yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Find a particular note',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})


yargs.command({
    command: 'list',
    describe: 'Listing out all the notes',
    handler() {
        notes.listNotes();
    }
})


yargs.parse();