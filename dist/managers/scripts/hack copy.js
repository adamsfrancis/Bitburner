/** @inputs targetServer,targetDate.getTime(),timeToComplete */
async function main(ns) {
    const targetServer = ns.args[0];
    const targetDate = ns.args[1];
    const timeToComplete = ns.args[2];
    const myStartTime = targetDate - timeToComplete;
    const mySleepTime = myStartTime - (new Date().getTime());
    await ns.sleep(mySleepTime);
    await ns.weaken(targetServer);
}
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFjayBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hbmFnZXJzL3NjcmlwdHMvaGFjayBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLCtEQUErRDtBQUMvRCxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUs7SUFDckIsTUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVcsQ0FBQztJQUNqRCxNQUFNLFVBQVUsR0FBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBVyxDQUFDO0lBQy9DLE1BQU0sY0FBYyxHQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFXLENBQUM7SUFDbkQsTUFBTSxXQUFXLEdBQVUsVUFBVSxHQUFDLGNBQWMsQ0FBQztJQUNyRCxNQUFNLFdBQVcsR0FBVSxXQUFXLEdBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFOUQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTlMgfSBmcm9tIFwiQG5zXCI7XHJcblxyXG4vKiogQGlucHV0cyB0YXJnZXRTZXJ2ZXIsdGFyZ2V0RGF0ZS5nZXRUaW1lKCksdGltZVRvQ29tcGxldGUgKi9cclxuYXN5bmMgZnVuY3Rpb24gbWFpbihuczpOUyl7XHJcbiAgICBjb25zdCB0YXJnZXRTZXJ2ZXI6c3RyaW5nID0gbnMuYXJnc1swXSBhcyBzdHJpbmc7XHJcbiAgICBjb25zdCB0YXJnZXREYXRlOm51bWJlciA9IG5zLmFyZ3NbMV0gYXMgbnVtYmVyO1xyXG4gICAgY29uc3QgdGltZVRvQ29tcGxldGU6bnVtYmVyID0gbnMuYXJnc1syXSBhcyBudW1iZXI7XHJcbiAgICBjb25zdCBteVN0YXJ0VGltZTpudW1iZXIgPSB0YXJnZXREYXRlLXRpbWVUb0NvbXBsZXRlO1xyXG4gICAgY29uc3QgbXlTbGVlcFRpbWU6bnVtYmVyID0gbXlTdGFydFRpbWUtKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuXHJcbiAgICBhd2FpdCBucy5zbGVlcChteVNsZWVwVGltZSk7XHJcbiAgICBhd2FpdCBucy53ZWFrZW4odGFyZ2V0U2VydmVyKTtcclxuXHJcbn0iXX0=