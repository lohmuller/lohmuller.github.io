import Command, { CommandProps, SetOutputValueFunction, TerminalInterface } from "./Command"


export class HelpCmd extends Command {

    static cmd: string = "help";
    static description: string = "Description for help command";

    public action() {
        let mapCommands = new Map<string, string>();
        for (let index in this.terminal.cmds) {
            const cmdClass = this.terminal.cmds[index];
            mapCommands.set(cmdClass.cmd, cmdClass.description);
        };

        let maxLength = 'Command'.length;
        mapCommands.forEach((_, key) => {
            if (key.length > maxLength) {
                maxLength = key.length;
            }
        });

        let output: Array<string> = [];
        output.push(` ${'Command'.padEnd(maxLength)} \t${'Description'}`);
        output.push('');
        mapCommands.forEach((value, key) => {
            output.push(` ${key.padEnd(maxLength)} \t${value} `);
        });

        this.println(output.join("\n"));
    }
}