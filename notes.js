const chalk = require("chalk");
const fs = require("fs");

const readNote = title => {
  const notes = loadNotes();
  const matchingNote = notes.find(note => note.title === title);
  if (matchingNote) {
    console.log(chalk.inverse(matchingNote.title) + "\n" + matchingNote.body);
  } else {
    console.log(chalk.red("no note found"));
  }
};

const addNote = (title, body) => {
  // const duplicateNotes = notes.filter((note) => note.title ===title)

  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note Title Taken"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const matchingNote = notes.filter(note => note.title != title);

  if (matchingNote.length < notes.length) {
    saveNotes(matchingNote);
    console.log(chalk.green.inverse.bold("note removed"));
  } else {
    console.log(chalk.red.inverse.bold("no note removed"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse("Your Notes: "));

  notes.forEach(note => {
    console.log(chalk.green(note.title + "\n" + note.body));
  });
};

module.exports = {
  addNote: addNote,
  saveNotes: saveNotes,
  loadNotes: loadNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
