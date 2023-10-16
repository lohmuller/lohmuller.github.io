import Command, { CommandProps, SetOutputValueFunction, TerminalInterface } from "./Command"


export class LsCmd extends Command {

    static cmd: string = "ls";
    static description: string = "Date Description";

    async action(): Promise<void> {

        this.println("Iniciando....");
        const resposta = await this.prompt("xablau");
        this.println("vc respondeu! com " + resposta);


        const respostab = await this.prompt("xablau");
        this.println("vc respondeu! com " + respostab);
    }

}