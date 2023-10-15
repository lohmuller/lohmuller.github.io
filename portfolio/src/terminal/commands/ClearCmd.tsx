import Command from "./Command"


export class ClearCmd extends Command {

    static cmd: string = "clear";
    static description: string = "Date Description";

    public action() {
        this.terminal.setOutputValue('');
    }
}