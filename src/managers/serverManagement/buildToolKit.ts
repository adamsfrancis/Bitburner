import { toolKit } from "/classes/toolKit";
import { updateAvailableTools } from "/managers/serverManagement/getToolsAvailable";
import { readAndParse } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { NS } from "@ns";
import { toolsData } from "/lib/types";

/** @RAM 0.1 GB */
export async function buildToolKit(ns:NS):Promise<Array<toolKit>> {
    await updateAvailableTools(ns);
    const availableTools:Array<toolsData> = await readAndParse<Array<toolsData>>(ns,globalFiles.availableTools);
    const availableToolkits:Array<toolKit> = [];
    availableTools.forEach((tool) => availableToolkits.push(new toolKit(tool)))
    return availableToolkits;
}
