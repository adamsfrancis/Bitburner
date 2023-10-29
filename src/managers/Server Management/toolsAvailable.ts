import { NS } from "@ns";
import { hackingTools,globalFiles } from "/lib/constants";
import { stringifyAndWrite } from "/lib/helpers";


/** @remarks RAM: 0.2 GB */
async function getAvailableTools(ns:NS):Promise<Array<object>>{
    const playerFiles:Array<string> = await ns.ls("home","*.exe");
    const availableTools:Array<object> = [];
    for(const tool in hackingTools){
        if(hackingTools[tool].Program in playerFiles){
            availableTools.push(hackingTools[tool]);
        }
    }
    return availableTools;
}

/** @remarks RAM 0.2GB */
export async function main(ns:NS):Promise<void> {
    const availableTools:Array<object> = await getAvailableTools(ns);
    await stringifyAndWrite(ns,availableTools,globalFiles.availableTools);
}