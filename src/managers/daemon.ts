import { NS } from "@ns";
import { serverObject } from "/classes/classServer";
import { readAndParse } from "/managers/modules/helpers";
import { filesToSCP, globalFiles, serverConstants } from "/lib/constants";

export async function main(ns:NS) {
    /** Primary target acquired! */
    const primaryTarget:serverObject = await scoreTargetList(ns);

    /** Is the server prepped? If not, let's do that. */
    if(!primaryTarget.isPrepped){
        /** build prep */
        await calculatePrep(ns,primaryTarget);
    }
    
    /** let's get time/thread calculations */
}

async function getTargetList(ns:NS):Promise<Array<serverObject>>{
    const targetList:serverObject[] = await readAndParse(ns,globalFiles.targetMap);
    return targetList;

}

async function scoreTargetList(ns:NS):Promise<serverObject>{

    /** As a base to work from we're going to get the order of magnitude of the max money and use that. */
    
    /** now we have to calculate which one is the best, let's start with growth rate
     *  as a factor. The game formulas divide by 100, so will we, and multiply from the money max
     * calculation.
     */

    /** Then we've got the minimum security level, same idea, we'll divide by 10 and subtract from the
     * money max calculation.
     */

    const targetList:serverObject[] = await getTargetList(ns);
    const targetScores:number[] = [];
    for(let i = 0;i < targetList.length;i++){
        const targetOOM = Math.floor(Math.log10(targetList[i].moneyMax));
        const targetGrowScore = 1 + ((targetList[i].serverGrowth ?? 0)/100);
        const targetMinSecScore = (targetList[i].minDifficulty ?? 1000)/2;
        targetScores.push((targetOOM-targetMinSecScore)*targetGrowScore);
    }

    const highestValueIndex = targetScores.reduce((maxIndex, currentValue, currentIndex, array) => {
        if (currentValue > array[maxIndex]) {
            return currentIndex;
        } else {
            return maxIndex;
        }
    }, 0);

    return targetList[highestValueIndex];

}

async function getUsableServers(ns:NS):Promise<serverObject[]>{
    const curServMap:serverObject[] = await readAndParse(ns,globalFiles.serverMap);
    const usableServers:serverObject[] = curServMap.filter((servObj) => servObj.hasAdminRights === true);
    return usableServers;
}

function calculateAvailableThreads(usableServerList:serverObject[],ramPerThread:number):number{
    return usableServerList.reduce((accumulator,servObj) => accumulator + Math.floor((servObj.ramMax-servObj.ramUsed)/ramPerThread),0)
}

async function sendWave(ns:NS,usableServerList:serverObject[],attackProgram:string,threadsNeeded:number,targetServer:string,targetDate:number,timeToComplete:number):Promise<number>{
    const attackRAMCost:number = attackProgramInformation(attackProgram,'ramCost');
    const fileLocation:string = filesToSCP[attackProgramInformation(attackProgram,'fileLocation')];
    const usableServers:serverObject[] = usableServerList.filter((curServ) => (curServ.ramMax-curServ.ramUsed) > attackRAMCost)
    let waveCounter = 0;
    for(const attackingServer of usableServers){
        let threadsToLaunch = Math.floor((attackingServer.ramMax-attackingServer.ramUsed)/attackRAMCost);
        if((threadsNeeded-waveCounter)<threadsToLaunch){
            threadsToLaunch = threadsNeeded-waveCounter;
        }
        ns.tprint("threads to Launch: " +threadsToLaunch+" / threadsNeeded: " +threadsNeeded + " / waveCounter: " + waveCounter )
        if(threadsToLaunch > 0){
        if(await ns.exec(fileLocation,attackingServer.hostName,threadsToLaunch,targetServer,targetDate,timeToComplete) > 0){
            waveCounter += threadsToLaunch;
        }}

    }

    return waveCounter;
}
function attackProgramInformation(attackProgram: string, informationRequested: string):number {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let result:number = -1;

    switch (informationRequested) {
        case 'fileLocation':
            switch (attackProgram) {
                case 'grow':
                    result = 0;
                    break;
                case 'hack':
                    result = 1;
                    break;
                case 'weaken':
                    result = 2;
            }
            break;

        case 'ramCost':
            switch (attackProgram) {
                case 'grow':
                    result = serverConstants.ramCostGrow;
                    break;
                case 'hack':
                    result = serverConstants.ramCostHack;
                    break;
                case 'weaken':
                    result = serverConstants.ramCostWeaken;
            }
            break;
    }
    return result;
}

async function calculateGrowthThreadsNeeded(ns:NS,primaryTarget:serverObject):Promise<number>{
    const percentageToGrow = Math.ceil(primaryTarget.moneyMax/primaryTarget.moneyAvailable);
    const threadsNeeded = ns.growthAnalyze(primaryTarget.hostName,percentageToGrow)
    return threadsNeeded;
}

async function calculatePrep(ns:NS,primaryTarget:serverObject){
    const usableServers:serverObject[] = await getUsableServers(ns);
    const initialWeaken:number = Math.ceil((primaryTarget.hackDifficulty-primaryTarget.minDifficulty)/serverConstants.serverWeakenAmount);
    const growThreadsNeeded = await calculateGrowthThreadsNeeded(ns,primaryTarget);
    const secondWeakenNeeded = Math.ceil(growThreadsNeeded/5)*2;
    const lastAttackTime = new Date().getTime()+10000;
    const timeToWeaken = await ns.getWeakenTime(primaryTarget.hostName);
    const timeToGrow = await ns.getGrowTime(primaryTarget.hostName);
    /** Can we do the initial weaken in one shot?, if not sleep til weaken fires then go back to servermanager */
    if(initialWeaken >= calculateAvailableThreads(usableServers,serverConstants.ramCostWeaken)){
        const wavesCompleted = await sendWave(ns,usableServers,'weaken',initialWeaken,primaryTarget.hostName,lastAttackTime,timeToWeaken);
        if(wavesCompleted > 0){
            ns.tprint("something went wrong");
        }
        await ns.sleep(lastAttackTime + timeToWeaken + 5000);
        ns.spawn(globalFiles.serverManager,1);
    }
    /** If we can, do the max weaken, then whatever we have left for grow/weaken */
    const canRunFullGrow:boolean = (await calculateAvailableThreads(usableServers,serverConstants.ramCostGrow) < (initialWeaken+growThreadsNeeded+secondWeakenNeeded));
    if(canRunFullGrow){
        let wavesCompleted = await sendWave(ns,usableServers,'weaken',initialWeaken,primaryTarget.hostName,lastAttackTime,timeToWeaken);
        wavesCompleted += await sendWave(ns,usableServers,'grow',growThreadsNeeded,primaryTarget.hostName,lastAttackTime+2000,timeToGrow);
        wavesCompleted += await sendWave(ns,usableServers,'weaken',secondWeakenNeeded,primaryTarget.hostName,lastAttackTime+4000,timeToWeaken);
        ns.tprint("Sent " + wavesCompleted + " to " + primaryTarget.hostName)
        await ns.sleep(lastAttackTime + timeToWeaken + 12000);
        ns.spawn(globalFiles.serverManager,1);
    } else {
        const backupGrowthreads = Math.floor(await calculateAvailableThreads(usableServers,serverConstants.ramCostGrow)/7);
        let wavesCompleted = await sendWave(ns,usableServers,'weaken',initialWeaken,primaryTarget.hostName,lastAttackTime,timeToWeaken);
        wavesCompleted += await sendWave(ns,usableServers,'grow',backupGrowthreads*5,primaryTarget.hostName,lastAttackTime+2000,timeToGrow);
        wavesCompleted += await sendWave(ns,usableServers,'weaken',backupGrowthreads*2,primaryTarget.hostName,lastAttackTime+4000,timeToWeaken);
        ns.tprint("Sent " + wavesCompleted + " to " + primaryTarget.hostName)
        await ns.sleep(lastAttackTime + timeToWeaken + 12000);
        ns.spawn(globalFiles.serverManager,1);
    }
}


/**
 * getGrowTime(host: string): number;
 * getWeakenTime(host: string): number;
 * getHackTime(host: string): number;
 * growthAnalyze(host: string, multiplier: number, cores?: number): number;
 * hackAnalyze(host: string): number;
 * hackAnalyzeThreads(host: string, hackAmount: number): number;
 */