import { NS } from "@ns";
import { hackingTools,globalFiles } from "/lib/constants";
import { stringifyAndWrite } from "/lib/helpers";


/** @remarks RAM: 0.1 GB */
async function getAvailableTools(ns:NS):Promise<Array<object>>{
    const availableTools:Array<object> = [];
    for(const tool in hackingTools){
        const currentTool:string = hackingTools[tool].Program;
        if(await ns.fileExists(currentTool,"home")){
            availableTools.push(hackingTools[tool]);
        }
    }
    return availableTools;
}

/** @remarks RAM 0.1GB */
export async function updateAvailableTools(ns:NS):Promise<void> {
    const availableTools:Array<object> = await getAvailableTools(ns);
    await stringifyAndWrite(ns,availableTools,globalFiles.availableTools);
}