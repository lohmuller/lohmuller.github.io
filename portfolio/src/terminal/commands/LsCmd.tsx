import Command, { CommandProps, SetOutputValueFunction, TerminalInterface } from "./Command"


export class LsCmd extends Command {

    static cmd: string = "ls";
    static description: string = "Date Description";

    public action() {
        console.log("xablau");
    }
}