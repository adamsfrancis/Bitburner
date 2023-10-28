/** @param {NS} ns */

export async function main(ns) {
    const allFiles = ns.ls("home");
  
    const jsFiles = allFiles.filter(file => file.endsWith(".js"));
  
    for(let file in jsFiles){
        ns.rm(jsFiles[file]);
    }
  }