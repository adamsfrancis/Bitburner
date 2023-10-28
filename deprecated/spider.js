/** @param {NS} ns */

export async function main(ns) {
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

  await discoverServers(startingServer);
  for (const [serverName, discoveredBy] of discoveredServers.entries()) {
    ns.tprint(`Server: ${serverName}, Discovered by: ${discoveredBy}`);
  }
}
