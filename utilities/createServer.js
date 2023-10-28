/** @param {NS} ns */

// Function to add server data to the object
function addServer(hostName, parentServer, serverData) {
  allServers[hostName] = createServerObject(serverData, parentServer);
}

// Function to initialize a new server data object
function createServerObject(curServer, parentServer) {
  return {
    hostName: curServer.hostname,

    /** @param {boolean} backdoorInstalled - (Optional) Flag indicating whether this server has a backdoor installed by a player. */
    backdoorInstalled: curServer.backdoorInstalled || false,

    /** @param {number} baseDifficulty - (Optional) Server's initial server security level at creation, used to calculate hacking XP, higher is better. Default is -1 if not available. */
    baseDifficulty: curServer.baseDifficulty || -1,

    /** @param {number} cpuCores - How many CPU cores this server has. Affects magnitude of grow and weaken ran from this server. */
    cpuCores: curServer.cpuCores,

    ftpPortOpen: curServer.ftpPortOpen,

    /** @param {number} hackDifficulty - (Optional) Server Security Level */
    hackDifficulty: curServer.hackDifficulty || 999999,

    hasAdminRights: curServer.hasAdminRights,

    httpPortOpen: curServer.httpPortOpen,

    isConnectedTo: curServer.isConnectedTo,

    ramMax: curServer.maxRam,

    /** @param {number} minDifficulty - (Optional) Minimum server security level that this server can be weakened to. 999999 is default if not available. */
    minDifficulty: curServer.minDifficulty || 999999,

    /** @param {number} moneyAvailable - (Optional) How much money currently resides on the server and can be hacked. -1 is default if not available. */
    moneyAvailable: curServer.moneyAvailable || -1,

    moneyMax: curServer.moneyMax || 0,

    numOpenPortsRequired: curServer.numOpenPortsRequired,

    openPortCount: curServer.openPortCount,

    purchasedByPlayer: curServer.purchasedByPlayer,

    ramUsed: curServer.ramUsed || 0,

    /** @param {number} requiredHackingSkill - (Optional) Hacking level required to hack this server. 999999 is default if not available. */
    requiredHackingSkill: curServer.requiredHackingSkill || 999999,

    /** @param {number} serverGrowth - (Optional) Growth effectiveness statistic. -1 is default if not available. */
    serverGrowth: curServer.serverGrowth || -1,

    smtpPortOpen: curServer.smtpPortOpen,

    sqlPortOpen: curServer.sqlPortOpen,

    sshPortOpen: curServer.sshPortOpen,

    ramAvailable: curServer.maxRam - curServer.ramUsed,

    /** @param {string} parentServer - Taken during scan, the server above this one in the hierarchy. */
    parentServer: parentServer,

  };
}
