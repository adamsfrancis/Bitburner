import { NS } from "@ns";
import { buildToolKit } from "/managers/serverManagement/buildToolKit";
import { serverObject } from "/classes/classServer";
import { readAndParse } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { progressFlags } from "/lib/types";

async function getCurrentServerStates(ns:NS):Promise<Array<serverObject>>{
    const curServerMap:Array<serverObject> = await readAndParse<Array<serverObject>>(ns,globalFiles.serverMap)
    return curServerMap;
}

async function getProgressFlags(ns:NS):Promise<progressFlags>{
    try{
    const curProgressFlags:progressFlags = await readAndParse<progressFlags>(ns,globalFiles.progressFlags);
    return curProgressFlags;
    } catch {
        const curProgressFlags:progressFlags = {allBruteSSH:false,allFTPCrack:false,allHTTPWorm:false,allRelaySMTP:false,allSQLInject:false};
        return curProgressFlags;
    }
    
}

async function updateProgressFlags(ns:NS){
    const curProgressFlags:progressFlags = await getProgressFlags(ns);

}