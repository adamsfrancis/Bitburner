/** @param {NS} ns */

import { hackingTools } from "/libs/constants.js";



export async function crackServers(ns,serverMap){
    const needsCracked = serverMap.filter((server) => server.hasAdminRights === "false");

    for(let tool in hackingTools){
        const toCrackList = needsCracked.filter((server) => server.hackingTools[tool].portFlag === "false");
        if(await ns.fileExists(hackingTools[tool].Program,"home") && toCrackList.length > 0){
            for(let crackableServer in toCrackList){
                ns[hackingTools[tool].Command](toCrackList[crackableServer.hostName]);
                needsCracked[crackableServer].hackingTools[tool].portFlag = true;
                needsCracked[crackableServer].numOpenPortsRequired -= 1;
                needsCracked[crackableServer].openPortCount += 1;
            }
        }
    }
    const needsNuked = needsCracked.filter((server) => server.numOpenPortsRequired === 0);
    for(let nukableServer of needsNuked){
        await ns.nuke(needsNuked[nukableServer].hostName);
    }

}

async function getToolCount(ns){
    let toolCount = 0;
    for(let tool in hackingTools){
    if(ns.fileExists(hackingTools[tool],"home")){
        toolCount += 1;
    }
    }
    return toolCount;
}