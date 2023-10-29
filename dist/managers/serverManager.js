import { globalFiles } from "/lib/constants";
import { serverObject } from "/classes/classServer";
async function getServerStructure(ns) {
    /** Initial run variable setup, we want to start from "home", and follow the network from there.
     *  Since home is the base level, it's parent will be null. Saving parents for possible backdoor
     *  shennanigans later.
     */
    const startingServer = "home";
    const discoveredServers = new Map();
    discoveredServers.set(startingServer, undefined);
    // Function to recursively discover servers
    async function discoverServers(server) {
        const adjacentServers = ns.scan(server);
        for (const serverName of adjacentServers) {
            if (!discoveredServers.has(serverName)) {
                discoveredServers.set(serverName, server); // Store the server that discovered it
                await discoverServers(serverName); // Recursive call to discover adjacent servers
            }
        }
    }
    await discoverServers(startingServer);
    return discoveredServers;
}
async function getAllServerInfo(ns, serverMap) {
    const allServers = [];
    for (const [currentServer, parentServer] of serverMap) {
        const currentServerInfo = ns.getServer(currentServer);
        const serverObj = new serverObject(currentServerInfo, parentServer);
        allServers.push(serverObj);
    }
    return allServers;
}
async function stringifyServerMap(ns, serverMap) {
    const stringifiedMap = JSON.stringify(serverMap);
    await ns.write(globalFiles.serverMap, stringifiedMap, "w");
}
export async function main(ns) {
    /** Get the server structure */
    // eslint-disable-next-line no-constant-condition
    const serverStructure = await getServerStructure(ns);
    const serverMap = await getAllServerInfo(ns, serverStructure);
    await stringifyServerMap(ns, serverMap);
    await ns.sleep(1000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNcEQsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEVBQUs7SUFDbkM7OztPQUdHO0lBRUgsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDO0lBQzlCLE1BQU0saUJBQWlCLEdBQW1DLElBQUksR0FBRyxFQUFFLENBQUM7SUFDcEUsaUJBQWlCLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVqRCwyQ0FBMkM7SUFDM0MsS0FBSyxVQUFVLGVBQWUsQ0FBQyxNQUFhO1FBQ3hDLE1BQU0sZUFBZSxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakQsS0FBSyxNQUFNLFVBQVUsSUFBSSxlQUFlLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDcEMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztnQkFDakYsTUFBTSxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7YUFDcEY7U0FDQTtJQUNMLENBQUM7SUFDRCxNQUFNLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0QyxPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFFRCxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsRUFBTSxFQUFFLFNBQTBDO0lBQzlFLE1BQU0sVUFBVSxHQUF3QixFQUFFLENBQUM7SUFFM0MsS0FBSyxNQUFNLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUNyRCxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1QjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsRUFBSyxFQUFDLFNBQXdCO0lBQzlELE1BQU0sY0FBYyxHQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFNSCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFLO0lBQzVCLCtCQUErQjtJQUMvQixpREFBaUQ7SUFFakQsTUFBTSxlQUFlLEdBQWtDLE1BQU0sa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEYsTUFBTSxTQUFTLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0QsTUFBTSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOUyB9IGZyb20gXCJAbnNcIjtcclxuXHJcbmltcG9ydCB7IGdsb2JhbEZpbGVzIH0gZnJvbSBcIi9saWIvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IHNlcnZlck9iamVjdCB9IGZyb20gXCIvY2xhc3Nlcy9jbGFzc1NlcnZlclwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclN0cnVjdHVyZShuczpOUyk6UHJvbWlzZTxNYXA8c3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWQ+PiB7XHJcbiAgICAvKiogSW5pdGlhbCBydW4gdmFyaWFibGUgc2V0dXAsIHdlIHdhbnQgdG8gc3RhcnQgZnJvbSBcImhvbWVcIiwgYW5kIGZvbGxvdyB0aGUgbmV0d29yayBmcm9tIHRoZXJlLlxyXG4gICAgICogIFNpbmNlIGhvbWUgaXMgdGhlIGJhc2UgbGV2ZWwsIGl0J3MgcGFyZW50IHdpbGwgYmUgbnVsbC4gU2F2aW5nIHBhcmVudHMgZm9yIHBvc3NpYmxlIGJhY2tkb29yXHJcbiAgICAgKiAgc2hlbm5hbmlnYW5zIGxhdGVyLlxyXG4gICAgICovXHJcblxyXG4gICAgY29uc3Qgc3RhcnRpbmdTZXJ2ZXIgPSBcImhvbWVcIjtcclxuICAgIGNvbnN0IGRpc2NvdmVyZWRTZXJ2ZXJzOk1hcDxzdHJpbmcsc3RyaW5nIHwgIHVuZGVmaW5lZD4gPSBuZXcgTWFwKCk7XHJcbiAgICBkaXNjb3ZlcmVkU2VydmVycy5zZXQoc3RhcnRpbmdTZXJ2ZXIsIHVuZGVmaW5lZCk7XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgZGlzY292ZXIgc2VydmVyc1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZGlzY292ZXJTZXJ2ZXJzKHNlcnZlcjpzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhZGphY2VudFNlcnZlcnM6c3RyaW5nW10gPSBucy5zY2FuKHNlcnZlcik7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgc2VydmVyTmFtZSBvZiBhZGphY2VudFNlcnZlcnMpIHtcclxuICAgICAgICBpZiAoIWRpc2NvdmVyZWRTZXJ2ZXJzLmhhcyhzZXJ2ZXJOYW1lKSkge1xyXG4gICAgICAgICAgICBkaXNjb3ZlcmVkU2VydmVycy5zZXQoc2VydmVyTmFtZSwgc2VydmVyKTsgLy8gU3RvcmUgdGhlIHNlcnZlciB0aGF0IGRpc2NvdmVyZWQgaXRcclxuICAgICAgICAgICAgYXdhaXQgZGlzY292ZXJTZXJ2ZXJzKHNlcnZlck5hbWUpOyAvLyBSZWN1cnNpdmUgY2FsbCB0byBkaXNjb3ZlciBhZGphY2VudCBzZXJ2ZXJzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGF3YWl0IGRpc2NvdmVyU2VydmVycyhzdGFydGluZ1NlcnZlcik7XHJcbiAgICByZXR1cm4gZGlzY292ZXJlZFNlcnZlcnM7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFNlcnZlckluZm8obnM6IE5TLCBzZXJ2ZXJNYXA6IE1hcDxzdHJpbmcsIHN0cmluZyB8IHVuZGVmaW5lZD4pOlByb21pc2U8QXJyYXk8c2VydmVyT2JqZWN0Pj4ge1xyXG4gICAgY29uc3QgYWxsU2VydmVyczogQXJyYXk8c2VydmVyT2JqZWN0PiA9IFtdO1xyXG4gIFxyXG4gICAgZm9yIChjb25zdCBbY3VycmVudFNlcnZlciwgcGFyZW50U2VydmVyXSBvZiBzZXJ2ZXJNYXApIHtcclxuICAgICAgY29uc3QgY3VycmVudFNlcnZlckluZm8gPSBucy5nZXRTZXJ2ZXIoY3VycmVudFNlcnZlcik7XHJcbiAgICAgIGNvbnN0IHNlcnZlck9iaiA9IG5ldyBzZXJ2ZXJPYmplY3QoY3VycmVudFNlcnZlckluZm8sIHBhcmVudFNlcnZlcik7XHJcbiAgICAgIGFsbFNlcnZlcnMucHVzaChzZXJ2ZXJPYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhbGxTZXJ2ZXJzO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBmdW5jdGlvbiBzdHJpbmdpZnlTZXJ2ZXJNYXAobnM6TlMsc2VydmVyTWFwOnNlcnZlck9iamVjdFtdKSB7XHJcbiAgICBjb25zdCBzdHJpbmdpZmllZE1hcDpzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShzZXJ2ZXJNYXApO1xyXG4gICAgYXdhaXQgbnMud3JpdGUoZ2xvYmFsRmlsZXMuc2VydmVyTWFwLHN0cmluZ2lmaWVkTWFwLFwid1wiKTtcclxuICB9XHJcbiAgXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFpbihuczpOUyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLyoqIEdldCB0aGUgc2VydmVyIHN0cnVjdHVyZSAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxyXG4gICAgXHJcbiAgICBjb25zdCBzZXJ2ZXJTdHJ1Y3R1cmU6TWFwPHN0cmluZyxzdHJpbmcgfCB1bmRlZmluZWQ+ID0gYXdhaXQgZ2V0U2VydmVyU3RydWN0dXJlKG5zKTtcclxuICAgIGNvbnN0IHNlcnZlck1hcCA9IGF3YWl0IGdldEFsbFNlcnZlckluZm8obnMsc2VydmVyU3RydWN0dXJlKTtcclxuICAgIGF3YWl0IHN0cmluZ2lmeVNlcnZlck1hcChucyxzZXJ2ZXJNYXApO1xyXG5cclxuICAgIGF3YWl0IG5zLnNsZWVwKDEwMDApO1xyXG4gICAgXHJcbn0iXX0=