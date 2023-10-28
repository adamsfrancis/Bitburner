/** @param {NS} ns */

// import {server} from '/classes/serverBase.js'
import {addServer} from '/utilities/createServer.js'
import { crackServers } from '/managers/crackServers.js';

const allServers = [];
const configFlags = {
  allCracked:false
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

