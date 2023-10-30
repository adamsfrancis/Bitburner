//import { NS } from "@ns";

export const allBaseServers = ['home','n00dles','foodnstuff','zer0','CSEC','sigma-cosmetics','joesguns','hong-fang-tea','harakiri-sushi','nectar-net','neo-net','the-hub','zb-institute','lexo-corp','aevum-police','I.I.I.I','rho-construction','netlink','syscore','catalyst','crush-fitness','omega-net','max-hardware','silver-helix','phantasy','computek','rothman-uni','alpha-ent','summit-uni','millenium-fitness','galactic-cyber','aerocorp','omnia','defcomm','solaris','taiyang-digital','unitalife','icarus','zb-def','titan-labs','fulcrumtech','omnitek','univ-energy','zeus-med','infocomm','applied-energetics','stormtech','run4theh111z','vitalife','4sigma','b-and-a','fulcrumassets','The-Cave','powerhouse-fitness','.','blade','nwo','ecorp','megacorp','clarkinc','nova-med','microdyne','helios','kuai-gong','global-pharm','snap-fitness','deltaone','johnson-ortho','avmnite-02h','iron-gym','darkweb'];
// export interface HackingTool{
//     Program:string;
//     Command:string;
//     portFlag:boolean;
// }
export const hackingTools: Record<string, { Program: string; Command:string; portFlag: string }> = {
  ssh: { Program: 'BruteSSH.exe', Command: 'brutessh', portFlag: 'sshPortOpen' },
  ftp: { Program: 'FTPCrack.exe', Command: 'ftpcrack', portFlag: 'ftpPortOpen' },
  smtp: { Program: 'relaySMTP.exe', Command: 'relaysmtp', portFlag: 'smtpPortOpen' },
  http: { Program: 'HTTPWorm.exe', Command: 'httpworm', portFlag: 'httpPortOpen' },
  sql: { Program: 'SQLInject.exe', Command: 'sqlinject', portFlag: 'sqlPortOpen' }
  };

export const globalFiles:Record<string,string> = {
  serverMap:'/files/serverMap.js',
  availableTools:'/files/availableTools.js',
  progressFlags:'/files/progressFlags.js'
}
  

/** These values taken from the game docs */
export const maxRAMHome = 1073741824; // 2 ^ 30
export const maxRAMPurcased = 1048576; // 2^20
export const limitPurchasedServer = 25;
export const serverGrowthRateBase = 1.03; // Unadjusted Growth rate
export const serverGrowthRateMax = 1.0035; // Maximum possible growth rate (max rate accounting for server security)
export const serverFortifyAmount = 0.002; // Amount by which server's security increases when its hacked/grown
export const serverWeakenAmount = 0.05; // Amount by which server's security decreases when weakened
export const costPerGBHome = 32000;
export const costPerGBServer = 55000;