import Command from "./AbstractCommand"


export class ClearCmd extends Command {

    static cmd: string = "clear";
    static description: string = "Date Description";

    async action(): Promise<void> {
        this.terminal.setOutputValue([]);
    }
}