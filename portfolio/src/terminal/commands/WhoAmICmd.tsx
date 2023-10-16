import Command from "./Command"


export class WhoAmICmd extends Command {

    static cmd: string = "whoami";
    static description: string = "Description for help command";

    async action(): Promise<void> {
        this.println("I'm Ian :) ");
        const resposta = await this.prompt("Aqui esta umas perguntas responda: ");
        this.println("vc respondeu! com " + resposta);
        const respostab = await this.prompt("Aqui esta umas perguntas respondaB: ");
        this.println("vc respondeu! com " + respostab);
    }
}