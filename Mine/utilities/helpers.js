/** @param {NS} ns */

export async function printMap(inputMap){
for (const [key, value] of inputMap.entries()) {
    ns.tprint(`Key: ${key}, Value: ${value}`);
  }
}