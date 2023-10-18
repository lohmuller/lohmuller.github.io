import { TerminalInterface } from "../Terminal"

export interface CommandProps {
    terminal: TerminalInterface;
}

export type SetOutputValueFunction = React.Dispatch<React.SetStateAction<string>>;

abstract class AbstractCommand {

    protected terminal: TerminalInterface;
    protected inputs: Array<string> = [];

    static cmd: string = "";
    static description: string = "";
    static help: string = "xabla";
    static validParameters: Array<string> = []; //@TODO

    constructor(terminal: TerminalInterface) {
        this.terminal = terminal;
    }

    private promptResolve: ((value: string) => void) | (() => void) | undefined;

    public async prompt(prompt: string): Promise<void> {
        this.println(prompt);
        return new Promise<void>((resolve) => {
            this.promptResolve = resolve;
        });
    }

    public async action(_parameters?: string): Promise<void> {
        this.println("ERROR: Command \"" + this.terminal.fullcmd + "\" with no action!");
    }

    public async run(_parameters: string = ""): Promise<void> {

        const cmdClass = this.terminal.cmdList[this.terminal.cmd];

        if (["-h", "--help", "?"].includes(_parameters)) {
            this.println(cmdClass.help);
        } else {
            console.log("await!");
            await this.action(_parameters);
            console.log("nao waitou");
        }
        this.terminal.currentCmd = null;
        //this.terminal.setShowPrompt(true);
    }

    public newInput(text: string): void {
        this.println(text);
        if (this.promptResolve !== undefined)
            this.promptResolve(text);
    }

    public println(content: string | JSX.Element, newline: boolean = true): void {
        this.terminal.println(content, newline);
    }

}

export default AbstractCommand