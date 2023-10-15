import Command, { CommandProps, SetOutputValueFunction, TerminalInterface } from "./Command"


export class DateCmd extends Command {

    static cmd: string = "date";
    static description: string = "Date Description";

    public action() {
        this.println("" + new Date());
    }
}