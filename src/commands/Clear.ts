/* eslint-disable class-methods-use-this */
export default class clear {
  public command: string = 'clear';

  public describe: string = 'Clear the screen';

  public handler(): void {
    console.clear();
  }
}
