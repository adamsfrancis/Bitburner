//import { NS } from "@ns";
export const allBaseServers = ['home', 'n00dles', 'foodnstuff', 'zer0', 'CSEC', 'sigma-cosmetics', 'joesguns', 'hong-fang-tea', 'harakiri-sushi', 'nectar-net', 'neo-net', 'the-hub', 'zb-institute', 'lexo-corp', 'aevum-police', 'I.I.I.I', 'rho-construction', 'netlink', 'syscore', 'catalyst', 'crush-fitness', 'omega-net', 'max-hardware', 'silver-helix', 'phantasy', 'computek', 'rothman-uni', 'alpha-ent', 'summit-uni', 'millenium-fitness', 'galactic-cyber', 'aerocorp', 'omnia', 'defcomm', 'solaris', 'taiyang-digital', 'unitalife', 'icarus', 'zb-def', 'titan-labs', 'fulcrumtech', 'omnitek', 'univ-energy', 'zeus-med', 'infocomm', 'applied-energetics', 'stormtech', 'run4theh111z', 'vitalife', '4sigma', 'b-and-a', 'fulcrumassets', 'The-Cave', 'powerhouse-fitness', '.', 'blade', 'nwo', 'ecorp', 'megacorp', 'clarkinc', 'nova-med', 'microdyne', 'helios', 'kuai-gong', 'global-pharm', 'snap-fitness', 'deltaone', 'johnson-ortho', 'avmnite-02h', 'iron-gym', 'darkweb'];
export const hackingTools = {
    ssh: { Program: 'BruteSSH.exe', Command: 'brutessh', portFlag: 'sshPortOpen', purchaseCost: 500000 },
    ftp: { Program: 'FTPCrack.exe', Command: 'ftpcrack', portFlag: 'ftpPortOpen', purchaseCost: 1500000 },
    smtp: { Program: 'relaySMTP.exe', Command: 'relaysmtp', portFlag: 'smtpPortOpen', purchaseCost: 5000000 },
    http: { Program: 'HTTPWorm.exe', Command: 'httpworm', portFlag: 'httpPortOpen', purchaseCost: 30000000 },
    sql: { Program: 'SQLInject.exe', Command: 'sqlinject', portFlag: 'sqlPortOpen', purchaseCost: 250000000 }
};
export const globalFiles = {
    serverMap: '/files/serverMap.js',
    availableTools: '/files/availableTools.js',
    progressFlags: '/files/progressFlags.js',
    targetMap: '/files/targetMap.js',
    daemon: '/managers/daemon.js',
    serverManager: '/managers/serverManager.js'
};
export const filesToSCP = [
    '/managers/scripts/grow.js',
    '/managers/scripts/hack.js',
    '/managers/scripts/weaken.js'
];
export const homeServer = 'home';
export const serverConstants = {
    /** These values taken from the game docs */
    maxRAMHome: 1073741824,
    maxRAMPurchased: 1048576,
    limitPurchasedServer: 25,
    serverGrowthRateBase: 1.03,
    serverGrowthRateMax: 1.0035,
    serverFortifyAmount: 0.002,
    serverWeakenAmount: 0.05,
    costPerGBHome: 32000,
    costPerGBServer: 55000,
    /** my custom variables */
    minGBPurchasedServer: 8,
    nameRootPurchasedServer: "Fracas-",
    maxPercentageToSpendPerUpgrade: 0.05,
    ramCostGrow: 1.75,
    ramCostHack: 1.7,
    ramCostWeaken: 1.75,
    hackAmountToSteal: 0.05
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkJBQTJCO0FBRTNCLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxnQkFBZ0IsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZUFBZSxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsbUJBQW1CLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLG9CQUFvQixFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxvQkFBb0IsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7QUFFbjRCLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBOEY7SUFDckgsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBRTtJQUNsRyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFO0lBQ25HLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUU7SUFDdkcsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBRTtJQUN0RyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFFO0NBQ3RHLENBQUM7QUFFSixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQXlCO0lBQy9DLFNBQVMsRUFBQyxxQkFBcUI7SUFDL0IsY0FBYyxFQUFDLDBCQUEwQjtJQUN6QyxhQUFhLEVBQUMseUJBQXlCO0lBQ3ZDLFNBQVMsRUFBQyxxQkFBcUI7SUFDL0IsTUFBTSxFQUFDLHFCQUFxQjtJQUM1QixhQUFhLEVBQUMsNEJBQTRCO0NBQzNDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDeEIsMkJBQTJCO0lBQzNCLDJCQUEyQjtJQUMzQiw2QkFBNkI7Q0FDOUIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUE7QUFFaEMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHO0lBQzdCLDRDQUE0QztJQUM5QyxVQUFVLEVBQUMsVUFBVTtJQUNyQixlQUFlLEVBQUMsT0FBTztJQUN2QixvQkFBb0IsRUFBQyxFQUFFO0lBQ3ZCLG9CQUFvQixFQUFDLElBQUk7SUFDekIsbUJBQW1CLEVBQUMsTUFBTTtJQUMxQixtQkFBbUIsRUFBQyxLQUFLO0lBQ3pCLGtCQUFrQixFQUFDLElBQUk7SUFDdkIsYUFBYSxFQUFDLEtBQUs7SUFDbkIsZUFBZSxFQUFDLEtBQUs7SUFDckIsMEJBQTBCO0lBQzFCLG9CQUFvQixFQUFDLENBQUM7SUFDdEIsdUJBQXVCLEVBQUMsU0FBUztJQUNqQyw4QkFBOEIsRUFBQyxJQUFJO0lBQ25DLFdBQVcsRUFBQyxJQUFJO0lBQ2hCLFdBQVcsRUFBQyxHQUFHO0lBQ2YsYUFBYSxFQUFDLElBQUk7SUFDbEIsaUJBQWlCLEVBQUMsSUFBSTtDQUNyQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgeyBOUyB9IGZyb20gXCJAbnNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBhbGxCYXNlU2VydmVycyA9IFsnaG9tZScsJ24wMGRsZXMnLCdmb29kbnN0dWZmJywnemVyMCcsJ0NTRUMnLCdzaWdtYS1jb3NtZXRpY3MnLCdqb2VzZ3VucycsJ2hvbmctZmFuZy10ZWEnLCdoYXJha2lyaS1zdXNoaScsJ25lY3Rhci1uZXQnLCduZW8tbmV0JywndGhlLWh1YicsJ3piLWluc3RpdHV0ZScsJ2xleG8tY29ycCcsJ2FldnVtLXBvbGljZScsJ0kuSS5JLkknLCdyaG8tY29uc3RydWN0aW9uJywnbmV0bGluaycsJ3N5c2NvcmUnLCdjYXRhbHlzdCcsJ2NydXNoLWZpdG5lc3MnLCdvbWVnYS1uZXQnLCdtYXgtaGFyZHdhcmUnLCdzaWx2ZXItaGVsaXgnLCdwaGFudGFzeScsJ2NvbXB1dGVrJywncm90aG1hbi11bmknLCdhbHBoYS1lbnQnLCdzdW1taXQtdW5pJywnbWlsbGVuaXVtLWZpdG5lc3MnLCdnYWxhY3RpYy1jeWJlcicsJ2Flcm9jb3JwJywnb21uaWEnLCdkZWZjb21tJywnc29sYXJpcycsJ3RhaXlhbmctZGlnaXRhbCcsJ3VuaXRhbGlmZScsJ2ljYXJ1cycsJ3piLWRlZicsJ3RpdGFuLWxhYnMnLCdmdWxjcnVtdGVjaCcsJ29tbml0ZWsnLCd1bml2LWVuZXJneScsJ3pldXMtbWVkJywnaW5mb2NvbW0nLCdhcHBsaWVkLWVuZXJnZXRpY3MnLCdzdG9ybXRlY2gnLCdydW40dGhlaDExMXonLCd2aXRhbGlmZScsJzRzaWdtYScsJ2ItYW5kLWEnLCdmdWxjcnVtYXNzZXRzJywnVGhlLUNhdmUnLCdwb3dlcmhvdXNlLWZpdG5lc3MnLCcuJywnYmxhZGUnLCdud28nLCdlY29ycCcsJ21lZ2Fjb3JwJywnY2xhcmtpbmMnLCdub3ZhLW1lZCcsJ21pY3JvZHluZScsJ2hlbGlvcycsJ2t1YWktZ29uZycsJ2dsb2JhbC1waGFybScsJ3NuYXAtZml0bmVzcycsJ2RlbHRhb25lJywnam9obnNvbi1vcnRobycsJ2F2bW5pdGUtMDJoJywnaXJvbi1neW0nLCdkYXJrd2ViJ107XHJcblxyXG5leHBvcnQgY29uc3QgaGFja2luZ1Rvb2xzOiBSZWNvcmQ8c3RyaW5nLCB7IFByb2dyYW06IHN0cmluZzsgQ29tbWFuZDpzdHJpbmc7IHBvcnRGbGFnOiBzdHJpbmcscHVyY2hhc2VDb3N0Om51bWJlciB9PiA9IHtcclxuICBzc2g6IHsgUHJvZ3JhbTogJ0JydXRlU1NILmV4ZScsIENvbW1hbmQ6ICdicnV0ZXNzaCcsIHBvcnRGbGFnOiAnc3NoUG9ydE9wZW4nLHB1cmNoYXNlQ29zdDo1MDAwMDAgfSxcclxuICBmdHA6IHsgUHJvZ3JhbTogJ0ZUUENyYWNrLmV4ZScsIENvbW1hbmQ6ICdmdHBjcmFjaycsIHBvcnRGbGFnOiAnZnRwUG9ydE9wZW4nLHB1cmNoYXNlQ29zdDoxNTAwMDAwIH0sXHJcbiAgc210cDogeyBQcm9ncmFtOiAncmVsYXlTTVRQLmV4ZScsIENvbW1hbmQ6ICdyZWxheXNtdHAnLCBwb3J0RmxhZzogJ3NtdHBQb3J0T3BlbicscHVyY2hhc2VDb3N0OjUwMDAwMDAgfSxcclxuICBodHRwOiB7IFByb2dyYW06ICdIVFRQV29ybS5leGUnLCBDb21tYW5kOiAnaHR0cHdvcm0nLCBwb3J0RmxhZzogJ2h0dHBQb3J0T3BlbicscHVyY2hhc2VDb3N0OjMwMDAwMDAwIH0sXHJcbiAgc3FsOiB7IFByb2dyYW06ICdTUUxJbmplY3QuZXhlJywgQ29tbWFuZDogJ3NxbGluamVjdCcsIHBvcnRGbGFnOiAnc3FsUG9ydE9wZW4nLHB1cmNoYXNlQ29zdDoyNTAwMDAwMDAgfVxyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgZ2xvYmFsRmlsZXM6UmVjb3JkPHN0cmluZyxzdHJpbmc+ID0ge1xyXG4gIHNlcnZlck1hcDonL2ZpbGVzL3NlcnZlck1hcC5qcycsXHJcbiAgYXZhaWxhYmxlVG9vbHM6Jy9maWxlcy9hdmFpbGFibGVUb29scy5qcycsXHJcbiAgcHJvZ3Jlc3NGbGFnczonL2ZpbGVzL3Byb2dyZXNzRmxhZ3MuanMnLFxyXG4gIHRhcmdldE1hcDonL2ZpbGVzL3RhcmdldE1hcC5qcycsXHJcbiAgZGFlbW9uOicvbWFuYWdlcnMvZGFlbW9uLmpzJyxcclxuICBzZXJ2ZXJNYW5hZ2VyOicvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcydcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGZpbGVzVG9TQ1AgPSBbXHJcbiAgJy9tYW5hZ2Vycy9zY3JpcHRzL2dyb3cuanMnLFxyXG4gICcvbWFuYWdlcnMvc2NyaXB0cy9oYWNrLmpzJyxcclxuICAnL21hbmFnZXJzL3NjcmlwdHMvd2Vha2VuLmpzJ1xyXG5dXHJcblxyXG5leHBvcnQgY29uc3QgaG9tZVNlcnZlciA9ICdob21lJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcnZlckNvbnN0YW50cyA9IHtcclxuICAvKiogVGhlc2UgdmFsdWVzIHRha2VuIGZyb20gdGhlIGdhbWUgZG9jcyAqL1xyXG5tYXhSQU1Ib21lOjEwNzM3NDE4MjQsIC8vIDIgXiAzMFxyXG5tYXhSQU1QdXJjaGFzZWQ6MTA0ODU3NiwgLy8gMl4yMFxyXG5saW1pdFB1cmNoYXNlZFNlcnZlcjoyNSxcclxuc2VydmVyR3Jvd3RoUmF0ZUJhc2U6MS4wMywgLy8gVW5hZGp1c3RlZCBHcm93dGggcmF0ZVxyXG5zZXJ2ZXJHcm93dGhSYXRlTWF4OjEuMDAzNSwgLy8gTWF4aW11bSBwb3NzaWJsZSBncm93dGggcmF0ZSAobWF4IHJhdGUgYWNjb3VudGluZyBmb3Igc2VydmVyIHNlY3VyaXR5KVxyXG5zZXJ2ZXJGb3J0aWZ5QW1vdW50OjAuMDAyLCAvLyBBbW91bnQgYnkgd2hpY2ggc2VydmVyJ3Mgc2VjdXJpdHkgaW5jcmVhc2VzIHdoZW4gaXRzIGhhY2tlZC9ncm93blxyXG5zZXJ2ZXJXZWFrZW5BbW91bnQ6MC4wNSwgLy8gQW1vdW50IGJ5IHdoaWNoIHNlcnZlcidzIHNlY3VyaXR5IGRlY3JlYXNlcyB3aGVuIHdlYWtlbmVkXHJcbmNvc3RQZXJHQkhvbWU6MzIwMDAsXHJcbmNvc3RQZXJHQlNlcnZlcjo1NTAwMCxcclxuLyoqIG15IGN1c3RvbSB2YXJpYWJsZXMgKi9cclxubWluR0JQdXJjaGFzZWRTZXJ2ZXI6OCxcclxubmFtZVJvb3RQdXJjaGFzZWRTZXJ2ZXI6XCJGcmFjYXMtXCIsXHJcbm1heFBlcmNlbnRhZ2VUb1NwZW5kUGVyVXBncmFkZTowLjA1LFxyXG5yYW1Db3N0R3JvdzoxLjc1LFxyXG5yYW1Db3N0SGFjazoxLjcsXHJcbnJhbUNvc3RXZWFrZW46MS43NSxcclxuaGFja0Ftb3VudFRvU3RlYWw6MC4wNVxyXG59Il19