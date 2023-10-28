import { NS } from "@ns";
import { hackingTools } from "/lib/constants";
import { serverObject } from "/classes/classServer";



export async function crackServers(ns: NS, serverMap: serverObject[]) {
    const needsCracked: serverObject[] = serverMap.filter((server) => server.hasAdminRights === false);

    for (const tool in hackingTools) {
        const toCrackList = needsCracked.filter((server) => (server as serverObject)[hackingTools[tool].portFlag] === false);
        if (await ns.fileExists(hackingTools[tool].Program, "home") && toCrackList.length > 0) {
            for (const crackableServer of toCrackList) {
                switch (tool) {
                    case 'ssh':
                        ns.brutessh(crackableServer.hostName);
                        break;
                    case 'ftp':
                        ns.ftpcrack(crackableServer.hostName);
                        break;
                    case 'smtp':
                        ns.relaysmtp(crackableServer.hostName);
                        break;
                    case 'http':
                        ns.httpworm(crackableServer.hostName);
                        break;
                    case 'sql':
                        ns.sqlinject(crackableServer.hostName);
                        break;

                }
                
            }
        }
    }
    const needsNuked = needsCracked.filter((server) => server.numOpenPortsRequired === 0);
    for (const nukableServer of needsNuked) {
        const nukableName = nukableServer.hostName;
        await ns.nuke(nukableName);
    }

}