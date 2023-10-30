import { NS } from "@ns";
import { serverConstants } from "./lib/constants";


export async function main(ns:NS) {
    const curMoney:number = await ns.getPlayer().money;
    await ns.upgradePurchasedServer("Fracas-3",16);
    const expectedCost:number = 8*serverConstants.costPerGBServer;
    const postMoney:number = await ns.getPlayer().money;
    ns.tprint("Expected: " + expectedCost +" / Actual: " + (postMoney-curMoney))
}