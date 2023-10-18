import Command from "./AbstractCommand"


export class HistoryCmd extends Command {

    static cmd: string = "history";
    static description: string = "Description for help command";

    public async action(): Promise<void> {

        if (command.toLowerCase().trim() === ('history')) {
            history.forEach((value, index) => {
                output += ` ${index} \t\t ${value} \n`;
            });
            setOutputValue(prevState => prevState + output);
            return;
        }
        if (command.toLowerCase().trim() === ('clear history')) {
            setHistory([]);
            output += ` History cleared\n`;
            setOutputValue(prevState => prevState + output);
            return;
        }

        this.println(output.join("\n"));
    }
}