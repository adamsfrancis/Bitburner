import { filesToSCP, globalFiles, homeServer, serverConstants } from "/lib/constants";
import { serverObject } from "/classes/classServer";
import { readAndParse, stringifyAndWrite, timeDifference } from "/managers/modules/helpers";
import { getFilteredServerMap } from "/managers/modules/getFilteredServerMap";
import { toolBox } from "/classes/toolBox";
/** @RAM 0 GB */
async function getCurrentServerStates(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    return curServerMap;
}
/** @RAM 0 GB */
export async function allProgressFlagsTrue(ns) {
    const allFlags = await getProgressFlags(ns);
    const allFlagsValues = Object.values(allFlags);
    return allFlagsValues.every((value) => value === true);
}
/** @RAM 0 GB */
async function getProgressFlags(ns) {
    if (await ns.fileExists(globalFiles.progressFlags)) {
        const curProgressFlags = await readAndParse(ns, globalFiles.progressFlags);
        return curProgressFlags;
    }
    else {
        const curProgressFlags = { allBruteSSH: false, allFTPCrack: false, allHTTPWorm: false, allRelaySMTP: false, allSQLInject: false };
        await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);
        return curProgressFlags;
    }
}
/** @RAM 2.2 GB */
async function updateProgressFlags(ns, curToolBox) {
    const curProgressFlags = await getProgressFlags(ns);
    const curServerMap = await getCurrentServerStates(ns);
    for (const tool of curToolBox) {
        const filteredMap = getFilteredServerMap(curServerMap, tool.portFlag, '===', false);
        if (filteredMap.length === 0) {
            curProgressFlags[convertProgramToFlagProp(tool.Program)] = true ?? false;
        }
    }
    await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);
}
/** @RAM 0.25 GB */
async function applyAvailableTools(ns, curToolBox, serverMap, progressFlags) {
    for (const tool of curToolBox) {
        if (!areWeDoneWithThis(progressFlags, convertProgramToFlagProp(tool.Program)) && tool.purchasedTool) {
            const filteredMap = getFilteredServerMap(serverMap, tool.portFlag, '===', false);
            filteredMap.forEach((filteredServer) => tool.useTool(ns, tool.Command, filteredServer.hostName));
        }
    }
}
/** @RAM 0 GB */
function convertProgramToFlagProp(programName) {
    return "all" + programName.replace(".exe", "");
}
/** @RAM 0 GB */
function areWeDoneWithThis(progressFlags, programName) {
    return progressFlags[programName];
}
/** @RAM 2.45 GB (0.25 from class Toolbox, 2.2 from updateServerMap) */
export async function crackServers(ns) {
    const curServerMap = await getCurrentServerStates(ns);
    const curToolBox = new toolBox();
    await updateProgressFlags(ns, curToolBox);
    const curProgressFlags = await getProgressFlags(ns);
    await applyAvailableTools(ns, curToolBox, curServerMap, curProgressFlags);
    await updateProgressFlags(ns, curToolBox);
}
/** @RAM 0 GB */
export async function allServersRooted(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    return curServerMap.every((adminRights) => adminRights.hasAdminRights === false);
}
/** @RAM 0.05 GB */
export async function rootWhatWeCan(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    const filteredByAdminRights = await getFilteredServerMap(curServerMap, 'hasAdminRights', '===', false);
    for (const currentServer of filteredByAdminRights) {
        if (currentServer.numOpenPortsRequired !== undefined &&
            currentServer.openPortCount !== undefined &&
            currentServer.numOpenPortsRequired <= currentServer.openPortCount) {
            await ns.nuke(currentServer.hostName);
        }
    }
}
/** @RAM 0.2 GB */
export async function getServerStructure(ns) {
    /** Initial run variable setup, we want to start from "home", and follow the network from there.
     *  Since home is the base level, it's parent will be null. Saving parents for possible backdoor
     *  shennanigans later.
     */
    const startingServer = "home";
    const discoveredServers = new Map();
    discoveredServers.set(startingServer, undefined);
    // Function to recursively discover servers
    async function discoverServers(server) {
        const adjacentServers = ns.scan(server);
        for (const serverName of adjacentServers) {
            if (!discoveredServers.has(serverName) && serverName !== 'darkweb') {
                discoveredServers.set(serverName, server); // Store the server that discovered it
                await discoverServers(serverName); // Recursive call to discover adjacent servers
            }
        }
    }
    await discoverServers(startingServer);
    return discoveredServers;
}
/** @RAM 2 GB */
export async function getAllServerInfo(ns, serverMap) {
    const allServers = [];
    for (const [currentServer, parentServer] of serverMap) {
        const currentServerInfo = ns.getServer(currentServer);
        const serverObj = new serverObject(ns, currentServerInfo, parentServer);
        allServers.push(serverObj);
    }
    return allServers;
}
/** @RAM 0 GB */
export async function storeServerData(ns, serverData, filePath) {
    await stringifyAndWrite(ns, serverData, filePath);
}
/** @RAM 2.2 GB */
export async function updateServerMap(ns) {
    const serverStructure = await getServerStructure(ns);
    const serverMap = await getAllServerInfo(ns, serverStructure);
    await storeServerData(ns, serverMap, globalFiles.serverMap);
}
async function allServersPurchased(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    const filteredMap = getFilteredServerMap(curServerMap, 'purchasedByPlayer', '===', true);
    return filteredMap.length === 25;
}
async function purchaseServers(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    const filteredMap = getFilteredServerMap(curServerMap, 'purchasedByPlayer', '===', true);
    const costPerPurchase = 8 * serverConstants.costPerGBServer;
    for (let numServers = filteredMap.length + 1; numServers < serverConstants.limitPurchasedServer + 1; numServers++) {
        const playerFunds = await ns.getPlayer().money;
        if (costPerPurchase < playerFunds * serverConstants.maxPercentageToSpendPerUpgrade) {
            if (await !ns.purchaseServer(serverConstants.nameRootPurchasedServer + numServers, serverConstants.minGBPurchasedServer)) {
                break;
            }
        }
    }
}
async function upgradePurchasedServers(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    const filteredMap = getFilteredServerMap(curServerMap, 'purchasedByPlayer', '===', true);
    filteredMap.sort((a, b) => a.ramMax - b.ramMax);
    for (let curIndex = 0; curIndex < serverConstants.limitPurchasedServer; curIndex++) {
        const playerFunds = await ns.getPlayer().money;
        if (playerFunds * serverConstants.maxPercentageToSpendPerUpgrade > filteredMap[curIndex].ramMax * serverConstants.costPerGBServer) {
            await ns.upgradePurchasedServer(filteredMap[curIndex].hostName, filteredMap[curIndex].ramMax * 2);
        }
    }
}
async function scpFiles(ns) {
    const curServerMap = await getCurrentServerStates(ns);
    const filteredMap = getFilteredServerMap(curServerMap, 'hasAdminRights', '===', true);
    for (const curServer of filteredMap) {
        ns.scp(filesToSCP, curServer.hostName, homeServer);
    }
}
async function buildTargetList(ns) {
    const curServerMap = await getCurrentServerStates(ns);
    const hackLevelPlayer = await ns.getPlayer().skills.hacking;
    const filterForTopThree = curServerMap.filter((curServ) => curServ.hasAdminRights === true &&
        (curServ.requiredHackingSkill !== undefined &&
            curServ.requiredHackingSkill < hackLevelPlayer) &&
        curServ.moneyMax !== undefined).sort((a, b) => b.moneyMax - a.moneyMax).splice(0, 3);
    await stringifyAndWrite(ns, filterForTopThree, globalFiles.targetMap);
}
export async function main(ns) {
    const loopStart = new Date();
    /** Get the server structure, and update the serverMap */
    await updateServerMap(ns);
    /** See if all servers are cracked, if not, crack what we can. Later we'll incorporate buying missing tools. */
    if (!await allProgressFlagsTrue(ns)) {
        await crackServers(ns);
    }
    /** Grab a server update for the next step */
    await updateServerMap(ns);
    /** Next, let's see what we need to root, and root if possible. */
    if (!await allServersRooted(ns)) {
        await rootWhatWeCan(ns);
    }
    /** Grab a server update for the next step */
    await updateServerMap(ns);
    /** Now we've taken care of all of the cracking/rooting, we should see if we need to buy or upgrade our servers. */
    if (!await allServersPurchased(ns)) {
        await purchaseServers(ns);
    }
    else {
        await upgradePurchasedServers(ns);
    }
    /** Grab a server update for the next step */
    await updateServerMap(ns);
    /** Ok, we've got up to date servers. Let's make sure everything we've rooted has updated files. */
    await scpFiles(ns);
    /** Grab a server update for the next step */
    await updateServerMap(ns);
    /** Now we should just need to build a targetting list before we hand off to the daemon! */
    await buildTargetList(ns);
    /** see how long these loops take */
    const loopEnd = new Date();
    ns.tprint("Server Manager loop completed in: " + timeDifference(loopStart, loopEnd) + "ms");
    /** Now we hand off and start hacking! */
    ns.spawn(globalFiles.daemon, 1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFnQixVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTNDLGdCQUFnQjtBQUNoQixLQUFLLFVBQVUsc0JBQXNCLENBQUMsRUFBTTtJQUMxQyxNQUFNLFlBQVksR0FBd0IsTUFBTSxZQUFZLENBQXNCLEVBQUUsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUcsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELGdCQUFnQjtBQUNoQixNQUFNLENBQUMsS0FBSyxVQUFVLG9CQUFvQixDQUFDLEVBQU07SUFDL0MsTUFBTSxRQUFRLEdBQWtCLE1BQU0sZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0QsTUFBTSxjQUFjLEdBQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUE7QUFDeEQsQ0FBQztBQUVELGdCQUFnQjtBQUNoQixLQUFLLFVBQVUsZ0JBQWdCLENBQUMsRUFBTTtJQUNwQyxJQUFJLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFB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QyxTQUFTLEVBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFFLENBQUM7SUFFNUYseUNBQXlDO0lBQ3pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTlMgfSBmcm9tIFwiQG5zXCI7XHJcbmltcG9ydCB7IGZpbGVzVG9TQ1AsIGdsb2JhbEZpbGVzLCBoYWNraW5nVG9vbHMsIGhvbWVTZXJ2ZXIsIHNlcnZlckNvbnN0YW50cyB9IGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBzZXJ2ZXJPYmplY3QgfSBmcm9tIFwiL2NsYXNzZXMvY2xhc3NTZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmVhZEFuZFBhcnNlLCBzdHJpbmdpZnlBbmRXcml0ZSwgdGltZURpZmZlcmVuY2UgfSBmcm9tIFwiL21hbmFnZXJzL21vZHVsZXMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyB0b29sS2l0IH0gZnJvbSBcIi9jbGFzc2VzL3Rvb2xLaXRcIjtcclxuaW1wb3J0IHsgcHJvZ3Jlc3NGbGFncywgdG9vbHNEYXRhIH0gZnJvbSBcIi9saWIvdHlwZXNcIjtcclxuaW1wb3J0IHsgZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAgfSBmcm9tIFwiL21hbmFnZXJzL21vZHVsZXMvZ2V0RmlsdGVyZWRTZXJ2ZXJNYXBcIjtcclxuaW1wb3J0IHsgdG9vbEJveCB9IGZyb20gXCIvY2xhc3Nlcy90b29sQm94XCI7XHJcblxyXG4vKiogQFJBTSAwIEdCICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRTZXJ2ZXJTdGF0ZXMobnM6IE5TKTogUHJvbWlzZTxBcnJheTxzZXJ2ZXJPYmplY3Q+PiB7XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgcmVhZEFuZFBhcnNlPEFycmF5PHNlcnZlck9iamVjdD4+KG5zLCBnbG9iYWxGaWxlcy5zZXJ2ZXJNYXApXHJcbiAgcmV0dXJuIGN1clNlcnZlck1hcDtcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWxsUHJvZ3Jlc3NGbGFnc1RydWUobnM6IE5TKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgY29uc3QgYWxsRmxhZ3M6IHByb2dyZXNzRmxhZ3MgPSBhd2FpdCBnZXRQcm9ncmVzc0ZsYWdzKG5zKTtcclxuICBjb25zdCBhbGxGbGFnc1ZhbHVlczogQXJyYXk8Ym9vbGVhbj4gPSBPYmplY3QudmFsdWVzKGFsbEZsYWdzKTtcclxuICByZXR1cm4gYWxsRmxhZ3NWYWx1ZXMuZXZlcnkoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gdHJ1ZSlcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRQcm9ncmVzc0ZsYWdzKG5zOiBOUyk6IFByb21pc2U8cHJvZ3Jlc3NGbGFncz4ge1xyXG4gIGlmIChhd2FpdCBucy5maWxlRXhpc3RzKGdsb2JhbEZpbGVzLnByb2dyZXNzRmxhZ3MpKSB7XHJcbiAgICBjb25zdCBjdXJQcm9ncmVzc0ZsYWdzOiBwcm9ncmVzc0ZsYWdzID0gYXdhaXQgcmVhZEFuZFBhcnNlPHByb2dyZXNzRmxhZ3M+KG5zLCBnbG9iYWxGaWxlcy5wcm9ncmVzc0ZsYWdzKTtcclxuICAgIHJldHVybiBjdXJQcm9ncmVzc0ZsYWdzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBjdXJQcm9ncmVzc0ZsYWdzOiBwcm9ncmVzc0ZsYWdzID0geyBhbGxCcnV0ZVNTSDogZmFsc2UsIGFsbEZUUENyYWNrOiBmYWxzZSwgYWxsSFRUUFdvcm06IGZhbHNlLCBhbGxSZWxheVNNVFA6IGZhbHNlLCBhbGxTUUxJbmplY3Q6IGZhbHNlIH07XHJcbiAgICBhd2FpdCBzdHJpbmdpZnlBbmRXcml0ZShucywgY3VyUHJvZ3Jlc3NGbGFncywgZ2xvYmFsRmlsZXMucHJvZ3Jlc3NGbGFncyk7XHJcbiAgICByZXR1cm4gY3VyUHJvZ3Jlc3NGbGFncztcclxuICB9XHJcblxyXG59XHJcblxyXG4vKiogQFJBTSAyLjIgR0IgKi9cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3NGbGFncyhuczogTlMsIGN1clRvb2xCb3g6IHRvb2xCb3gpIHtcclxuICBjb25zdCBjdXJQcm9ncmVzc0ZsYWdzID0gYXdhaXQgZ2V0UHJvZ3Jlc3NGbGFncyhucyk7XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgZm9yIChjb25zdCB0b29sIG9mIGN1clRvb2xCb3gpIHtcclxuICAgIGNvbnN0IGZpbHRlcmVkTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAoY3VyU2VydmVyTWFwLCB0b29sLnBvcnRGbGFnLCAnPT09JywgZmFsc2UpO1xyXG4gICAgaWYgKGZpbHRlcmVkTWFwLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjdXJQcm9ncmVzc0ZsYWdzW2NvbnZlcnRQcm9ncmFtVG9GbGFnUHJvcCh0b29sLlByb2dyYW0pXSA9IHRydWUgPz8gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF3YWl0IHN0cmluZ2lmeUFuZFdyaXRlKG5zLCBjdXJQcm9ncmVzc0ZsYWdzLCBnbG9iYWxGaWxlcy5wcm9ncmVzc0ZsYWdzKTtcclxuXHJcbn1cclxuXHJcbi8qKiBAUkFNIDAuMjUgR0IgKi9cclxuYXN5bmMgZnVuY3Rpb24gYXBwbHlBdmFpbGFibGVUb29scyhuczogTlMsIGN1clRvb2xCb3g6IHRvb2xCb3gsIHNlcnZlck1hcDogQXJyYXk8c2VydmVyT2JqZWN0PiwgcHJvZ3Jlc3NGbGFnczogcHJvZ3Jlc3NGbGFncyk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGZvciAoY29uc3QgdG9vbCBvZiBjdXJUb29sQm94KSB7XHJcbiAgICBpZiAoIWFyZVdlRG9uZVdpdGhUaGlzKHByb2dyZXNzRmxhZ3MsIGNvbnZlcnRQcm9ncmFtVG9GbGFnUHJvcCh0b29sLlByb2dyYW0pKSAmJiB0b29sLnB1cmNoYXNlZFRvb2wpIHtcclxuICAgICAgY29uc3QgZmlsdGVyZWRNYXA6IEFycmF5PHNlcnZlck9iamVjdD4gPSBnZXRGaWx0ZXJlZFNlcnZlck1hcChzZXJ2ZXJNYXAsIHRvb2wucG9ydEZsYWcsICc9PT0nLCBmYWxzZSk7XHJcbiAgICAgIGZpbHRlcmVkTWFwLmZvckVhY2goKGZpbHRlcmVkU2VydmVyKSA9PiB0b29sLnVzZVRvb2wobnMsIHRvb2wuQ29tbWFuZCwgZmlsdGVyZWRTZXJ2ZXIuaG9zdE5hbWUpKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0UHJvZ3JhbVRvRmxhZ1Byb3AocHJvZ3JhbU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIFwiYWxsXCIgKyBwcm9ncmFtTmFtZS5yZXBsYWNlKFwiLmV4ZVwiLCBcIlwiKTtcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5mdW5jdGlvbiBhcmVXZURvbmVXaXRoVGhpcyhwcm9ncmVzc0ZsYWdzOiBwcm9ncmVzc0ZsYWdzLCBwcm9ncmFtTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHByb2dyZXNzRmxhZ3NbcHJvZ3JhbU5hbWVdXHJcbn1cclxuXHJcbi8qKiBAUkFNIDIuNDUgR0IgKDAuMjUgZnJvbSBjbGFzcyBUb29sYm94LCAyLjIgZnJvbSB1cGRhdGVTZXJ2ZXJNYXApICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmFja1NlcnZlcnMobnM6IE5TKSB7XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgY29uc3QgY3VyVG9vbEJveDogdG9vbEJveCA9IG5ldyB0b29sQm94KCk7XHJcbiAgYXdhaXQgdXBkYXRlUHJvZ3Jlc3NGbGFncyhucywgY3VyVG9vbEJveClcclxuICBjb25zdCBjdXJQcm9ncmVzc0ZsYWdzOiBwcm9ncmVzc0ZsYWdzID0gYXdhaXQgZ2V0UHJvZ3Jlc3NGbGFncyhucyk7XHJcbiAgYXdhaXQgYXBwbHlBdmFpbGFibGVUb29scyhucywgY3VyVG9vbEJveCwgY3VyU2VydmVyTWFwLCBjdXJQcm9ncmVzc0ZsYWdzKTtcclxuICBhd2FpdCB1cGRhdGVQcm9ncmVzc0ZsYWdzKG5zLCBjdXJUb29sQm94KTtcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWxsU2VydmVyc1Jvb3RlZChuczogTlMpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICBjb25zdCBjdXJTZXJ2ZXJNYXA6IEFycmF5PHNlcnZlck9iamVjdD4gPSBhd2FpdCByZWFkQW5kUGFyc2UobnMsIGdsb2JhbEZpbGVzLnNlcnZlck1hcCk7XHJcbiAgcmV0dXJuIGN1clNlcnZlck1hcC5ldmVyeSgoYWRtaW5SaWdodHMpID0+IGFkbWluUmlnaHRzLmhhc0FkbWluUmlnaHRzID09PSBmYWxzZSk7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAuMDUgR0IgKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJvb3RXaGF0V2VDYW4obnM6IE5TKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgcmVhZEFuZFBhcnNlKG5zLCBnbG9iYWxGaWxlcy5zZXJ2ZXJNYXApO1xyXG4gIGNvbnN0IGZpbHRlcmVkQnlBZG1pblJpZ2h0czogQXJyYXk8c2VydmVyT2JqZWN0PiA9IGF3YWl0IGdldEZpbHRlcmVkU2VydmVyTWFwKGN1clNlcnZlck1hcCwgJ2hhc0FkbWluUmlnaHRzJywgJz09PScsIGZhbHNlKTtcclxuICBmb3IgKGNvbnN0IGN1cnJlbnRTZXJ2ZXIgb2YgZmlsdGVyZWRCeUFkbWluUmlnaHRzKSB7XHJcbiAgICBpZiAoY3VycmVudFNlcnZlci5udW1PcGVuUG9ydHNSZXF1aXJlZCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGN1cnJlbnRTZXJ2ZXIub3BlblBvcnRDb3VudCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGN1cnJlbnRTZXJ2ZXIubnVtT3BlblBvcnRzUmVxdWlyZWQgPD0gY3VycmVudFNlcnZlci5vcGVuUG9ydENvdW50KSB7XHJcbiAgICAgIGF3YWl0IG5zLm51a2UoY3VycmVudFNlcnZlci5ob3N0TmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLyoqIEBSQU0gMC4yIEdCICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTdHJ1Y3R1cmUobnM6IE5TKTogUHJvbWlzZTxNYXA8c3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWQ+PiB7XHJcbiAgLyoqIEluaXRpYWwgcnVuIHZhcmlhYmxlIHNldHVwLCB3ZSB3YW50IHRvIHN0YXJ0IGZyb20gXCJob21lXCIsIGFuZCBmb2xsb3cgdGhlIG5ldHdvcmsgZnJvbSB0aGVyZS5cclxuICAgKiAgU2luY2UgaG9tZSBpcyB0aGUgYmFzZSBsZXZlbCwgaXQncyBwYXJlbnQgd2lsbCBiZSBudWxsLiBTYXZpbmcgcGFyZW50cyBmb3IgcG9zc2libGUgYmFja2Rvb3JcclxuICAgKiAgc2hlbm5hbmlnYW5zIGxhdGVyLlxyXG4gICAqL1xyXG5cclxuICBjb25zdCBzdGFydGluZ1NlcnZlciA9IFwiaG9tZVwiO1xyXG4gIGNvbnN0IGRpc2NvdmVyZWRTZXJ2ZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWQ+ID0gbmV3IE1hcCgpO1xyXG4gIGRpc2NvdmVyZWRTZXJ2ZXJzLnNldChzdGFydGluZ1NlcnZlciwgdW5kZWZpbmVkKTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgZGlzY292ZXIgc2VydmVyc1xyXG4gIGFzeW5jIGZ1bmN0aW9uIGRpc2NvdmVyU2VydmVycyhzZXJ2ZXI6IHN0cmluZykge1xyXG4gICAgY29uc3QgYWRqYWNlbnRTZXJ2ZXJzOiBzdHJpbmdbXSA9IG5zLnNjYW4oc2VydmVyKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHNlcnZlck5hbWUgb2YgYWRqYWNlbnRTZXJ2ZXJzKSB7XHJcbiAgICAgIGlmICghZGlzY292ZXJlZFNlcnZlcnMuaGFzKHNlcnZlck5hbWUpICYmIHNlcnZlck5hbWUgIT09J2Rhcmt3ZWInKSB7XHJcbiAgICAgICAgZGlzY292ZXJlZFNlcnZlcnMuc2V0KHNlcnZlck5hbWUsIHNlcnZlcik7IC8vIFN0b3JlIHRoZSBzZXJ2ZXIgdGhhdCBkaXNjb3ZlcmVkIGl0XHJcbiAgICAgICAgYXdhaXQgZGlzY292ZXJTZXJ2ZXJzKHNlcnZlck5hbWUpOyAvLyBSZWN1cnNpdmUgY2FsbCB0byBkaXNjb3ZlciBhZGphY2VudCBzZXJ2ZXJzXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYXdhaXQgZGlzY292ZXJTZXJ2ZXJzKHN0YXJ0aW5nU2VydmVyKTtcclxuICByZXR1cm4gZGlzY292ZXJlZFNlcnZlcnM7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDIgR0IgKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFNlcnZlckluZm8obnM6IE5TLCBzZXJ2ZXJNYXA6IE1hcDxzdHJpbmcsIHN0cmluZyB8IHVuZGVmaW5lZD4pOiBQcm9taXNlPEFycmF5PHNlcnZlck9iamVjdD4+IHtcclxuICBjb25zdCBhbGxTZXJ2ZXJzOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gW107XHJcblxyXG4gIGZvciAoY29uc3QgW2N1cnJlbnRTZXJ2ZXIsIHBhcmVudFNlcnZlcl0gb2Ygc2VydmVyTWFwKSB7XHJcbiAgICBjb25zdCBjdXJyZW50U2VydmVySW5mbyA9IG5zLmdldFNlcnZlcihjdXJyZW50U2VydmVyKTtcclxuICAgIGNvbnN0IHNlcnZlck9iaiA9IG5ldyBzZXJ2ZXJPYmplY3QobnMsIGN1cnJlbnRTZXJ2ZXJJbmZvLCBwYXJlbnRTZXJ2ZXIpO1xyXG4gICAgYWxsU2VydmVycy5wdXNoKHNlcnZlck9iaik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWxsU2VydmVycztcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RvcmVTZXJ2ZXJEYXRhKG5zOiBOUywgc2VydmVyRGF0YTogb2JqZWN0LCBmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgYXdhaXQgc3RyaW5naWZ5QW5kV3JpdGUobnMsIHNlcnZlckRhdGEsIGZpbGVQYXRoKTtcclxufVxyXG5cclxuLyoqIEBSQU0gMi4yIEdCICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTZXJ2ZXJNYXAobnM6IE5TKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgY29uc3Qgc2VydmVyU3RydWN0dXJlOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWQ+ID0gYXdhaXQgZ2V0U2VydmVyU3RydWN0dXJlKG5zKTtcclxuICBjb25zdCBzZXJ2ZXJNYXAgPSBhd2FpdCBnZXRBbGxTZXJ2ZXJJbmZvKG5zLCBzZXJ2ZXJTdHJ1Y3R1cmUpO1xyXG4gIGF3YWl0IHN0b3JlU2VydmVyRGF0YShucywgc2VydmVyTWFwLCBnbG9iYWxGaWxlcy5zZXJ2ZXJNYXApO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhbGxTZXJ2ZXJzUHVyY2hhc2VkKG5zOk5TKTpQcm9taXNlPGJvb2xlYW4+IHtcclxuICBjb25zdCBjdXJTZXJ2ZXJNYXA6c2VydmVyT2JqZWN0W10gPSBhd2FpdCByZWFkQW5kUGFyc2U8c2VydmVyT2JqZWN0W10+KG5zLGdsb2JhbEZpbGVzLnNlcnZlck1hcCk7XHJcbiAgY29uc3QgZmlsdGVyZWRNYXA6c2VydmVyT2JqZWN0W10gPSBnZXRGaWx0ZXJlZFNlcnZlck1hcChjdXJTZXJ2ZXJNYXAsJ3B1cmNoYXNlZEJ5UGxheWVyJywnPT09Jyx0cnVlKTtcclxuICByZXR1cm4gZmlsdGVyZWRNYXAubGVuZ3RoID09PSAyNTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcHVyY2hhc2VTZXJ2ZXJzKG5zOk5TKTpQcm9taXNlPHZvaWQ+e1xyXG4gIGNvbnN0IGN1clNlcnZlck1hcDpzZXJ2ZXJPYmplY3RbXSA9IGF3YWl0IHJlYWRBbmRQYXJzZTxzZXJ2ZXJPYmplY3RbXT4obnMsZ2xvYmFsRmlsZXMuc2VydmVyTWFwKTtcclxuICBjb25zdCBmaWx0ZXJlZE1hcDpzZXJ2ZXJPYmplY3RbXSA9IGdldEZpbHRlcmVkU2VydmVyTWFwKGN1clNlcnZlck1hcCwncHVyY2hhc2VkQnlQbGF5ZXInLCc9PT0nLHRydWUpO1xyXG4gIGNvbnN0IGNvc3RQZXJQdXJjaGFzZTpudW1iZXIgPSA4KnNlcnZlckNvbnN0YW50cy5jb3N0UGVyR0JTZXJ2ZXI7XHJcbiAgZm9yKGxldCBudW1TZXJ2ZXJzID0gZmlsdGVyZWRNYXAubGVuZ3RoKzE7bnVtU2VydmVyczxzZXJ2ZXJDb25zdGFudHMubGltaXRQdXJjaGFzZWRTZXJ2ZXIrMTtudW1TZXJ2ZXJzKyspe1xyXG4gICAgY29uc3QgcGxheWVyRnVuZHM6bnVtYmVyID0gYXdhaXQgbnMuZ2V0UGxheWVyKCkubW9uZXk7XHJcbiAgICBpZihjb3N0UGVyUHVyY2hhc2UgPCBwbGF5ZXJGdW5kcypzZXJ2ZXJDb25zdGFudHMubWF4UGVyY2VudGFnZVRvU3BlbmRQZXJVcGdyYWRlKXtcclxuICAgICAgaWYoYXdhaXQgIW5zLnB1cmNoYXNlU2VydmVyKHNlcnZlckNvbnN0YW50cy5uYW1lUm9vdFB1cmNoYXNlZFNlcnZlcitudW1TZXJ2ZXJzLHNlcnZlckNvbnN0YW50cy5taW5HQlB1cmNoYXNlZFNlcnZlcikpe1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGdyYWRlUHVyY2hhc2VkU2VydmVycyhuczpOUyk6UHJvbWlzZTx2b2lkPntcclxuICBjb25zdCBjdXJTZXJ2ZXJNYXA6c2VydmVyT2JqZWN0W10gPSBhd2FpdCByZWFkQW5kUGFyc2U8c2VydmVyT2JqZWN0W10+KG5zLGdsb2JhbEZpbGVzLnNlcnZlck1hcCk7XHJcbiAgY29uc3QgZmlsdGVyZWRNYXA6c2VydmVyT2JqZWN0W10gPSBnZXRGaWx0ZXJlZFNlcnZlck1hcChjdXJTZXJ2ZXJNYXAsJ3B1cmNoYXNlZEJ5UGxheWVyJywnPT09Jyx0cnVlKTtcclxuICBmaWx0ZXJlZE1hcC5zb3J0KChhLGIpID0+IGEucmFtTWF4IC0gYi5yYW1NYXgpO1xyXG4gIGZvcihsZXQgY3VySW5kZXggPSAwO2N1ckluZGV4IDwgc2VydmVyQ29uc3RhbnRzLmxpbWl0UHVyY2hhc2VkU2VydmVyO2N1ckluZGV4Kyspe1xyXG4gICAgY29uc3QgcGxheWVyRnVuZHM6bnVtYmVyID0gYXdhaXQgbnMuZ2V0UGxheWVyKCkubW9uZXk7XHJcbiAgICBpZihwbGF5ZXJGdW5kcypzZXJ2ZXJDb25zdGFudHMubWF4UGVyY2VudGFnZVRvU3BlbmRQZXJVcGdyYWRlID4gZmlsdGVyZWRNYXBbY3VySW5kZXhdLnJhbU1heCpzZXJ2ZXJDb25zdGFudHMuY29zdFBlckdCU2VydmVyKXtcclxuICAgICAgICBhd2FpdCBucy51cGdyYWRlUHVyY2hhc2VkU2VydmVyKGZpbHRlcmVkTWFwW2N1ckluZGV4XS5ob3N0TmFtZSxmaWx0ZXJlZE1hcFtjdXJJbmRleF0ucmFtTWF4KjIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2NwRmlsZXMobnM6TlMpOlByb21pc2U8dm9pZD57XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOnNlcnZlck9iamVjdFtdID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgY29uc3QgZmlsdGVyZWRNYXA6c2VydmVyT2JqZWN0W10gPSBnZXRGaWx0ZXJlZFNlcnZlck1hcChjdXJTZXJ2ZXJNYXAsJ2hhc0FkbWluUmlnaHRzJywnPT09Jyx0cnVlKVxyXG4gIGZvcihjb25zdCBjdXJTZXJ2ZXIgb2YgZmlsdGVyZWRNYXApe1xyXG4gICAgbnMuc2NwKGZpbGVzVG9TQ1AsY3VyU2VydmVyLmhvc3ROYW1lLGhvbWVTZXJ2ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRUYXJnZXRMaXN0KG5zOk5TKSB7XHJcbiAgY29uc3QgY3VyU2VydmVyTWFwOnNlcnZlck9iamVjdFtdID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgY29uc3QgaGFja0xldmVsUGxheWVyOm51bWJlciA9IGF3YWl0IG5zLmdldFBsYXllcigpLnNraWxscy5oYWNraW5nXHJcbiAgY29uc3QgZmlsdGVyRm9yVG9wVGhyZWU6c2VydmVyT2JqZWN0W10gPSBjdXJTZXJ2ZXJNYXAuZmlsdGVyKChjdXJTZXJ2KSA9PiBcclxuICBjdXJTZXJ2Lmhhc0FkbWluUmlnaHRzID09PSB0cnVlICYmXHJcbiAgKGN1clNlcnYucmVxdWlyZWRIYWNraW5nU2tpbGwgIT09IHVuZGVmaW5lZCAmJlxyXG4gIGN1clNlcnYucmVxdWlyZWRIYWNraW5nU2tpbGwgPCBoYWNrTGV2ZWxQbGF5ZXIpICYmXHJcbiAgY3VyU2Vydi5tb25leU1heCAhPT0gdW5kZWZpbmVkKS5zb3J0KChhLGIpID0+IGIubW9uZXlNYXgtYS5tb25leU1heCkuc3BsaWNlKDAsMylcclxuICBhd2FpdCBzdHJpbmdpZnlBbmRXcml0ZShucyxmaWx0ZXJGb3JUb3BUaHJlZSxnbG9iYWxGaWxlcy50YXJnZXRNYXApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFpbihuczogTlMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBsb29wU3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gIC8qKiBHZXQgdGhlIHNlcnZlciBzdHJ1Y3R1cmUsIGFuZCB1cGRhdGUgdGhlIHNlcnZlck1hcCAqL1xyXG4gIGF3YWl0IHVwZGF0ZVNlcnZlck1hcChucyk7XHJcblxyXG4gIC8qKiBTZWUgaWYgYWxsIHNlcnZlcnMgYXJlIGNyYWNrZWQsIGlmIG5vdCwgY3JhY2sgd2hhdCB3ZSBjYW4uIExhdGVyIHdlJ2xsIGluY29ycG9yYXRlIGJ1eWluZyBtaXNzaW5nIHRvb2xzLiAqL1xyXG4gIGlmICghYXdhaXQgYWxsUHJvZ3Jlc3NGbGFnc1RydWUobnMpKSB7IGF3YWl0IGNyYWNrU2VydmVycyhucyk7IH1cclxuXHJcbiAgLyoqIEdyYWIgYSBzZXJ2ZXIgdXBkYXRlIGZvciB0aGUgbmV4dCBzdGVwICovXHJcbiAgYXdhaXQgdXBkYXRlU2VydmVyTWFwKG5zKTtcclxuXHJcbiAgLyoqIE5leHQsIGxldCdzIHNlZSB3aGF0IHdlIG5lZWQgdG8gcm9vdCwgYW5kIHJvb3QgaWYgcG9zc2libGUuICovXHJcbiAgaWYgKCFhd2FpdCBhbGxTZXJ2ZXJzUm9vdGVkKG5zKSkgeyBhd2FpdCByb290V2hhdFdlQ2FuKG5zKTsgfVxyXG5cclxuICAvKiogR3JhYiBhIHNlcnZlciB1cGRhdGUgZm9yIHRoZSBuZXh0IHN0ZXAgKi9cclxuICBhd2FpdCB1cGRhdGVTZXJ2ZXJNYXAobnMpO1xyXG5cclxuICAvKiogTm93IHdlJ3ZlIHRha2VuIGNhcmUgb2YgYWxsIG9mIHRoZSBjcmFja2luZy9yb290aW5nLCB3ZSBzaG91bGQgc2VlIGlmIHdlIG5lZWQgdG8gYnV5IG9yIHVwZ3JhZGUgb3VyIHNlcnZlcnMuICovXHJcbiAgaWYoIWF3YWl0IGFsbFNlcnZlcnNQdXJjaGFzZWQobnMpKXthd2FpdCBwdXJjaGFzZVNlcnZlcnMobnMpO30gZWxzZSB7IGF3YWl0IHVwZ3JhZGVQdXJjaGFzZWRTZXJ2ZXJzKG5zKTt9XHJcblxyXG4gIC8qKiBHcmFiIGEgc2VydmVyIHVwZGF0ZSBmb3IgdGhlIG5leHQgc3RlcCAqL1xyXG4gIGF3YWl0IHVwZGF0ZVNlcnZlck1hcChucyk7XHJcblxyXG4gIC8qKiBPaywgd2UndmUgZ290IHVwIHRvIGRhdGUgc2VydmVycy4gTGV0J3MgbWFrZSBzdXJlIGV2ZXJ5dGhpbmcgd2UndmUgcm9vdGVkIGhhcyB1cGRhdGVkIGZpbGVzLiAqL1xyXG4gIGF3YWl0IHNjcEZpbGVzKG5zKTtcclxuXHJcbiAgLyoqIEdyYWIgYSBzZXJ2ZXIgdXBkYXRlIGZvciB0aGUgbmV4dCBzdGVwICovXHJcbiAgYXdhaXQgdXBkYXRlU2VydmVyTWFwKG5zKTtcclxuXHJcbiAgLyoqIE5vdyB3ZSBzaG91bGQganVzdCBuZWVkIHRvIGJ1aWxkIGEgdGFyZ2V0dGluZyBsaXN0IGJlZm9yZSB3ZSBoYW5kIG9mZiB0byB0aGUgZGFlbW9uISAqL1xyXG4gIGF3YWl0IGJ1aWxkVGFyZ2V0TGlzdChucyk7XHJcblxyXG4gIC8qKiBzZWUgaG93IGxvbmcgdGhlc2UgbG9vcHMgdGFrZSAqL1xyXG4gIGNvbnN0IGxvb3BFbmQgPSBuZXcgRGF0ZSgpO1xyXG4gIG5zLnRwcmludChcIlNlcnZlciBNYW5hZ2VyIGxvb3AgY29tcGxldGVkIGluOiBcIiArIHRpbWVEaWZmZXJlbmNlKGxvb3BTdGFydCxsb29wRW5kKSArIFwibXNcIiApO1xyXG5cclxuICAvKiogTm93IHdlIGhhbmQgb2ZmIGFuZCBzdGFydCBoYWNraW5nISAqL1xyXG4gIG5zLnNwYXduKGdsb2JhbEZpbGVzLmRhZW1vbiwxKTtcclxufSJdfQ==