import { NS } from "@ns";
import { toolKit } from "/classes/toolKit";
import { globalFiles, hackingTools, homeServer } from "/lib/constants";
import { stringifyAndWrite } from "/managers/modules/helpers";

export class toolBox{
    toolBox:toolKit[];

    constructor(){
        const tempBox: toolKit[] = [];
        for (const key in hackingTools) {
            const data = hackingTools[key];
            tempBox.push(new toolKit(data,false));
        }
        this.toolBox = tempBox;
    }
    
    *[Symbol.iterator](): IterableIterator<toolKit> {
        for (const tool of this.toolBox) {
            yield tool;
        }
    }

    public async updateToolBox(ns:NS){
        for(const tool of this.toolBox){
            if(!tool.purchasedTool){
                if(await ns.fileExists(tool.Program,homeServer)){
                    tool.purchasedTool = true;
                }
            }
        }
        await stringifyAndWrite(ns,this,globalFiles.availableTools)
    }

    
// public static initializeToolbox(): toolKit[] {
//     const toolBox: toolKit[] = [];
//     for (const key in hackingTools) {
//         const data = hackingTools[key];
//         toolBox.push(new toolKit(data,false));
//     }
//     return toolBox;
// }

    

    /** @remarks RAM: 0.1 GB */
//     async function getAvailableTools(ns: NS): Promise<Array<object>> {
//     const availableTools: Array<object> = [];
//     for (const tool in hackingTools) {
//       const currentTool: string = hackingTools[tool].Program;
//       if (await ns.fileExists(currentTool, "home")) {
//         availableTools.push(hackingTools[tool]);
//       }
//     }
//     return availableTools;
//   }
  
    /** @remarks RAM 0.1GB */
//     export async function updateAvailableTools(ns: NS): Promise<void> {
//     const availableTools: Array<object> = await getAvailableTools(ns);
//     await stringifyAndWrite(ns, availableTools, globalFiles.availableTools);
//   }
}