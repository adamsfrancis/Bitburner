import { NS } from "@ns";
import { filesToSCP, globalFiles, hackingTools, homeServer, serverConstants } from "/lib/constants";
import { serverObject } from "/classes/classServer";
import { readAndParse, stringifyAndWrite, timeDifference } from "/managers/modules/helpers";
import { toolKit } from "/classes/toolKit";
import { progressFlags, toolsData } from "/lib/types";
import { getFilteredServerMap } from "/managers/modules/getFilteredServerMap";
import { toolBox } from "/classes/toolBox";

/** @RAM 0 GB */
async function getCurrentServerStates(ns: NS): Promise<Array<serverObject>> {
  const curServerMap: Array<serverObject> = await readAndParse<Array<serverObject>>(ns, globalFiles.serverMap)
  return curServerMap;
}

/** @RAM 0 GB */
export async function allProgressFlagsTrue(ns: NS): Promise<boolean> {
  const allFlags: progressFlags = await getProgressFlags(ns);
  const allFlagsValues: Array<boolean> = Object.values(allFlags);
  return allFlagsValues.every((value) => value === true)
}

/** @RAM 0 GB */
async function getProgressFlags(ns: NS): Promise<progressFlags> {
  if (await ns.fileExists(globalFiles.progressFlags)) {
    const curProgressFlags: progressFlags = await readAndParse<progressFlags>(ns, globalFiles.progressFlags);
    return curProgressFlags;
  } else {
    const curProgressFlags: progressFlags = { allBruteSSH: false, allFTPCrack: false, allHTTPWorm: false, allRelaySMTP: false, allSQLInject: false };
    await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);
    return curProgressFlags;
  }

}

/** @RAM 2.2 GB */
async function updateProgressFlags(ns: NS, curToolBox: toolBox) {
  const curProgressFlags = await getProgressFlags(ns);
  const curServerMap: Array<serverObject> = await getCurrentServerStates(ns);
  for (const tool of curToolBox) {
    const filteredMap: Array<serverObject> = getFilteredServerMap(curServerMap, tool.portFlag, '===', false);
    if (filteredMap.length === 0) {
      curProgressFlags[convertProgramToFlagProp(tool.Program)] = true ?? false;
    }
  }
  await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);

}

/** @RAM 0.25 GB */
async function applyAvailableTools(ns: NS, curToolBox: toolBox, serverMap: Array<serverObject>, progressFlags: progressFlags): Promise<void> {
  for (const tool of curToolBox) {
    if (!areWeDoneWithThis(progressFlags, convertProgramToFlagProp(tool.Program)) && tool.purchasedTool) {
      const filteredMap: Array<serverObject> = getFilteredServerMap(serverMap, tool.portFlag, '===', false);
      filteredMap.forEach((filteredServer) => tool.useTool(ns, tool.Command, filteredServer.hostName))
    }
  }
}

/** @RAM 0 GB */
function convertProgramToFlagProp(programName: string): string {
  return "all" + programName.replace(".exe", "");
}

/** @RAM 0 GB */
function areWeDoneWithThis(progressFlags: progressFlags, programName: string): boolean {
  return progressFlags[programName]
}

/** @RAM 2.45 GB (0.25 from class Toolbox, 2.2 from updateServerMap) */
export async function crackServers(ns: NS) {
  const curServerMap: Array<serverObject> = await getCurrentServerStates(ns);
  const curToolBox: toolBox = new toolBox();
  await updateProgressFlags(ns, curToolBox)
  const curProgressFlags: progressFlags = await getProgressFlags(ns);
  await applyAvailableTools(ns, curToolBox, curServerMap, curProgressFlags);
  await updateProgressFlags(ns, curToolBox);
}

/** @RAM 0 GB */
export async function allServersRooted(ns: NS): Promise<boolean> {
  const curServerMap: Array<serverObject> = await readAndParse(ns, globalFiles.serverMap);
  return curServerMap.every((adminRights) => adminRights.hasAdminRights === false);
}

/** @RAM 0.05 GB */
export async function rootWhatWeCan(ns: NS): Promise<void> {
  const curServerMap: Array<serverObject> = await readAndParse(ns, globalFiles.serverMap);
  const filteredByAdminRights: Array<serverObject> = await getFilteredServerMap(curServerMap, 'hasAdminRights', '===', false);
  for (const currentServer of filteredByAdminRights) {
    if (currentServer.numOpenPortsRequired !== undefined &&
      currentServer.openPortCount !== undefined &&
      currentServer.numOpenPortsRequired <= currentServer.openPortCount) {
      await ns.nuke(currentServer.hostName);
    }
  }
}


/** @RAM 0.2 GB */
export async function getServerStructure(ns: NS): Promise<Map<string, string | undefined>> {
  /** Initial run variable setup, we want to start from "home", and follow the network from there.
   *  Since home is the base level, it's parent will be null. Saving parents for possible backdoor
   *  shennanigans later.
   */

  const startingServer = "home";
  const discoveredServers: Map<string, string | undefined> = new Map();
  discoveredServers.set(startingServer, undefined);

  // Function to recursively discover servers
  async function discoverServers(server: string) {
    const adjacentServers: string[] = ns.scan(server);

    for (const serverName of adjacentServers) {
      if (!discoveredServers.has(serverName) && serverName !=='darkweb') {
        discoveredServers.set(serverName, server); // Store the server that discovered it
        await discoverServers(serverName); // Recursive call to discover adjacent servers
      }
    }
  }
  await discoverServers(startingServer);
  return discoveredServers;
}

/** @RAM 2 GB */
export async function getAllServerInfo(ns: NS, serverMap: Map<string, string | undefined>): Promise<Array<serverObject>> {
  const allServers: Array<serverObject> = [];

  for (const [currentServer, parentServer] of serverMap) {
    const currentServerInfo = ns.getServer(currentServer);
    const serverObj = new serverObject(ns, currentServerInfo, parentServer);
    allServers.push(serverObj);
  }

  return allServers;
}

/** @RAM 0 GB */
export async function storeServerData(ns: NS, serverData: object, filePath: string): Promise<void> {
  await stringifyAndWrite(ns, serverData, filePath);
}

/** @RAM 2.2 GB */
export async function updateServerMap(ns: NS): Promise<void> {
  const serverStructure: Map<string, string | undefined> = await getServerStructure(ns);
  const serverMap = await getAllServerInfo(ns, serverStructure);
  await storeServerData(ns, serverMap, globalFiles.serverMap);
}

async function allServersPurchased(ns:NS):Promise<boolean> {
  const curServerMap:serverObject[] = await readAndParse<serverObject[]>(ns,globalFiles.serverMap);
  const filteredMap:serverObject[] = getFilteredServerMap(curServerMap,'purchasedByPlayer','===',true);
  return filteredMap.length === 25;
}

async function purchaseServers(ns:NS):Promise<void>{
  const curServerMap:serverObject[] = await readAndParse<serverObject[]>(ns,globalFiles.serverMap);
  const filteredMap:serverObject[] = getFilteredServerMap(curServerMap,'purchasedByPlayer','===',true);
  const costPerPurchase:number = 8*serverConstants.costPerGBServer;
  for(let numServers = filteredMap.length+1;numServers<serverConstants.limitPurchasedServer+1;numServers++){
    const playerFunds:number = await ns.getPlayer().money;
    if(costPerPurchase < playerFunds*serverConstants.maxPercentageToSpendPerUpgrade){
      if(await !ns.purchaseServer(serverConstants.nameRootPurchasedServer+numServers,serverConstants.minGBPurchasedServer)){
        break;
      }
    }
  }
}

async function upgradePurchasedServers(ns:NS):Promise<void>{
  const curServerMap:serverObject[] = await readAndParse<serverObject[]>(ns,globalFiles.serverMap);
  const filteredMap:serverObject[] = getFilteredServerMap(curServerMap,'purchasedByPlayer','===',true);
  filteredMap.sort((a,b) => a.ramMax - b.ramMax);
  for(let curIndex = 0;curIndex < serverConstants.limitPurchasedServer;curIndex++){
    const playerFunds:number = await ns.getPlayer().money;
    if(playerFunds*serverConstants.maxPercentageToSpendPerUpgrade > filteredMap[curIndex].ramMax*serverConstants.costPerGBServer){
        await ns.upgradePurchasedServer(filteredMap[curIndex].hostName,filteredMap[curIndex].ramMax*2);
    }
  }
}

async function scpFiles(ns:NS):Promise<void>{
  const curServerMap:serverObject[] = await getCurrentServerStates(ns);
  const filteredMap:serverObject[] = getFilteredServerMap(curServerMap,'hasAdminRights','===',true)
  for(const curServer of filteredMap){
    ns.scp(filesToSCP,curServer.hostName,homeServer);
  }
}

async function buildTargetList(ns:NS) {
  const curServerMap:serverObject[] = await getCurrentServerStates(ns);
  const hackLevelPlayer:number = await ns.getPlayer().skills.hacking
  const filterForTopThree:serverObject[] = curServerMap.filter((curServ) => 
  curServ.hasAdminRights === true &&
  (curServ.requiredHackingSkill !== undefined &&
  curServ.requiredHackingSkill < hackLevelPlayer) &&
  curServ.moneyMax !== undefined).sort((a,b) => b.moneyMax-a.moneyMax).splice(0,3)
  await stringifyAndWrite(ns,filterForTopThree,globalFiles.targetMap)
}


export async function main(ns: NS): Promise<void> {
  const loopStart = new Date();
  /** Get the server structure, and update the serverMap */
  await updateServerMap(ns);

  /** See if all servers are cracked, if not, crack what we can. Later we'll incorporate buying missing tools. */
  if (!await allProgressFlagsTrue(ns)) { await crackServers(ns); }

  /** Grab a server update for the next step */
  await updateServerMap(ns);

  /** Next, let's see what we need to root, and root if possible. */
  if (!await allServersRooted(ns)) { await rootWhatWeCan(ns); }

  /** Grab a server update for the next step */
  await updateServerMap(ns);

  /** Now we've taken care of all of the cracking/rooting, we should see if we need to buy or upgrade our servers. */
  if(!await allServersPurchased(ns)){await purchaseServers(ns);} else { await upgradePurchasedServers(ns);}

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
  ns.tprint("Server Manager loop completed in: " + timeDifference(loopStart,loopEnd) + "ms" );

  /** Now we hand off and start hacking! */
  ns.spawn(globalFiles.daemon,1);
}