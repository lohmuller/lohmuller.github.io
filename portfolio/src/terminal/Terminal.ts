/**
 * Based on https://github.com/abderox
 */
import React, { useRef } from "react";

//Commands
import { HelpCmd } from "./commands/HelpCmd";
import { DateCmd } from "./commands/DateCmd";
import Command from "./commands/AbstractCommand";
import { LsCmd } from "./commands/LsCmd";
import { ClearCmd } from "./commands/ClearCmd";
import { WhoAmICmd } from "./commands/WhoAmICmd";
import AbstractCommand from "./commands/AbstractCommand";

interface TerminalProps {
    username: string;
    canResize?: boolean;
    canMaxMin?: boolean;
    handleClose?: () => void;
    rebootTerminal?: () => void;
    println: (content: JSX.Element | string, newline?: boolean) => void;
    setOutputValue: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export interface TerminalInterface {
    showPrompt: boolean;
    //setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    setOutputValue: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
    println: (content: string | JSX.Element, newline?: boolean) => void;
    cmds: typeof AbstractCommand[];
    cmdList: { [key: string]: typeof AbstractCommand };
    currentCmd: null | AbstractCommand;
    parameters: string;
    fullcmd: string;
    cmd: string;
    username: string;
    history: string[];
    currentPath: string;
    workDir: string;
}

class Terminal {


    //Default settings
    public terminal: Terminal;
    public title: string = "";
    public username: string;
    public currentHost: string;
    public workdir: string = "";
    //    public setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;
    public setOutputValue: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
    public cmds: typeof AbstractCommand[] = [];
    public cmdList: { [key: string]: typeof AbstractCommand } = {};
    public currentCmd: null | AbstractCommand;
    public parameters: string;
    public fullcmd: string;
    public cmd: string;
    public history: string[];
    public currentPath: string;
    public workDir: string;
    public importedCmdClasses: typeof Command[];
    public lastLogin: Date;
    public historyIndex: number = 0;
    public println;

    constructor({ username, println, setOutputValue }: TerminalProps) {

        // New commands you should add here
        this.importedCmdClasses = [
            HelpCmd,
            DateCmd,
            LsCmd,
            ClearCmd,
            WhoAmICmd
        ];

        this.importedCmdClasses.forEach((CommandClass: typeof Command) => {
            this.cmdList[CommandClass.cmd] = CommandClass;
        });

        //const [history, setHistory] = React.useState<string[]>([]);
        //const [terminal, setterminal] = React.useState<Terminal>(this);

        this.println = println;
        this.setOutputValue = setOutputValue;
        //this.setShowPrompt = () => { }; // Provide a default setter function
        this.cmds = [];


        const [currentCmd, setCurrentCmd] = React.useState(null);
        // this.setCurrentCmd = setCurrentCmd;
        this.currentCmd = currentCmd;
        this.parameters = '';
        this.fullcmd = '';
        this.cmd = '';
        this.username = username;
        this.history = [];
        this.currentPath = '';
        this.workDir = '';
        this.currentHost = "localhost";
        this.lastLogin = new Date();
        this.terminal = this;

        //const [outputValue, setOutputValue] = React.useState<Array<JSX.Element>>([]);
        //const [lastLogin, setLastLogin] = React.useState(new Date());

        //const [historyIndex, setHistoryIndex] = React.useState<number>(0);

        //setOutputValue([])
        //setHistory([]);


        //let cmdList: { [key: string]: typeof Command } = {};


    };

    public init() {
        this.setOutputValue([]);
        this.println("Fedora 31 <WorkStation Edition>");
        this.println("Kernel 5.3.13-300.fx86_64");
        this.println(`Last Login: ${this.lastLogin}`);
        this.println("");
        this.println("Welcome to Terminal ! Type \"help\" to see the list of commands.");
    }

    /*
    * ? handle the command entered by the user
     */
    public handleCommand = (promptInput: string) => {

        //this.println(generatePromptElement(promptInput));
        promptInput = promptInput.trim();
        if (promptInput === '') {
            return;
        }

        console.log(this.currentCmd);
        if (this.currentCmd === null) {
            // If there is no command running

            let [command, parameters] = promptInput.split(' ');
            parameters = parameters?.trim() || "";
            if (!(command in this.cmdList)) {
                this.println(`Command not found: ${command}`);
                return;
            }
            this.fullcmd = promptInput;
            this.cmd = command;
            this.parameters = parameters;

            const commandClass = this.cmdList[command] as unknown as HelpCmd as Command as any;
            this.currentCmd = new commandClass(this);
            console.log(this.currentCmd);
            //terminal.setShowPrompt(false);
            if (this.currentCmd !== null) {
                console.log(this.currentCmd);
                this.currentCmd.run(parameters);
                console.log(this.currentCmd);
            }
        } else {
            this.currentCmd.newInput(promptInput);
        }

    }

}

export default Terminal;
