/** @param {NS} ns */

import {server} from '/classes/serverBase.js'

const allServers = [];

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
      allServers.push(new server(serverName,parentServerName));
    }
  }



  await discoverServers(startingServer);
  await convertToArray(discoveredServers);
  ns.tprint(allServers["n00dles"]);

}

export async function main(ns){
  await mapServers(ns);
}
