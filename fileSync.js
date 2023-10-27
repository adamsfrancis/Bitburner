/** @param {NS} ns */

const baseURL = 'https://raw.githubusercontent.com/adamsfrancis/Bitburner/main/'

const fileList = [
    'libs/constants.js',
    'utilities/hackingTools/grow.js',
    'utilities/hackingTools/hack.js',
    'utilities/hackingTools/weaken.js',
    'utilities/userTriggered/cleanHome.js',
    'utilities/userTriggered/getServerInfo.js',
    'utilities/getToolsAvailable.js',
    'utilities/spider.js'
]

export async function main(ns) {
    for(let file in fileList){
        await ns.wget(baseURL+fileList[file],fileList[file])
    }
  }