import { NS } from "@ns";
import { buildToolKit } from "/managers/serverManagement/buildToolKit";
import { serverObject } from "/classes/classServer";
import { readAndParse,stringifyAndWrite } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { progressFlags } from "/lib/types";
import { toolKit } from "/classes/toolKit";
import { getFilteredServerMap } from "/managers/serverManagement/serverHelpers";


/** @RAM 0 GB */
async function getCurrentServerStates(ns:NS):Promise<Array<serverObject>>{
    const curServerMap:Array<serverObject> = await readAndParse<Array<serverObject>>(ns,globalFiles.serverMap)
    return curServerMap;
}

/** @RAM 0 GB */
export async function allProgressFlagsTrue(ns:NS):Promise<boolean>{
    const allFlags:progressFlags = await getProgressFlags(ns);
    const allFlagsValues:Array<boolean> = Object.values(allFlags);
    return allFlagsValues.every((value) => value === true)
    }

/** @RAM 0 GB */
async function getProgressFlags(ns:NS):Promise<progressFlags>{
    if(await ns.fileExists(globalFiles.progressFlags)){
        const curProgressFlags:progressFlags = await readAndParse<progressFlags>(ns,globalFiles.progressFlags);
        return curProgressFlags;
    } else {
        const curProgressFlags:progressFlags = {allBruteSSH:false,allFTPCrack:false,allHTTPWorm:false,allRelaySMTP:false,allSQLInject:false};
        await stringifyAndWrite(ns,curProgressFlags,globalFiles.progressFlags);
        return curProgressFlags;
    }
    
}

/** @RAM 2.2 GB */
async function updateProgressFlags(ns:NS,toolBox:Array<toolKit>){
    const curProgressFlags = await getProgressFlags(ns);
    const curServerMap:Array<serverObject> = await getCurrentServerStates(ns);
    for(const tool of toolBox){
        const filteredMap:Array<serverObject> = getFilteredServerMap(curServerMap,tool.portFlag,'===',false);
        if(filteredMap.length === 0){
            curProgressFlags[convertProgramToFlagProp(tool.Program)] = true ?? false;
        }
    }
    await stringifyAndWrite(ns,curProgressFlags,globalFiles.progressFlags);

}

/** @RAM 0.25 GB */
async function applyAvailableTools(ns:NS,toolBox:Array<toolKit>,serverMap:Array<serverObject>,progressFlags:progressFlags):Promise<void>{
    for(const tool of toolBox){
        if(!areWeDoneWithThis(progressFlags,convertProgramToFlagProp(tool.Program))){
            const filteredMap:Array<serverObject> = getFilteredServerMap(serverMap,tool.portFlag,'===',false);
            filteredMap.forEach((filteredServer)=>tool.useTool(ns,tool.Command,filteredServer.hostName))
        }
    }
}

/** @RAM 0 GB */
function convertProgramToFlagProp(programName:string):string{
    return "all"+programName.replace(".exe","");
}

/** @RAM 0 GB */
function areWeDoneWithThis(progressFlags:progressFlags,programName:string):boolean{
    return progressFlags[programName]
}

/** @RAM 2.45 GB (0.25 from class Toolbox, 2.2 from updateServerMap) */
export async function crackServers(ns:NS){
    const curServerMap:Array<serverObject> = await getCurrentServerStates(ns);
    const toolBox:Array<toolKit> = await buildToolKit(ns);
    await updateProgressFlags(ns,toolBox)
    const curProgressFlags:progressFlags = await getProgressFlags(ns);
    await applyAvailableTools(ns,toolBox,curServerMap,curProgressFlags);
    await updateProgressFlags(ns,toolBox);
}