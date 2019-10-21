import * as fs from 'fs';
import chalk from 'chalk';

class NoteUtils {
  private notesPath: string = './data/notes.json';

  /* Read all notes from a file */
  private loadNotes(): Array<{title: string, body: string}> {
    console.log(`${chalk.blue('Processing ')}: Loading all notes`);

    try {
      /* Try to load notes.json file. If loaded, parse data and return */
      const notesJSON = fs.readFileSync(this.notesPath).toString();
      return JSON.parse(notesJSON);
    } catch (err) {
      /* notes.json not found - return blank array */
      console.log(`${chalk.blue('Processing ')}: No file found. Will create a new one when a note is added`);
      return [];
    }
  }

  /* Function to save changes to notes.json file */
  private saveNotes(notes: Array<{title: string, body: string}>): void {
    /* Replace notes.json file with contents of new notes */
    console.log(`${chalk.blue('Processing ')}: Save notes`);
    fs.writeFileSync(this.notesPath, JSON.stringify(notes));
  }

  /* Add note after duplicate title check */
  public addNote(title: string, body: string): void {
    /* Log input parameters */
    console.log(`${chalk.green.bold.inverse('Title ')}: ${title}`);
    console.log(`${chalk.bold('Body  ')}: ${body}`);

    /* Load all notes from file */
    const notes = this.loadNotes();

    /* Dup check */
    if (notes.findIndex((note) => note.title === title) < 0) {
      /* Not duplicate - save note */
      notes.push({ title, body });
      this.saveNotes(notes);
    } else {
      /* Note not found error */
      console.log(`${chalk.red.bold.inverse('Error ')}: Note with title ${title} already exists!`);
    }
  }

  /* Remove note by searching title */
  public removeNote(title: string): void {
    /* Log input parameters */
    console.log(`${chalk.green.bold.inverse('Title ')}: ${title}`);

    /* Load all notes from file */
    const notes = this.loadNotes();

    /* Find note */
    const itemLoc = notes.findIndex((note) => note.title === title);

    if (itemLoc >= 0) {
      /* Note found - remove from json and save */
      console.log(`${chalk.blue('Processing ')}: Note found at location ${itemLoc}. Removing`);
      notes.splice(itemLoc, 1);
      this.saveNotes(notes);
    } else {
      /* Note not found error */
      console.log(`${chalk.red.bold.inverse('Error ')}: Note with title ${title} not found!`);
    }
  }

  /* Function to read notes */
  public readNote(title: string): void {
    /* Log input parameters */
    console.log(`${chalk.green.bold.inverse('Title ')}: ${title}`);

    /* Find note in file */
    const note = this.loadNotes().find((item) => item.title === title);

    if (note) {
      /* Note found - print it */
      console.log(`${chalk.blue('Title ')}: ${note.title}`);
      console.log(`${chalk.bold('Body  ')}: ${note.body}`);
    } else {
      /* Note not found error */
      console.log(`${chalk.red.bold.inverse('Error ')}: Note with title ${title} not found!`);
    }
  }

  // Method to list all note titles
  public listNotes(): void {
    console.log('Listing all notes');

    const notes = this.loadNotes();

    /* Print all note titles if there are notes, else throw error */
    if (notes.length > 0) {
      notes.forEach((note) => {
        console.log(note.title);
      });
    } else {
      console.log(`${chalk.red.bold.inverse('Error ')}: No notes saved. Add a note`);
    }
  }
}

export default new NoteUtils();
