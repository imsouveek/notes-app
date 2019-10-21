/* eslint-disable class-methods-use-this */
import { CommandModule, Argv } from 'yargs';
import NoteUtils from '../NoteUtils';

export default class Add implements CommandModule {
  public command: string = 'add <title> <body>';

  public describe: string = 'Add a note'

  public static builder(yargs: Argv): Argv {
    return yargs
      .positional('title', {
        describe: 'Note title',
        type: 'string',
      })
      .positional('body', {
        describe: 'Node body',
        type: 'string',
      });
  }

  public handler(argv: any): void {
    NoteUtils.addNote(argv.title, argv.body);
  }
}
