export interface AbstractCommandProps {
    cmd: string;
    description: string;
}

export interface TerminalInterface {
    setOutputValue: React.Dispatch<React.SetStateAction<string>>;
    cmds: typeof Command[];
    cmdList: { [key: string]: typeof Command };
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

    static cmd: string = "";
    static description: string = "";

    constructor(terminal: TerminalInterface) {
        this.terminal = terminal;
    }

    public action(_parameters?: string): void {
        this.println("ERROR: Command \"" + this.terminal.fullcmd + "\" with no action!");
    }

    public println(text: string): void {
        this.terminal.setOutputValue((prevState: string) => prevState + text + "\n");
    }

}

export default Command