import {NS} from "@ns"
import { toolsData } from "/lib/types";
import { hackingTools } from "/lib/constants";

export class toolKit{
    Program:string;
    Command:string;
    portFlag:string;
    purhcaseCost:number;
    purchasedTool?:boolean;

    constructor(data:toolsData,purchasedTool:boolean){

        this.Program = data.Program;
        this.Command = data.Command;
        this.portFlag = data.portFlag;
        this.purhcaseCost = data.purchaseCost;
        this.purchasedTool = this.purchasedTool ?? false;
    }

    /** @remarks RAM: 0.25 GB */
    public async useTool(ns:NS,toolCommand:string,targetServer:string):Promise<void> {
        switch(toolCommand){
            case 'brutessh':
                await ns.brutessh(targetServer);
                break;
            case 'ftpcrack':
                await ns.ftpcrack(targetServer);
                break;
            case 'relaysmtp':
                await ns.relaysmtp(targetServer);
                break;
            case 'httpworm':
                await ns.httpworm(targetServer);
                break;
            case 'sqlinject':
                await ns.sqlinject(targetServer);
                break;
        }
    }
    
}