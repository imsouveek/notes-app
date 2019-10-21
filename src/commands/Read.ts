/* eslint-disable class-methods-use-this */
import { CommandModule, Argv } from 'yargs';
import NoteUtils from '../NoteUtils';

export default class Read implements CommandModule {
  public command: string = 'read <title>';

  public describe: string = 'Read a note';

  public static builder(yargs: Argv): any {
    yargs
      .positional('title', {
        describe: 'Note title',
        type: 'string',
      });
  }

  public handler(argv: any): void {
    NoteUtils.readNote(argv.title);
  }
}
