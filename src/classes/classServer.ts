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

    constructor(curServer: {
        backdoorInstalled?: boolean;
        baseDifficulty?: number;
        cpuCores: number;
        ftpPortOpen: boolean;
        hackDifficulty: number;
        hasAdminRights: boolean;
        hostname: string;
        httpPortOpen: boolean;
        isConnectedTo: boolean;
        maxRam: number;
        minDifficulty: number;
        moneyAvailable: number;
        moneyMax: number;
        numOpenPortsRequired: number;
        openPortCount: number;
        purchasedByPlayer: boolean;
        ramUsed: number;
        requiredHackingSkill: number;
        serverGrowth: number;
        smtpPortOpen: boolean;
        sqlPortOpen: boolean;
        sshPortOpen: boolean;
      }, parentServer: string) {
            
            /** @param {boolean} backdoorInstalled - (Optional) Flag indicating whether this server has a backdoor installed by a player. */
            this.backdoorInstalled = curServer.backdoorInstalled;
            /** @param {number} baseDifficulty - (Optional) Server's initial server security level at creation, used to calculate hacking XP, higher is better. Default is -1 if not available. */
            this.baseDifficulty = curServer.baseDifficulty;
            /** @param {number} cpuCores - How many CPU cores this server has. Affects magnitude of grow and weaken ran from this server. */
            this.cpuCores = curServer.cpuCores;
            this.ftpPortOpen = curServer.ftpPortOpen;
            /** @param {number} hackDifficulty - (Optional) Server Security Level */
            this.hackDifficulty = curServer.hackDifficulty; 
            this.hasAdminRights = curServer.hasAdminRights;
            this.hostName = curServer.hostname;
            this.httpPortOpen = curServer.httpPortOpen;
            this.isConnectedTo = curServer.isConnectedTo;
            this.ramMax = curServer.maxRam;
            /** @param {number} minDifficulty - (Optional) Minimum server security level that this server can be weakened to. 999999 is default if not available. */
            this.minDifficulty = curServer.minDifficulty;
            /** @param {number} moneyAvailable - (Optional) How much money currently resides on the server and can be hacked. -1 is default if not available. */
            this.moneyAvailable = curServer.moneyAvailable;
            this.moneyMax = curServer.moneyMax;
            this.numOpenPortsRequired = curServer.numOpenPortsRequired;
            this.openPortCount = curServer.openPortCount;
            this.purchasedByPlayer = curServer.purchasedByPlayer;
            this.ramUsed = curServer.ramUsed;
            /** @param {number} requiredHackingSkill - (Optional) Hacking level required to hack this server. 999999 is default if not available. */
            this.requiredHackingSkill = curServer.requiredHackingSkill;
            /** @param {number} serverGrowth - (Optional) Growth effectiveness statistic. -1 is default if not available. */
            this.serverGrowth = curServer.serverGrowth;
            this.smtpPortOpen = curServer.smtpPortOpen;
            this.sqlPortOpen = curServer.sqlPortOpen;
            this.sshPortOpen = curServer.sshPortOpen;
            this.ramAvailable = curServer.maxRam-curServer.ramUsed | 0;
            /** @param {string} parentServer - Taken during scan, the server above this one in the hierarchy. */
            this.parentServer = parentServer;       
    }
    getHostName():string{
        return this.hostName;
    }
}