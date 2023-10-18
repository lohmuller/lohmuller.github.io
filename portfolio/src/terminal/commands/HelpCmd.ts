import Command from "./AbstractCommand"


export class HelpCmd extends Command {

    static cmd: string = "help";
    static description: string = "Description for help command";
    static help: string = "Oi sou dollynho";

    public async action(): Promise<void> {
        let mapCommands = new Map<string, string>();
        console.log(this.terminal.cmdList);
        for (let index in this.terminal.cmdList) {
            const cmdClass = this.terminal.cmdList[index];
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