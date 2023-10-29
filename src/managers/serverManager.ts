import { NS } from "@ns";

import { globalFiles } from "/lib/constants";
import { serverObject } from "/classes/classServer";





async function getServerStructure(ns:NS):Promise<Map<string, string | undefined>> {
    /** Initial run variable setup, we want to start from "home", and follow the network from there.
     *  Since home is the base level, it's parent will be null. Saving parents for possible backdoor
     *  shennanigans later.
     */

    const startingServer = "home";
    const discoveredServers:Map<string,string |  undefined> = new Map();
    discoveredServers.set(startingServer, undefined);

    // Function to recursively discover servers
    async function discoverServers(server:string) {
        const adjacentServers:string[] = ns.scan(server);

        for (const serverName of adjacentServers) {
        if (!discoveredServers.has(serverName)) {
            discoveredServers.set(serverName, server); // Store the server that discovered it
            await discoverServers(serverName); // Recursive call to discover adjacent servers
        }
        }
    }
    await discoverServers(startingServer);
    return discoveredServers;
}

async function getAllServerInfo(ns: NS, serverMap: Map<string, string | undefined>):Promise<Array<serverObject>> {
    const allServers: Array<serverObject> = [];
  
    for (const [currentServer, parentServer] of serverMap) {
      const currentServerInfo = ns.getServer(currentServer);
      const serverObj = new serverObject(currentServerInfo, parentServer);
      allServers.push(serverObj);
    }

    return allServers;
  }
  
  async function stringifyServerMap(ns:NS,serverMap:serverObject[]) {
    const stringifiedMap:string = JSON.stringify(serverMap);
    await ns.write(globalFiles.serverMap,stringifiedMap,"w");
  }
  




export async function main(ns:NS) {
    /** Get the server structure */
    // eslint-disable-next-line no-constant-condition
    while(true){
        const serverStructure:Map<string,string | undefined> = await getServerStructure(ns);
        const serverMap = await getAllServerInfo(ns,serverStructure);
        await stringifyServerMap(ns,serverMap);

        await ns.sleep(1000);
    }
    
}