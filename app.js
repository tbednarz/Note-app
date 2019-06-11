const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const notesUtilities = require("./notes.js");

// Customize yargs version
yargs.version("1.2.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notesUtilities.addNote(argv.title, argv.body);
  }
});

//create remove command

yargs.command({
  command: "remove",
  describe: "remove a not",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notesUtilities.removeNote(argv.title);
  }
});
// Create list command

yargs.command({
  command: "list",
  describe: "lists notes",
  handler() {
    notesUtilities.listNotes();
  }
});
// create read command

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "note Title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notesUtilities.readNote(argv.title);
  }
});
// add, remove, read, list

yargs.parse();
