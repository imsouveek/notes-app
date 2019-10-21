import * as yargs from 'yargs';
import * as readline from 'readline';
import chalk from 'chalk';
import { Console } from 'console';
import {
  addCommand,
  removeCommand,
  listCommand,
  readCommand,
  clearCommand,
  exitCommand,
} from './commands';

class App {
  /* This is the code entry point */
  public static start(): void {
    App.attachCommands();
    App.startShell();
  }

  /* Method to exit - public so commands can use */
  public static exitProgram() {
    /* Say bye */
    App.showPrompt(console, chalk.green('\nBye'));
    process.exit(0);
  }

  /* Method to show prompt only if command is invoked on terminal */
  private static showPrompt(rl: readline.Interface | Console, msg?: string) {
    if (process.stdin.isTTY && process.stdout.isTTY) {
      if (rl instanceof readline.Interface) {
        rl.prompt();
      } else if (rl instanceof Console) {
        console.log(msg);
      }
    }
  }

  /* Static method to setup parser */
  private static attachCommands() {
    /* Attach the command definitions to the parser */
    yargs.command(addCommand);
    yargs.command(removeCommand);
    yargs.command(readCommand);
    yargs.command(listCommand);
    yargs.command(clearCommand);
    yargs.command(exitCommand);

    /* Use strict parsing, but don't allow yargs to exit */
    yargs.strict();
    yargs.exitProcess(false);
  }

  /* Start interactive shell */
  private static startShell() {
    /* Setup read stream */
    const rl: readline.Interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.yellow('NOTES-APP > '),
    });

    /* Show prompt */
    App.showPrompt(rl);

    rl.on('line', (input) => {
      /* Received line data */

      /* Parse line with yargs. Note that without callback, program can do one of two things:-
        1. Crash completely
        2. Reject valid commands also (when using any combination of yargs.fail() and try .. catch)
      */
      yargs.parse(input, (err: any, argv: any, output: string) => {
        /*
          Output is set when there are unknown commands or missing options. It is not set when a
          andler is called
        */
        if (output) {
          console.log(`${output}`);
        }
      });

      /* Previous line processed - show prompt again */
      App.showPrompt(rl);
    }).on('close', () => {
      /* Received end of input. Say bye */
      App.exitProgram();
    });
  }
}

/* Export the app so exitProgram can be used in commands */
export default App;

/* Start the program */
App.start();
