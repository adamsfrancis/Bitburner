/** @param {NS} ns */

// import {server} from '/classes/serverBase.js'
// import {addServer} from '/utilities/createServer.js'
import { crackServers } from '/managers/crackServers.js';

const allServers = [];
const configFlags = {
  allCracked:false
}

// Function to add server data to the object
export async function addServer(hostName, parentServer, serverData) {
  allServers[hostName] = createServerObject(serverData, parentServer);
}

// Function to initialize a new server data object
export async function createServerObject(curServer, parentServer) {
  return {
    hostName: curServer.hostname,

    /** @param {boolean} backdoorInstalled - (Optional) Flag indicating whether this server has a backdoor installed by a player. */
    backdoorInstalled: curServer.backdoorInstalled || false,

    /** @param {number} baseDifficulty - (Optional) Server's initial server security level at creation, used to calculate hacking XP, higher is better. Default is -1 if not available. */
    baseDifficulty: curServer.baseDifficulty || -1,

    /** @param {number} cpuCores - How many CPU cores this server has. Affects magnitude of grow and weaken ran from this server. */
    cpuCores: curServer.cpuCores,

    ftpPortOpen: curServer.ftpPortOpen,

    /** @param {number} hackDifficulty - (Optional) Server Security Level */
    hackDifficulty: curServer.hackDifficulty || 999999,

    hasAdminRights: curServer.hasAdminRights,

    httpPortOpen: curServer.httpPortOpen,

    isConnectedTo: curServer.isConnectedTo,

    ramMax: curServer.maxRam,

    /** @param {number} minDifficulty - (Optional) Minimum server security level that this server can be weakened to. 999999 is default if not available. */
    minDifficulty: curServer.minDifficulty || 999999,

    /** @param {number} moneyAvailable - (Optional) How much money currently resides on the server and can be hacked. -1 is default if not available. */
    moneyAvailable: curServer.moneyAvailable || -1,

    moneyMax: curServer.moneyMax || 0,

    numOpenPortsRequired: curServer.numOpenPortsRequired,

    openPortCount: curServer.openPortCount,

    purchasedByPlayer: curServer.purchasedByPlayer,

    ramUsed: curServer.ramUsed || 0,

    /** @param {number} requiredHackingSkill - (Optional) Hacking level required to hack this server. 999999 is default if not available. */
    requiredHackingSkill: curServer.requiredHackingSkill || 999999,

    /** @param {number} serverGrowth - (Optional) Growth effectiveness statistic. -1 is default if not available. */
    serverGrowth: curServer.serverGrowth || -1,

    smtpPortOpen: curServer.smtpPortOpen,

    sqlPortOpen: curServer.sqlPortOpen,

    sshPortOpen: curServer.sshPortOpen,

    ramAvailable: curServer.maxRam - curServer.ramUsed,

    /** @param {string} parentServer - Taken during scan, the server above this one in the hierarchy. */
    parentServer: parentServer,

  };
}



/**
 * Build server map, build map of servers and parents, then store to allServers as full server objects.
 */
async function mapServers(ns) {
  const startingServer = "home"; // Starting server
  const discoveredServers = new Map();
  discoveredServers.set(startingServer, null); // Initialize the Map with "home" and null

  // Function to recursively discover servers
  async function discoverServers(server) {
    const adjacentServers = ns.scan(server);

    for (const serverName of adjacentServers) {
      if (!discoveredServers.has(serverName)) {
        discoveredServers.set(serverName, server); // Store the server that discovered it
        await discoverServers(serverName); // Recursive call to discover adjacent servers
      }
    }
  }

  async function convertToArray(mapOfServers){
    for (const [serverName, parentServerName] of mapOfServers.entries()) {
      addServer(serverName,parentServerName,await ns.getServer(serverName));
    }
  }



  await discoverServers(startingServer);
  await convertToArray(discoveredServers);
}

export async function main(ns){
await mapServers(ns);
let areTheyCracked =allServers.filter((server) => server.hasAdminRights === false)
ns.tprint("Are they cracked length: " + areTheyCracked.length);
if(areTheyCracked.length === 0){configFlags.allCracked = true;}
if(configFlags.allCracked === true){await crackServers(ns,allServers);}


}

