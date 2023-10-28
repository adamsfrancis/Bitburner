/** @param {NS} ns */

const baseURL = 'https://raw.githubusercontent.com/adamsfrancis/Bitburner/main/'

const fileList = [
    'classes/serverBase.js',
    'libs/constants.js',
    'managers/crackServers.js',
    'managers/daemon.js',
    'utilities/hackingTools/getToolsAvailable.js',
    'utilities/hackingTools/grow.js',
    'utilities/hackingTools/hack.js',
    'utilities/hackingTools/weaken.js',
    'utilities/userTriggered/cleanHome.js',
    'utilities/userTriggered/getServerInfo.js',
    'utilities/createServer.js',
    'utilities/helpers.js'
]

export async function main(ns) {
    await cleanUp(ns);
    ns.tprint("Cleanup complete, moving on to downloads.")
    for(let file in fileList){
        if(await !ns.wget(baseURL+fileList[file],fileList[file])){
            ns.tprint("Failed to download: " + fileList[file])
        }

    }
    ns.tprint("Files downloaded, ready to run.")
  }

  async function cleanUp(ns){
    const allFiles = ns.ls("home");
  
    const jsFiles = allFiles.filter(file => file.endsWith(".js"));
  
    for(let file in jsFiles){
        ns.rm(jsFiles[file]);
    }
  }