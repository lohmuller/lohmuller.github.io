export interface AbstractCommandProps {
    cmd: string;
    description: string;
}

export interface TerminalInterface {
    showPrompt: boolean;
    setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    setOutputValue: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
    println: (content: string | JSX.Element, newline?: boolean) => void;
    cmds: typeof Command[];
    cmdList: { [key: string]: typeof Command };
    currentCmd: null | Command;
    parameters: string;
    fullcmd: string;
    username: string;
    history: string[];
    currentPath: string;
    workDir: string;
}

export interface CommandProps {
    terminal: TerminalInterface;
}

export type SetOutputValueFunction = React.Dispatch<React.SetStateAction<string>>;

abstract class Command {

    protected terminal: TerminalInterface;
    protected inputs: Array<string> = [];

    static cmd: string = "";
    static description: string = "";

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

    public async run(_parameters?: string): Promise<void> {
        await this.action(_parameters);
        this.terminal.currentCmd = null;
        this.terminal.setShowPrompt(true);
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

export default Command