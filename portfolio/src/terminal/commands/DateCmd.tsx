import Command, { CommandProps, SetOutputValueFunction, TerminalInterface } from "./Command"


export class DateCmd extends Command {

    static cmd: string = "date";
    static description: string = "Date Description";

    async action(): Promise<void> {
        this.println("" + new Date());
    }
}