/* eslint-disable class-methods-use-this */
import { CommandModule } from 'yargs';
import NoteUtils from '../NoteUtils';

export default class List implements CommandModule {
  public command: string = 'list';

  public describe: string = 'List all notes';

  public handler(): void {
    NoteUtils.listNotes();
  }
}
