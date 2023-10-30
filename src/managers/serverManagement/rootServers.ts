import { NS } from "@ns";
import { serverObject } from "/classes/classServer";
import { readAndParse } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { getFilteredServerMap } from "/managers/serverManagement/serverHelpers";

/** @RAM 0 GB */
export async function allServersRooted(ns:NS):Promise<boolean>{
    const curServerMap:Array<serverObject> = await readAndParse(ns,globalFiles.serverMap);
    return curServerMap.every((adminRights) => adminRights.hasAdminRights === false);
}

/** @RAM 0.05 GB */
export async function rootWhatWeCan(ns:NS):Promise<void>{
    const curServerMap:Array<serverObject> = await readAndParse(ns,globalFiles.serverMap);
    const filteredByAdminRights:Array<serverObject> = await getFilteredServerMap(curServerMap,'hasAdminRights','===',false);
    for(const currentServer of filteredByAdminRights){
        if(currentServer.numOpenPortsRequired !== undefined && 
            currentServer.openPortCount !== undefined && 
            currentServer.numOpenPortsRequired <= currentServer.openPortCount){
                await ns.nuke(currentServer.hostName);
            }
    }
}
