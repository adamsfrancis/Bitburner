/** @param {NS} ns */

import {server} from '/classes/serverBase.js'


/**
 * Build server map, return an array of server objects.
 */
async function mapServers(ns) {
    const startingServer = "home"; // Starting server
    const discoveredServers = new Set([startingServer]);
    const serverMap = [];
  
    // Function to recursively discover servers
    async function discoverServers(server,parentServer = "home") {
      const adjacentServers = ns.scan(server);
  
      for (const serverName of adjacentServers) {
        if (!discoveredServers.has(serverName)) {
            discoveredServers.add(serverName);
            serverMap.push(new server(ns.getServer(serverName),parentServer))
            ns.tprint({serverName} + " - " + {parentServer});
            await discoverServers(serverName,server); // Recursive call to discover adjacent servers
          } 
        }
      }
  
    await discoverServers(startingServer);
  }




export async function main(ns){


}