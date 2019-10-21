/* eslint-disable class-methods-use-this */
import { CommandModule, Argv } from 'yargs';
import NoteUtils from '../NoteUtils';

export default class Remove implements CommandModule {
  public command: string = 'remove <title>';

  public describe: string = 'Remove a note';

  public static builder(yargs: Argv): Argv {
    return yargs
      .positional('title', {
        describe: 'Note title',
        type: 'string',
      });
  }

  public handler(argv: any): void {
    NoteUtils.removeNote(argv.title);
  }
}
