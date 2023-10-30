import { NS } from "@ns";

/** @inputs targetServer,targetDate.getTime(),timeToComplete */
export async function main(ns:NS){
    const targetServer:string = ns.args[0] as string;
    const targetDate:number = ns.args[1] as number;
    const timeToComplete:number = ns.args[2] as number;
    const myStartTime:number = targetDate-timeToComplete;
    const mySleepTime:number = myStartTime-(new Date().getTime());

    await ns.sleep(mySleepTime);
    await ns.weaken(targetServer);

}