import { NS } from "@ns";
import { globalFiles } from "/lib/constants";
import { serverObject } from "/classes/classServer";
import { stringifyAndWrite } from "/lib/helpers";
import { allProgressFlagsTrue, crackServers } from "/managers/serverManagement/crackServers";
import { allServersRooted, rootWhatWeCan } from "/managers/serverManagement/rootServers";

/** Theoretical RAM Cost: 3.8 GB */


/** @RAM 0.2 GB */
export async function getServerStructure(ns:NS):Promise<Map<string, string | undefined>> {
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

/** @RAM 2 GB */
export async function getAllServerInfo(ns: NS, serverMap: Map<string, string | undefined>):Promise<Array<serverObject>> {
    const allServers: Array<serverObject> = [];
  
    for (const [currentServer, parentServer] of serverMap) {
      const currentServerInfo = ns.getServer(currentServer);
      const serverObj = new serverObject(currentServerInfo, parentServer);
      allServers.push(serverObj);
    }

    return allServers;
  }
  
  /** @RAM 0 GB */
  export async function storeServerData(ns:NS,serverData:object,filePath:string):Promise<void> {
    await stringifyAndWrite(ns,serverData,filePath);
  }

  /** @RAM 2.2 GB */
  export async function updateServerMap(ns:NS):Promise<void>{
    const serverStructure:Map<string,string | undefined> = await getServerStructure(ns);
    const serverMap = await getAllServerInfo(ns,serverStructure);
    await storeServerData(ns,serverMap,globalFiles.serverMap);
  }
  




export async function main(ns:NS): Promise<void> {
    /** Get the server structure, and update the serverMap */
    const time1 = new Date();
    await updateServerMap(ns);
    const time2 = new Date();
    const timeDifference = +time2-+time1;
    ns.tprint("Server Map Updated in "+ timeDifference + " ms")

    /** See if all servers are cracked, if not, crack what we can. Later we'll incorporate buying missing tools. */
    if(!await allProgressFlagsTrue(ns)){await crackServers(ns);}
    ns.tprint("Progress Flags Updated")

    /** Next, let's see what we need to root, and root if possible. */
    if(!await allServersRooted(ns)){await rootWhatWeCan(ns);}
    ns.tprint("Servers rooted.")
}