import { buildToolKit } from "/managers/serverManagement/buildToolKit";
import { readAndParse, stringifyAndWrite } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { updateServerMap } from "/managers/serverManager";
import { getFilteredServerMap } from "/managers/serverManagement/serverHelpers";
/** @RAM 0 GB */
async function getCurrentServerStates(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    return curServerMap;
}
/** @RAM 0 GB */
export async function allProgressFlagsTrue(ns) {
    const allFlags = await getProgressFlags(ns);
    ns.tprint("Got flags.");
    const allFlagsValues = Object.values(allFlags);
    ns.tprint("Got values.");
    return allFlagsValues.every((value) => value === true);
}
/** @RAM 0 GB */
async function getProgressFlags(ns) {
    try {
        const curProgressFlags = await readAndParse(ns, globalFiles.progressFlags);
        return curProgressFlags;
    }
    catch {
        const curProgressFlags = { allBruteSSH: false, allFTPCrack: false, allHTTPWorm: false, allRelaySMTP: false, allSQLInject: false };
        return curProgressFlags;
    }
}
/** @RAM 2.2 GB */
async function updateProgressFlags(ns, toolBox) {
    await updateServerMap(ns);
    const curProgressFlags = await getProgressFlags(ns);
    const curServerMap = await getCurrentServerStates(ns);
    for (const tool of toolBox) {
        const filteredMap = getFilteredServerMap(curServerMap, tool.portFlag, '===', false);
        if (filteredMap.length === 0) {
            curProgressFlags[convertProgramToFlagProp(tool.Program)] = true ?? false;
        }
    }
    await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);
}
/** @RAM 0.25 GB */
async function applyAvailableTools(ns, toolBox, serverMap, progressFlags) {
    for (const tool of toolBox) {
        if (!areWeDoneWithThis(progressFlags, convertProgramToFlagProp(tool.Program))) {
            const filteredMap = getFilteredServerMap(serverMap, tool.portFlag, '===', false);
            filteredMap.forEach((filteredServer) => tool.useTool(ns, tool.Command, filteredServer.hostName));
        }
    }
}
/** @RAM 0 GB */
function convertProgramToFlagProp(programName) {
    return "all" + programName;
}
/** @RAM 0 GB */
function areWeDoneWithThis(progressFlags, programName) {
    return progressFlags[programName];
}
/** @RAM 2.45 GB (0.25 from class Toolbox, 2.2 from updateServerMap) */
export async function crackServers(ns) {
    const curServerMap = await getCurrentServerStates(ns);
    const toolBox = await buildToolKit(ns);
    await updateProgressFlags(ns, toolBox);
    const curProgressFlags = await getProgressFlags(ns);
    await applyAvailableTools(ns, toolBox, curServerMap, curProgressFlags);
    await updateProgressFlags(ns, toolBox);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhY2tTZXJ2ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hbmFnZXJzL3NlcnZlck1hbmFnZW1lbnQvY3JhY2tTZXJ2ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFDLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFHaEYsZ0JBQWdCO0FBQ2hCLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxFQUFLO0lBQ3ZDLE1BQU0sWUFBWSxHQUF1QixNQUFNLFlBQVksQ0FBc0IsRUFBRSxFQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMxRyxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQsZ0JBQWdCO0FBQ2hCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFBSztJQUM1QyxNQUFNLFFBQVEsR0FBaUIsTUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRCxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sY0FBYyxHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlELEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDeEIsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUE7QUFDMUQsQ0FBQztBQUVELGdCQUFnQjtBQUNoQixLQUFLLFVBQVUsZ0JBQWdCLENB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QU0sbUJBQW1CLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOUyB9IGZyb20gXCJAbnNcIjtcclxuaW1wb3J0IHsgYnVpbGRUb29sS2l0IH0gZnJvbSBcIi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VtZW50L2J1aWxkVG9vbEtpdFwiO1xyXG5pbXBvcnQgeyBzZXJ2ZXJPYmplY3QgfSBmcm9tIFwiL2NsYXNzZXMvY2xhc3NTZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmVhZEFuZFBhcnNlLHN0cmluZ2lmeUFuZFdyaXRlIH0gZnJvbSBcIi9saWIvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBnbG9iYWxGaWxlcyB9IGZyb20gXCIvbGliL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBwcm9ncmVzc0ZsYWdzIH0gZnJvbSBcIi9saWIvdHlwZXNcIjtcclxuaW1wb3J0IHsgdG9vbEtpdCB9IGZyb20gXCIvY2xhc3Nlcy90b29sS2l0XCI7XHJcbmltcG9ydCB7IHVwZGF0ZVNlcnZlck1hcCB9IGZyb20gXCIvbWFuYWdlcnMvc2VydmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBnZXRGaWx0ZXJlZFNlcnZlck1hcCB9IGZyb20gXCIvbWFuYWdlcnMvc2VydmVyTWFuYWdlbWVudC9zZXJ2ZXJIZWxwZXJzXCI7XHJcblxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50U2VydmVyU3RhdGVzKG5zOk5TKTpQcm9taXNlPEFycmF5PHNlcnZlck9iamVjdD4+e1xyXG4gICAgY29uc3QgY3VyU2VydmVyTWFwOkFycmF5PHNlcnZlck9iamVjdD4gPSBhd2FpdCByZWFkQW5kUGFyc2U8QXJyYXk8c2VydmVyT2JqZWN0Pj4obnMsZ2xvYmFsRmlsZXMuc2VydmVyTWFwKVxyXG4gICAgcmV0dXJuIGN1clNlcnZlck1hcDtcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWxsUHJvZ3Jlc3NGbGFnc1RydWUobnM6TlMpOlByb21pc2U8Ym9vbGVhbj57XHJcbiAgICBjb25zdCBhbGxGbGFnczpwcm9ncmVzc0ZsYWdzID0gYXdhaXQgZ2V0UHJvZ3Jlc3NGbGFncyhucyk7XHJcbiAgICBucy50cHJpbnQoXCJHb3QgZmxhZ3MuXCIpXHJcbiAgICBjb25zdCBhbGxGbGFnc1ZhbHVlczpBcnJheTxib29sZWFuPiA9IE9iamVjdC52YWx1ZXMoYWxsRmxhZ3MpO1xyXG4gICAgbnMudHByaW50KFwiR290IHZhbHVlcy5cIilcclxuICAgIHJldHVybiBhbGxGbGFnc1ZhbHVlcy5ldmVyeSgodmFsdWUpID0+IHZhbHVlID09PSB0cnVlKVxyXG59XHJcblxyXG4vKiogQFJBTSAwIEdCICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFByb2dyZXNzRmxhZ3MobnM6TlMpOlByb21pc2U8cHJvZ3Jlc3NGbGFncz57XHJcbiAgICB0cnl7XHJcbiAgICAgICAgY29uc3QgY3VyUHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzID0gYXdhaXQgcmVhZEFuZFBhcnNlPHByb2dyZXNzRmxhZ3M+KG5zLGdsb2JhbEZpbGVzLnByb2dyZXNzRmxhZ3MpO1xyXG4gICAgICAgIHJldHVybiBjdXJQcm9ncmVzc0ZsYWdzO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgICAgY29uc3QgY3VyUHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzID0ge2FsbEJydXRlU1NIOmZhbHNlLGFsbEZUUENyYWNrOmZhbHNlLGFsbEhUVFBXb3JtOmZhbHNlLGFsbFJlbGF5U01UUDpmYWxzZSxhbGxTUUxJbmplY3Q6ZmFsc2V9O1xyXG4gICAgICAgIHJldHVybiBjdXJQcm9ncmVzc0ZsYWdzO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbi8qKiBAUkFNIDIuMiBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzc0ZsYWdzKG5zOk5TLHRvb2xCb3g6QXJyYXk8dG9vbEtpdD4pe1xyXG4gICAgYXdhaXQgdXBkYXRlU2VydmVyTWFwKG5zKTtcclxuICAgIGNvbnN0IGN1clByb2dyZXNzRmxhZ3MgPSBhd2FpdCBnZXRQcm9ncmVzc0ZsYWdzKG5zKTtcclxuICAgIGNvbnN0IGN1clNlcnZlck1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgICBmb3IoY29uc3QgdG9vbCBvZiB0b29sQm94KXtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZE1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAoY3VyU2VydmVyTWFwLHRvb2wucG9ydEZsYWcsJz09PScsZmFsc2UpO1xyXG4gICAgICAgIGlmKGZpbHRlcmVkTWFwLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgIGN1clByb2dyZXNzRmxhZ3NbY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHRvb2wuUHJvZ3JhbSldID0gdHJ1ZSA/PyBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhd2FpdCBzdHJpbmdpZnlBbmRXcml0ZShucyxjdXJQcm9ncmVzc0ZsYWdzLGdsb2JhbEZpbGVzLnByb2dyZXNzRmxhZ3MpO1xyXG5cclxufVxyXG5cclxuLyoqIEBSQU0gMC4yNSBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiBhcHBseUF2YWlsYWJsZVRvb2xzKG5zOk5TLHRvb2xCb3g6QXJyYXk8dG9vbEtpdD4sc2VydmVyTWFwOkFycmF5PHNlcnZlck9iamVjdD4scHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzKTpQcm9taXNlPHZvaWQ+e1xyXG4gICAgZm9yKGNvbnN0IHRvb2wgb2YgdG9vbEJveCl7XHJcbiAgICAgICAgaWYoIWFyZVdlRG9uZVdpdGhUaGlzKHByb2dyZXNzRmxhZ3MsY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHRvb2wuUHJvZ3JhbSkpKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRNYXA6QXJyYXk8c2VydmVyT2JqZWN0PiA9IGdldEZpbHRlcmVkU2VydmVyTWFwKHNlcnZlck1hcCx0b29sLnBvcnRGbGFnLCc9PT0nLGZhbHNlKTtcclxuICAgICAgICAgICAgZmlsdGVyZWRNYXAuZm9yRWFjaCgoZmlsdGVyZWRTZXJ2ZXIpPT50b29sLnVzZVRvb2wobnMsdG9vbC5Db21tYW5kLGZpbHRlcmVkU2VydmVyLmhvc3ROYW1lKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZnVuY3Rpb24gY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHByb2dyYW1OYW1lOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgcmV0dXJuIFwiYWxsXCIrcHJvZ3JhbU5hbWU7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZnVuY3Rpb24gYXJlV2VEb25lV2l0aFRoaXMocHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzLHByb2dyYW1OYW1lOnN0cmluZyk6Ym9vbGVhbntcclxuICAgIHJldHVybiBwcm9ncmVzc0ZsYWdzW3Byb2dyYW1OYW1lXVxyXG59XHJcblxyXG4vKiogQFJBTSAyLjQ1IEdCICgwLjI1IGZyb20gY2xhc3MgVG9vbGJveCwgMi4yIGZyb20gdXBkYXRlU2VydmVyTWFwKSAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JhY2tTZXJ2ZXJzKG5zOk5TKXtcclxuICAgIGNvbnN0IGN1clNlcnZlck1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgICBjb25zdCB0b29sQm94OkFycmF5PHRvb2xLaXQ+ID0gYXdhaXQgYnVpbGRUb29sS2l0KG5zKTtcclxuICAgIGF3YWl0IHVwZGF0ZVByb2dyZXNzRmxhZ3MobnMsdG9vbEJveClcclxuICAgIGNvbnN0IGN1clByb2dyZXNzRmxhZ3M6cHJvZ3Jlc3NGbGFncyA9IGF3YWl0IGdldFByb2dyZXNzRmxhZ3MobnMpO1xyXG4gICAgYXdhaXQgYXBwbHlBdmFpbGFibGVUb29scyhucyx0b29sQm94LGN1clNlcnZlck1hcCxjdXJQcm9ncmVzc0ZsYWdzKTtcclxuICAgIGF3YWl0IHVwZGF0ZVByb2dyZXNzRmxhZ3MobnMsdG9vbEJveCk7XHJcbn0iXX0=