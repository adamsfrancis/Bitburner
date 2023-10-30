export class serverObject {
    backdoorInstalled;
    baseDifficulty;
    cpuCores;
    ftpPortOpen;
    hackDifficulty;
    hasAdminRights;
    hostName;
    httpPortOpen;
    isConnectedTo;
    ramMax;
    minDifficulty;
    moneyAvailable;
    moneyMax;
    numOpenPortsRequired;
    openPortCount;
    purchasedByPlayer;
    ramUsed;
    requiredHackingSkill;
    serverGrowth;
    smtpPortOpen;
    sqlPortOpen;
    sshPortOpen;
    parentServer;
    ramAvailable;
    filesAvailable;
    constructor(ns, data, parentServer) {
        this.backdoorInstalled = data.backdoorInstalled ?? false;
        this.baseDifficulty = data.baseDifficulty ?? 0;
        this.cpuCores = data.cpuCores;
        this.ftpPortOpen = data.ftpPortOpen;
        this.hackDifficulty = data.hackDifficulty ?? 999999;
        this.hasAdminRights = data.hasAdminRights;
        this.hostName = data.hostname;
        this.httpPortOpen = data.httpPortOpen;
        this.isConnectedTo = data.isConnectedTo;
        this.ramMax = data.maxRam;
        this.minDifficulty = data.minDifficulty ?? 999999;
        this.moneyAvailable = data.moneyAvailable ?? -1;
        this.moneyMax = data.moneyMax ?? -1;
        this.numOpenPortsRequired = data.numOpenPortsRequired;
        this.openPortCount = data.openPortCount;
        this.purchasedByPlayer = data.purchasedByPlayer;
        this.ramUsed = data.ramUsed;
        this.requiredHackingSkill = data.requiredHackingSkill ?? 999999;
        this.serverGrowth = data.serverGrowth ?? -1;
        this.smtpPortOpen = data.smtpPortOpen;
        this.sqlPortOpen = data.sqlPortOpen;
        this.sshPortOpen = data.sshPortOpen;
        this.ramAvailable = data.maxRam - data.ramUsed ?? 0;
        this.parentServer = parentServer;
        this.filesAvailable = ns.ls(data.hostname);
    }
    isPrepped() {
        return (this.hackDifficulty === this.minDifficulty && this.moneyAvailable === this.moneyMax);
    }
    needsGrow() {
        return (this.moneyAvailable !== this.moneyMax);
    }
    needsWeaken() {
        return (this.hackDifficulty !== this.minDifficulty);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xhc3Nlcy9jbGFzc1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sWUFBWTtJQUNyQixpQkFBaUIsQ0FBVztJQUM1QixjQUFjLENBQVU7SUFDeEIsUUFBUSxDQUFTO0lBQ2pCLFdBQVcsQ0FBVTtJQUNyQixjQUFjLENBQVM7SUFDdkIsY0FBYyxDQUFVO0lBQ3hCLFFBQVEsQ0FBUztJQUNqQixZQUFZLENBQVU7SUFDdEIsYUFBYSxDQUFVO0lBQ3ZCLE1BQU0sQ0FBUztJQUNmLGFBQWEsQ0FBUztJQUN0QixjQUFjLENBQVU7SUFDeEIsUUFBUSxDQUFTO0lBQ2pCLG9CQUFvQixDQUFVO0lBQzlCLGFBQWEsQ0FBVTtJQUN2QixpQkFBaUIsQ0FBVTtJQUMzQixPQUFPLENBQVM7SUFDaEIsb0JBQW9CLENBQVU7SUFDOUIsWUFBWSxDQUFVO0lBQ3RCLFlBQVksQ0FBVTtJQUN0QixXQUFXLENBQVU7SUFDckIsV0FBVyxDQUFVO0lBQ3JCLFlBQVksQ0FBVTtJQUN0QixZQUFZLENBQVM7SUFDckIsY0FBYyxDQUFVO0lBR3hCLFlBQVksRUFBSyxFQUFDLElBQVcsRUFBRSxZQUFnQztRQUV2RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLE1BQU0sQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNNLFNBQVM7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFDTSxTQUFTO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDTSxXQUFXO1FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZlcixOUyB9IGZyb20gXCJAbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBzZXJ2ZXJPYmplY3R7XHJcbiAgICBiYWNrZG9vckluc3RhbGxlZD86IGJvb2xlYW47XHJcbiAgICBiYXNlRGlmZmljdWx0eT86IG51bWJlcjtcclxuICAgIGNwdUNvcmVzOiBudW1iZXI7XHJcbiAgICBmdHBQb3J0T3BlbjogYm9vbGVhbjtcclxuICAgIGhhY2tEaWZmaWN1bHR5OiBudW1iZXI7XHJcbiAgICBoYXNBZG1pblJpZ2h0czogYm9vbGVhbjtcclxuICAgIGhvc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBodHRwUG9ydE9wZW46IGJvb2xlYW47XHJcbiAgICBpc0Nvbm5lY3RlZFRvOiBib29sZWFuO1xyXG4gICAgcmFtTWF4OiBudW1iZXI7XHJcbiAgICBtaW5EaWZmaWN1bHR5OiBudW1iZXI7XHJcbiAgICBtb25leUF2YWlsYWJsZT86IG51bWJlcjtcclxuICAgIG1vbmV5TWF4OiBudW1iZXI7XHJcbiAgICBudW1PcGVuUG9ydHNSZXF1aXJlZD86IG51bWJlcjtcclxuICAgIG9wZW5Qb3J0Q291bnQ/OiBudW1iZXI7XHJcbiAgICBwdXJjaGFzZWRCeVBsYXllcjogYm9vbGVhbjtcclxuICAgIHJhbVVzZWQ6IG51bWJlcjtcclxuICAgIHJlcXVpcmVkSGFja2luZ1NraWxsPzogbnVtYmVyO1xyXG4gICAgc2VydmVyR3Jvd3RoPzogbnVtYmVyO1xyXG4gICAgc210cFBvcnRPcGVuOiBib29sZWFuO1xyXG4gICAgc3FsUG9ydE9wZW46IGJvb2xlYW47XHJcbiAgICBzc2hQb3J0T3BlbjogYm9vbGVhbjtcclxuICAgIHBhcmVudFNlcnZlcj86IHN0cmluZztcclxuICAgIHJhbUF2YWlsYWJsZTogbnVtYmVyO1xyXG4gICAgZmlsZXNBdmFpbGFibGU6c3RyaW5nW107XHJcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5zOk5TLGRhdGE6U2VydmVyLCBwYXJlbnRTZXJ2ZXI6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5iYWNrZG9vckluc3RhbGxlZCA9IGRhdGEuYmFja2Rvb3JJbnN0YWxsZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmFzZURpZmZpY3VsdHkgPSBkYXRhLmJhc2VEaWZmaWN1bHR5ID8/IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY3B1Q29yZXMgPSBkYXRhLmNwdUNvcmVzO1xyXG4gICAgICAgICAgICB0aGlzLmZ0cFBvcnRPcGVuID0gZGF0YS5mdHBQb3J0T3BlbjtcclxuICAgICAgICAgICAgdGhpcy5oYWNrRGlmZmljdWx0eSA9IGRhdGEuaGFja0RpZmZpY3VsdHkgPz8gOTk5OTk5OyBcclxuICAgICAgICAgICAgdGhpcy5oYXNBZG1pblJpZ2h0cyA9IGRhdGEuaGFzQWRtaW5SaWdodHM7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdE5hbWUgPSBkYXRhLmhvc3RuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBQb3J0T3BlbiA9IGRhdGEuaHR0cFBvcnRPcGVuO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkVG8gPSBkYXRhLmlzQ29ubmVjdGVkVG87XHJcbiAgICAgICAgICAgIHRoaXMucmFtTWF4ID0gZGF0YS5tYXhSYW07XHJcbiAgICAgICAgICAgIHRoaXMubWluRGlmZmljdWx0eSA9IGRhdGEubWluRGlmZmljdWx0eSA/PyA5OTk5OTk7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXlBdmFpbGFibGUgPSBkYXRhLm1vbmV5QXZhaWxhYmxlID8/IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vbmV5TWF4ID0gZGF0YS5tb25leU1heCA/PyAtMTtcclxuICAgICAgICAgICAgdGhpcy5udW1PcGVuUG9ydHNSZXF1aXJlZCA9IGRhdGEubnVtT3BlblBvcnRzUmVxdWlyZWQ7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblBvcnRDb3VudCA9IGRhdGEub3BlblBvcnRDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWRCeVBsYXllciA9IGRhdGEucHVyY2hhc2VkQnlQbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMucmFtVXNlZCA9IGRhdGEucmFtVXNlZDtcclxuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZEhhY2tpbmdTa2lsbCA9IGRhdGEucmVxdWlyZWRIYWNraW5nU2tpbGwgPz8gOTk5OTk5O1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlckdyb3d0aCA9IGRhdGEuc2VydmVyR3Jvd3RoID8/IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnNtdHBQb3J0T3BlbiA9IGRhdGEuc210cFBvcnRPcGVuO1xyXG4gICAgICAgICAgICB0aGlzLnNxbFBvcnRPcGVuID0gZGF0YS5zcWxQb3J0T3BlbjtcclxuICAgICAgICAgICAgdGhpcy5zc2hQb3J0T3BlbiA9IGRhdGEuc3NoUG9ydE9wZW47XHJcbiAgICAgICAgICAgIHRoaXMucmFtQXZhaWxhYmxlID0gZGF0YS5tYXhSYW0tZGF0YS5yYW1Vc2VkID8/IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50U2VydmVyID0gcGFyZW50U2VydmVyO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzQXZhaWxhYmxlID0gbnMubHMoZGF0YS5ob3N0bmFtZSk7ICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNQcmVwcGVkKCl7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhY2tEaWZmaWN1bHR5ID09PSB0aGlzLm1pbkRpZmZpY3VsdHkgJiYgdGhpcy5tb25leUF2YWlsYWJsZSA9PT0gdGhpcy5tb25leU1heCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbmVlZHNHcm93KCl7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vbmV5QXZhaWxhYmxlICE9PSB0aGlzLm1vbmV5TWF4KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBuZWVkc1dlYWtlbigpe1xyXG4gICAgICAgIHJldHVybiAodGhpcy5oYWNrRGlmZmljdWx0eSAhPT0gdGhpcy5taW5EaWZmaWN1bHR5KTtcclxuICAgIH1cclxufSJdfQ==