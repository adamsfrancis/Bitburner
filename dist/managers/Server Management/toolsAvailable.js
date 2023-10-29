import { hackingTools, globalFiles } from "/lib/constants";
import { stringifyAndWrite } from "/lib/helpers";
/** @remarks RAM: 0.2 GB */
async function getAvailableTools(ns) {
    const playerFiles = await ns.ls("home", "*.exe");
    const availableTools = [];
    for (const tool in hackingTools) {
        if (hackingTools[tool].Program in playerFiles) {
            availableTools.push(hackingTools[tool]);
        }
    }
    return availableTools;
}
/** @remarks RAM 0.2GB */
export async function main(ns) {
    const availableTools = await getAvailableTools(ns);
    await stringifyAndWrite(ns, availableTools, globalFiles.availableTools);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNBdmFpbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFuYWdlcnMvU2VydmVyIE1hbmFnZW1lbnQvdG9vbHNBdmFpbGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBQyxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHakQsMkJBQTJCO0FBQzNCLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxFQUFLO0lBQ2xDLE1BQU0sV0FBVyxHQUFpQixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlELE1BQU0sY0FBYyxHQUFpQixFQUFFLENBQUM7SUFDeEMsS0FBSSxNQUFNLElBQUksSUFBSSxZQUFZLEVBQUM7UUFDM0IsSUFBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQztZQUN6QyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzNDO0tBQ0o7SUFDRCxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDO0FBRUQseUJBQXlCO0FBQ3pCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUs7SUFDNUIsTUFBTSxjQUFjLEdBQWlCLE1BQU0saUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakUsTUFBTSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUMsY0FBYyxFQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTlMgfSBmcm9tIFwiQG5zXCI7XHJcbmltcG9ydCB7IGhhY2tpbmdUb29scyxnbG9iYWxGaWxlcyB9IGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBzdHJpbmdpZnlBbmRXcml0ZSB9IGZyb20gXCIvbGliL2hlbHBlcnNcIjtcclxuXHJcblxyXG4vKiogQHJlbWFya3MgUkFNOiAwLjIgR0IgKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0QXZhaWxhYmxlVG9vbHMobnM6TlMpOlByb21pc2U8QXJyYXk8b2JqZWN0Pj57XHJcbiAgICBjb25zdCBwbGF5ZXJGaWxlczpBcnJheTxzdHJpbmc+ID0gYXdhaXQgbnMubHMoXCJob21lXCIsXCIqLmV4ZVwiKTtcclxuICAgIGNvbnN0IGF2YWlsYWJsZVRvb2xzOkFycmF5PG9iamVjdD4gPSBbXTtcclxuICAgIGZvcihjb25zdCB0b29sIGluIGhhY2tpbmdUb29scyl7XHJcbiAgICAgICAgaWYoaGFja2luZ1Rvb2xzW3Rvb2xdLlByb2dyYW0gaW4gcGxheWVyRmlsZXMpe1xyXG4gICAgICAgICAgICBhdmFpbGFibGVUb29scy5wdXNoKGhhY2tpbmdUb29sc1t0b29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF2YWlsYWJsZVRvb2xzO1xyXG59XHJcblxyXG4vKiogQHJlbWFya3MgUkFNIDAuMkdCICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWluKG5zOk5TKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGF2YWlsYWJsZVRvb2xzOkFycmF5PG9iamVjdD4gPSBhd2FpdCBnZXRBdmFpbGFibGVUb29scyhucyk7XHJcbiAgICBhd2FpdCBzdHJpbmdpZnlBbmRXcml0ZShucyxhdmFpbGFibGVUb29scyxnbG9iYWxGaWxlcy5hdmFpbGFibGVUb29scyk7XHJcbn0iXX0=