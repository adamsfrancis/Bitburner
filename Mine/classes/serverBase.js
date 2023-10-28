/** @param {NS} ns */


export class server{
    constructor({backdoorInstalled = false, baseDifficulty = -1,cpuCores,ftpPortOpen,hackDifficulty = 999999,hasAdminRights,hostName,httpPortOpen,isConnectedTo,maxRam,minDifficulty = 999999,moneyAvailable = -1,
                moneyMax = 0,numOpenPortsRequired,openPortCount,purchasedByPlayer,ramUsed,requiredHackingSkill = 999999,serverGrowth = -1,smtpPortOpen,sqlPortOpen,sshPortOpen},parentServer){
            
            /** @param {boolean} backdoorInstalled - (Optional) Flag indicating whether this server has a backdoor installed by a player. */
            this.backdoorInstalled = backdoorInstalled;
            /** @param {number} baseDifficulty - (Optional) Server's initial server security level at creation, used to calculate hacking XP, higher is better. Default is -1 if not available. */
            this.baseDifficulty = baseDifficulty;
            /** @param {number} cpuCores - How many CPU cores this server has. Affects magnitude of grow and weaken ran from this server. */
            this.cpuCores = cpuCores;
            this.ftpPortOpen = ftpPortOpen;
            /** @param {number} hackDifficulty - (Optional) Server Security Level */
            this.hackDifficulty = hackDifficulty; 
            this.hasAdminRights = hasAdminRights;
            this.hostName = hostname;
            this.httpPortOpen = httpPortOpen;
            this.isConnectedTo = isConnectedTo;
            this.ramMax = maxRam;
            /** @param {number} minDifficulty - (Optional) Minimum server security level that this server can be weakened to. 999999 is default if not available. */
            this.minDifficulty = minDifficulty;
            /** @param {number} moneyAvailable - (Optional) How much money currently resides on the server and can be hacked. -1 is default if not available. */
            this.moneyAvailable = moneyAvailable;
            this.moneyMax = moneyMax;
            this.numOpenPortsRequired = numOpenPortsRequired;
            this.openPortCount = openPortCount;
            this.purchasedByPlayer = purchasedByPlayer;
            this.ramUsed = ramUsed;
            /** @param {number} requiredHackingSkill - (Optional) Hacking level required to hack this server. 999999 is default if not available. */
            this.requiredHackingSkill = requiredHackingSkill;
            /** @param {number} serverGrowth - (Optional) Growth effectiveness statistic. -1 is default if not available. */
            this.serverGrowth = serverGrowth;
            this.smtpPortOpen = smtpPortOpen;
            this.sqlPortOpen = sqlPortOpen;
            this.sshPortOpen = sshPortOpen;
            this.ramAvailable = maxRam-ramUsed;
            /** @param {string} parentServer - Taken during scan, the server above this one in the hierarchy. */
            this.parentServer = parentServer;
    }
}

/** This seems overly complex, saving for possibly implementation at a later date. */

// class serverPurchased extends serverBase{
//     constructor(adminRights,hostName,isConnectedTo,maxRAM,ramUsed){
//         super(adminRights);
//         super(hostName);
//         super(isConnectedTo);
//         super(maxRAM);
//         this.ramUsed = ramUsed;
//         this.serverType = "Purchased";
//     }
// }