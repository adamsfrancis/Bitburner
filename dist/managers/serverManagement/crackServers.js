import { buildToolKit } from "/managers/serverManagement/buildToolKit";
import { readAndParse, stringifyAndWrite } from "/lib/helpers";
import { globalFiles } from "/lib/constants";
import { getFilteredServerMap } from "/managers/serverManagement/serverHelpers";
/** @RAM 0 GB */
async function getCurrentServerStates(ns) {
    const curServerMap = await readAndParse(ns, globalFiles.serverMap);
    return curServerMap;
}
/** @RAM 0 GB */
export async function allProgressFlagsTrue(ns) {
    const allFlags = await getProgressFlags(ns);
    const allFlagsValues = Object.values(allFlags);
    return allFlagsValues.every((value) => value === true);
}
/** @RAM 0 GB */
async function getProgressFlags(ns) {
    if (await ns.fileExists(globalFiles.progressFlags)) {
        const curProgressFlags = await readAndParse(ns, globalFiles.progressFlags);
        return curProgressFlags;
    }
    else {
        const curProgressFlags = { allBruteSSH: false, allFTPCrack: false, allHTTPWorm: false, allRelaySMTP: false, allSQLInject: false };
        await stringifyAndWrite(ns, curProgressFlags, globalFiles.progressFlags);
        return curProgressFlags;
    }
}
/** @RAM 2.2 GB */
async function updateProgressFlags(ns, toolBox) {
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
    return "all" + programName.replace(".exe", "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhY2tTZXJ2ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hbmFnZXJzL3NlcnZlck1hbmFnZW1lbnQvY3JhY2tTZXJ2ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFDLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUdoRixnQkFBZ0I7QUFDaEIsS0FBSyxVQUFVLHNCQUFzQixDQUFDLEVBQUs7SUFDdkMsTUFBTSxZQUFZLEdBQXVCLE1BQU0sWUFBWSxDQUFzQixFQUFFLEVBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzFHLE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRCxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLEtBQUssVUFBVSxvQkFBb0IsQ0FBQyxFQUFLO0lBQzVDLE1BQU0sUUFBUSxHQUFpQixNQUFNLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sY0FBYyxHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlELE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFBO0FBQ3RELENBQUM7QUFFTCxnQkFBZ0I7QUFDaEIsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEVBQUs7SUFDakMsSUFBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFDO1FBQzlDLE1BQU0sZ0JBQWdCLEdBQWlCLE1BQU0sWUFBWSxDQUFnQixFQUFFLEVBQUMsV0FBVyxD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Q0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5TIH0gZnJvbSBcIkBuc1wiO1xyXG5pbXBvcnQgeyBidWlsZFRvb2xLaXQgfSBmcm9tIFwiL21hbmFnZXJzL3NlcnZlck1hbmFnZW1lbnQvYnVpbGRUb29sS2l0XCI7XHJcbmltcG9ydCB7IHNlcnZlck9iamVjdCB9IGZyb20gXCIvY2xhc3Nlcy9jbGFzc1NlcnZlclwiO1xyXG5pbXBvcnQgeyByZWFkQW5kUGFyc2Usc3RyaW5naWZ5QW5kV3JpdGUgfSBmcm9tIFwiL2xpYi9oZWxwZXJzXCI7XHJcbmltcG9ydCB7IGdsb2JhbEZpbGVzIH0gZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHByb2dyZXNzRmxhZ3MgfSBmcm9tIFwiL2xpYi90eXBlc1wiO1xyXG5pbXBvcnQgeyB0b29sS2l0IH0gZnJvbSBcIi9jbGFzc2VzL3Rvb2xLaXRcIjtcclxuaW1wb3J0IHsgZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAgfSBmcm9tIFwiL21hbmFnZXJzL3NlcnZlck1hbmFnZW1lbnQvc2VydmVySGVscGVyc1wiO1xyXG5cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhuczpOUyk6UHJvbWlzZTxBcnJheTxzZXJ2ZXJPYmplY3Q+PntcclxuICAgIGNvbnN0IGN1clNlcnZlck1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgcmVhZEFuZFBhcnNlPEFycmF5PHNlcnZlck9iamVjdD4+KG5zLGdsb2JhbEZpbGVzLnNlcnZlck1hcClcclxuICAgIHJldHVybiBjdXJTZXJ2ZXJNYXA7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFsbFByb2dyZXNzRmxhZ3NUcnVlKG5zOk5TKTpQcm9taXNlPGJvb2xlYW4+e1xyXG4gICAgY29uc3QgYWxsRmxhZ3M6cHJvZ3Jlc3NGbGFncyA9IGF3YWl0IGdldFByb2dyZXNzRmxhZ3MobnMpO1xyXG4gICAgY29uc3QgYWxsRmxhZ3NWYWx1ZXM6QXJyYXk8Ym9vbGVhbj4gPSBPYmplY3QudmFsdWVzKGFsbEZsYWdzKTtcclxuICAgIHJldHVybiBhbGxGbGFnc1ZhbHVlcy5ldmVyeSgodmFsdWUpID0+IHZhbHVlID09PSB0cnVlKVxyXG4gICAgfVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRQcm9ncmVzc0ZsYWdzKG5zOk5TKTpQcm9taXNlPHByb2dyZXNzRmxhZ3M+e1xyXG4gICAgaWYoYXdhaXQgbnMuZmlsZUV4aXN0cyhnbG9iYWxGaWxlcy5wcm9ncmVzc0ZsYWdzKSl7XHJcbiAgICAgICAgY29uc3QgY3VyUHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzID0gYXdhaXQgcmVhZEFuZFBhcnNlPHByb2dyZXNzRmxhZ3M+KG5zLGdsb2JhbEZpbGVzLnByb2dyZXNzRmxhZ3MpO1xyXG4gICAgICAgIHJldHVybiBjdXJQcm9ncmVzc0ZsYWdzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjdXJQcm9ncmVzc0ZsYWdzOnByb2dyZXNzRmxhZ3MgPSB7YWxsQnJ1dGVTU0g6ZmFsc2UsYWxsRlRQQ3JhY2s6ZmFsc2UsYWxsSFRUUFdvcm06ZmFsc2UsYWxsUmVsYXlTTVRQOmZhbHNlLGFsbFNRTEluamVjdDpmYWxzZX07XHJcbiAgICAgICAgYXdhaXQgc3RyaW5naWZ5QW5kV3JpdGUobnMsY3VyUHJvZ3Jlc3NGbGFncyxnbG9iYWxGaWxlcy5wcm9ncmVzc0ZsYWdzKTtcclxuICAgICAgICByZXR1cm4gY3VyUHJvZ3Jlc3NGbGFncztcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG4vKiogQFJBTSAyLjIgR0IgKi9cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3NGbGFncyhuczpOUyx0b29sQm94OkFycmF5PHRvb2xLaXQ+KXtcclxuICAgIGNvbnN0IGN1clByb2dyZXNzRmxhZ3MgPSBhd2FpdCBnZXRQcm9ncmVzc0ZsYWdzKG5zKTtcclxuICAgIGNvbnN0IGN1clNlcnZlck1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gYXdhaXQgZ2V0Q3VycmVudFNlcnZlclN0YXRlcyhucyk7XHJcbiAgICBmb3IoY29uc3QgdG9vbCBvZiB0b29sQm94KXtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZE1hcDpBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAoY3VyU2VydmVyTWFwLHRvb2wucG9ydEZsYWcsJz09PScsZmFsc2UpO1xyXG4gICAgICAgIGlmKGZpbHRlcmVkTWFwLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgIGN1clByb2dyZXNzRmxhZ3NbY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHRvb2wuUHJvZ3JhbSldID0gdHJ1ZSA/PyBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhd2FpdCBzdHJpbmdpZnlBbmRXcml0ZShucyxjdXJQcm9ncmVzc0ZsYWdzLGdsb2JhbEZpbGVzLnByb2dyZXNzRmxhZ3MpO1xyXG5cclxufVxyXG5cclxuLyoqIEBSQU0gMC4yNSBHQiAqL1xyXG5hc3luYyBmdW5jdGlvbiBhcHBseUF2YWlsYWJsZVRvb2xzKG5zOk5TLHRvb2xCb3g6QXJyYXk8dG9vbEtpdD4sc2VydmVyTWFwOkFycmF5PHNlcnZlck9iamVjdD4scHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzKTpQcm9taXNlPHZvaWQ+e1xyXG4gICAgZm9yKGNvbnN0IHRvb2wgb2YgdG9vbEJveCl7XHJcbiAgICAgICAgaWYoIWFyZVdlRG9uZVdpdGhUaGlzKHByb2dyZXNzRmxhZ3MsY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHRvb2wuUHJvZ3JhbSkpKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRNYXA6QXJyYXk8c2VydmVyT2JqZWN0PiA9IGdldEZpbHRlcmVkU2VydmVyTWFwKHNlcnZlck1hcCx0b29sLnBvcnRGbGFnLCc9PT0nLGZhbHNlKTtcclxuICAgICAgICAgICAgZmlsdGVyZWRNYXAuZm9yRWFjaCgoZmlsdGVyZWRTZXJ2ZXIpPT50b29sLnVzZVRvb2wobnMsdG9vbC5Db21tYW5kLGZpbHRlcmVkU2VydmVyLmhvc3ROYW1lKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZnVuY3Rpb24gY29udmVydFByb2dyYW1Ub0ZsYWdQcm9wKHByb2dyYW1OYW1lOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgcmV0dXJuIFwiYWxsXCIrcHJvZ3JhbU5hbWUucmVwbGFjZShcIi5leGVcIixcIlwiKTtcclxufVxyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5mdW5jdGlvbiBhcmVXZURvbmVXaXRoVGhpcyhwcm9ncmVzc0ZsYWdzOnByb2dyZXNzRmxhZ3MscHJvZ3JhbU5hbWU6c3RyaW5nKTpib29sZWFue1xyXG4gICAgcmV0dXJuIHByb2dyZXNzRmxhZ3NbcHJvZ3JhbU5hbWVdXHJcbn1cclxuXHJcbi8qKiBAUkFNIDIuNDUgR0IgKDAuMjUgZnJvbSBjbGFzcyBUb29sYm94LCAyLjIgZnJvbSB1cGRhdGVTZXJ2ZXJNYXApICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmFja1NlcnZlcnMobnM6TlMpe1xyXG4gICAgY29uc3QgY3VyU2VydmVyTWFwOkFycmF5PHNlcnZlck9iamVjdD4gPSBhd2FpdCBnZXRDdXJyZW50U2VydmVyU3RhdGVzKG5zKTtcclxuICAgIGNvbnN0IHRvb2xCb3g6QXJyYXk8dG9vbEtpdD4gPSBhd2FpdCBidWlsZFRvb2xLaXQobnMpO1xyXG4gICAgYXdhaXQgdXBkYXRlUHJvZ3Jlc3NGbGFncyhucyx0b29sQm94KVxyXG4gICAgY29uc3QgY3VyUHJvZ3Jlc3NGbGFnczpwcm9ncmVzc0ZsYWdzID0gYXdhaXQgZ2V0UHJvZ3Jlc3NGbGFncyhucyk7XHJcbiAgICBhd2FpdCBhcHBseUF2YWlsYWJsZVRvb2xzKG5zLHRvb2xCb3gsY3VyU2VydmVyTWFwLGN1clByb2dyZXNzRmxhZ3MpO1xyXG4gICAgYXdhaXQgdXBkYXRlUHJvZ3Jlc3NGbGFncyhucyx0b29sQm94KTtcclxufSJdfQ==