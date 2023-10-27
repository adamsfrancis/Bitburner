/** @param {NS} ns */
export async function main(ns) {
    const targetServer = ns.args[0];
    const targetTime = Date.parse(ns.args[1]);
    let delay = targetTime - Date.now();
  
    if (delay > 0) {
      await ns.sleep(delay);
    }  
    await ns.weaken(targetServer);
  }