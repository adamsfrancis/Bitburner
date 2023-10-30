import { NS } from "@ns";
import { updateServerMap } from "/managers/serverManager";

export async function main(ns:NS) {
    await updateServerMap(ns)
}