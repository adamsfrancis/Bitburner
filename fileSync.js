/** @param {NS} ns */

const baseURL = 'https://raw.githubusercontent.com/adamsfrancis/Bitburner/main/'

const fileList = [
    'classes/serverBase.js',
    'libs/constants.js',
    'managers/daemon.js',
    'utilities/hackingTools/grow.js',
    'utilities/hackingTools/hack.js',
    'utilities/hackingTools/weaken.js',
    'utilities/userTriggered/cleanHome.js',
    'utilities/userTriggered/getServerInfo.js',
    'utilities/getToolsAvailable.js',
    'utilities/helpers.js'
]

export async function main(ns) {
    const allFiles = ns.ls("home");
  
    const jsFiles = allFiles.filter(file => file.endsWith(".js"));
  
    for(let file in jsFiles){
        ns.rm(jsFiles[file]);
    }

    for(let file in fileList){
        await ns.wget(baseURL+fileList[file],fileList[file])
    }
  }