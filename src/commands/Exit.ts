/* eslint-disable class-methods-use-this */
import { CommandModule } from 'yargs';
import App from '../app';

export default class Exit implements CommandModule {
  public command: string = 'exit';

  public aliases: string = 'bye';

  public describe: string = 'Exit the program';

  public handler(): void {
    App.exitProgram();
  }
}
