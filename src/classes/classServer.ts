import { Server } from "@ns";

export class serverObject{
    backdoorInstalled?: boolean;
    baseDifficulty?: number;
    cpuCores!: number;
    ftpPortOpen = false;
    hackDifficulty?: number;
    hasAdminRights = false;
    hostName!: string;
    httpPortOpen = false;
    isConnectedTo = false;
    ramMax!: number;
    minDifficulty?: number;
    moneyAvailable?: number;
    moneyMax?: number;
    numOpenPortsRequired?: number;
    openPortCount?: number;
    purchasedByPlayer = false;
    ramUsed!: number;
    requiredHackingSkill?: number;
    serverGrowth?: number;
    smtpPortOpen = false;
    sqlPortOpen = false;
    sshPortOpen = false;
    parentServer?: string;
    ramAvailable!: number;
    [key: string]: unknown;

    constructor(data:Server, parentServer: string | undefined) {
            
            /** @param {boolean} backdoorInstalled - (Optional) Flag indicating whether this server has a backdoor installed by a player. */
            this.backdoorInstalled = data.backdoorInstalled ?? false;
            /** @param {number} baseDifficulty - (Optional) Server's initial server security level at creation, used to calculate hacking XP, higher is better. Default is -1 if not available. */
            this.baseDifficulty = data.baseDifficulty ?? 0;
            /** @param {number} cpuCores - How many CPU cores this server has. Affects magnitude of grow and weaken ran from this server. */
            this.cpuCores = data.cpuCores;
            this.ftpPortOpen = data.ftpPortOpen;
            /** @param {number} hackDifficulty - (Optional) Server Security Level */
            this.hackDifficulty = data.hackDifficulty ?? 0; 
            this.hasAdminRights = data.hasAdminRights;
            this.hostName = data.hostname;
            this.httpPortOpen = data.httpPortOpen;
            this.isConnectedTo = data.isConnectedTo;
            this.ramMax = data.maxRam;
            /** @param {number} minDifficulty - (Optional) Minimum server security level that this server can be weakened to. 999999 is default if not available. */
            this.minDifficulty = data.minDifficulty ?? 999999;
            /** @param {number} moneyAvailable - (Optional) How much money currently resides on the server and can be hacked. -1 is default if not available. */
            this.moneyAvailable = data.moneyAvailable ?? -1;
            this.moneyMax = data.moneyMax;
            this.numOpenPortsRequired = data.numOpenPortsRequired;
            this.openPortCount = data.openPortCount;
            this.purchasedByPlayer = data.purchasedByPlayer;
            this.ramUsed = data.ramUsed;
            /** @param {number} requiredHackingSkill - (Optional) Hacking level required to hack this server. 999999 is default if not available. */
            this.requiredHackingSkill = data.requiredHackingSkill ?? 999999;
            /** @param {number} serverGrowth - (Optional) Growth effectiveness statistic. -1 is default if not available. */
            this.serverGrowth = data.serverGrowth ?? -1;
            this.smtpPortOpen = data.smtpPortOpen;
            this.sqlPortOpen = data.sqlPortOpen;
            this.sshPortOpen = data.sshPortOpen;
            this.ramAvailable = data.maxRam-data.ramUsed ?? 0;
            /** @param {string} parentServer - Taken during scan, the server above this one in the hierarchy. */
            this.parentServer = parentServer;       
    }
}