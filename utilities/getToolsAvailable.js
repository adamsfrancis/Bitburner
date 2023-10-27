import {hackingTools} from '/libs/constants.js'

/** @param {NS} ns */
export async function main(ns) {
  const filesAvailable = ns.ls("home",".exe");
  let toolCount = 0;
  for(let tool in hackingTools){
    if(ns.fileExists(hackingTools[tool],"home")){
      toolCount += 1;
    }
  }
  return toolCount;

}