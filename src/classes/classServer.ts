import { Server } from "@ns";

export class serverObject{
    backdoorInstalled?: boolean;
    baseDifficulty?: number;
    cpuCores: number;
    ftpPortOpen: boolean;
    hackDifficulty?: number;
    hasAdminRights: boolean;
    hostName: string;
    httpPortOpen: boolean;
    isConnectedTo: boolean;
    ramMax: number;
    minDifficulty?: number;
    moneyAvailable?: number;
    moneyMax?: number;
    numOpenPortsRequired?: number;
    openPortCount?: number;
    purchasedByPlayer: boolean;
    ramUsed: number;
    requiredHackingSkill?: number;
    serverGrowth?: number;
    smtpPortOpen: boolean;
    sqlPortOpen: boolean;
    sshPortOpen: boolean;
    parentServer?: string;
    ramAvailable: number;
    [key: string]: unknown;

    constructor(data:Server, parentServer: string | undefined) {
            
            this.backdoorInstalled = data.backdoorInstalled ?? false;
            this.baseDifficulty = data.baseDifficulty ?? 0;
            this.cpuCores = data.cpuCores;
            this.ftpPortOpen = data.ftpPortOpen;
            this.hackDifficulty = data.hackDifficulty ?? 0; 
            this.hasAdminRights = data.hasAdminRights;
            this.hostName = data.hostname;
            this.httpPortOpen = data.httpPortOpen;
            this.isConnectedTo = data.isConnectedTo;
            this.ramMax = data.maxRam;
            this.minDifficulty = data.minDifficulty ?? 999999;
            this.moneyAvailable = data.moneyAvailable ?? -1;
            this.moneyMax = data.moneyMax;
            this.numOpenPortsRequired = data.numOpenPortsRequired;
            this.openPortCount = data.openPortCount;
            this.purchasedByPlayer = data.purchasedByPlayer;
            this.ramUsed = data.ramUsed;
            this.requiredHackingSkill = data.requiredHackingSkill ?? 999999;
            this.serverGrowth = data.serverGrowth ?? -1;
            this.smtpPortOpen = data.smtpPortOpen;
            this.sqlPortOpen = data.sqlPortOpen;
            this.sshPortOpen = data.sshPortOpen;
            this.ramAvailable = data.maxRam-data.ramUsed ?? 0;
            this.parentServer = parentServer;       
    }
}