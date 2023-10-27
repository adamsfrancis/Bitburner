/** @param {NS} ns */

import * as constants from '/libs/constants.js';

export async function main(ns) {
  const startingServer = "home"; // Starting server
  const discoveredServers = new Set([startingServer]);

  // Function to recursively discover servers
  async function discoverServers(server) {
    const adjacentServers = ns.scan(server);

    for (const serverName of adjacentServers) {
      if (!discoveredServers.has(serverName)) {
          discoveredServers.add(serverName);
          await discoverServers(serverName); // Recursive call to discover adjacent servers
        } 
      }
    }

  await discoverServers(startingServer);
  await ns.write(constants.allServers,JSON.stringify(Array.from(discoveredServers)),"w");
}