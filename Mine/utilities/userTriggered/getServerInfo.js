/** @param {NS} ns */
export async function main(ns) {
    const serverInfo = ns.getServer(ns.args[0]);
    
    for (let prop in serverInfo) {
      if (serverInfo.hasOwnProperty(prop)) {
        ns.tprint(`${prop}: ${serverInfo[prop]}`);
      }
    }
  
  }