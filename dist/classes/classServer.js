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
    constructor(data, parentServer) {
        this.backdoorInstalled = data.backdoorInstalled ?? false;
        this.baseDifficulty = data.baseDifficulty ?? 0;
        this.cpuCores = data.cpuCores;
        this.ftpPortOpen = data.ftpPortOpen;
        this.hackDifficulty = data.hackDifficulty ?? 0;
        this.hasAdminRights = data.hasAdminRights;
        this.hostName = data.hostname;
        this.httpPortOpen = data.httpPortOpen;
        this.isConnectedTo = data.isConnectedTo;
        this.ramMax = data.maxRam;
        this.minDifficulty = data.minDifficulty ?? 999999;
        this.moneyAvailable = data.moneyAvailable ?? -1;
        this.moneyMax = data.moneyMax;
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NTZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xhc3Nlcy9jbGFzc1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sWUFBWTtJQUNyQixpQkFBaUIsQ0FBVztJQUM1QixjQUFjLENBQVU7SUFDeEIsUUFBUSxDQUFTO0lBQ2pCLFdBQVcsQ0FBVTtJQUNyQixjQUFjLENBQVU7SUFDeEIsY0FBYyxDQUFVO0lBQ3hCLFFBQVEsQ0FBUztJQUNqQixZQUFZLENBQVU7SUFDdEIsYUFBYSxDQUFVO0lBQ3ZCLE1BQU0sQ0FBUztJQUNmLGFBQWEsQ0FBVTtJQUN2QixjQUFjLENBQVU7SUFDeEIsUUFBUSxDQUFVO0lBQ2xCLG9CQUFvQixDQUFVO0lBQzlCLGFBQWEsQ0FBVTtJQUN2QixpQkFBaUIsQ0FBVTtJQUMzQixPQUFPLENBQVM7SUFDaEIsb0JBQW9CLENBQVU7SUFDOUIsWUFBWSxDQUFVO0lBQ3RCLFlBQVksQ0FBVTtJQUN0QixXQUFXLENBQVU7SUFDckIsV0FBVyxDQUFVO0lBQ3JCLFlBQVksQ0FBVTtJQUN0QixZQUFZLENBQVM7SUFHckIsWUFBWSxJQUFXLEVBQUUsWUFBZ0M7UUFFakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxNQUFNLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUN6QyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tIFwiQG5zXCI7XHJcblxyXG5leHBvcnQgY2xhc3Mgc2VydmVyT2JqZWN0e1xyXG4gICAgYmFja2Rvb3JJbnN0YWxsZWQ/OiBib29sZWFuO1xyXG4gICAgYmFzZURpZmZpY3VsdHk/OiBudW1iZXI7XHJcbiAgICBjcHVDb3JlczogbnVtYmVyO1xyXG4gICAgZnRwUG9ydE9wZW46IGJvb2xlYW47XHJcbiAgICBoYWNrRGlmZmljdWx0eT86IG51bWJlcjtcclxuICAgIGhhc0FkbWluUmlnaHRzOiBib29sZWFuO1xyXG4gICAgaG9zdE5hbWU6IHN0cmluZztcclxuICAgIGh0dHBQb3J0T3BlbjogYm9vbGVhbjtcclxuICAgIGlzQ29ubmVjdGVkVG86IGJvb2xlYW47XHJcbiAgICByYW1NYXg6IG51bWJlcjtcclxuICAgIG1pbkRpZmZpY3VsdHk/OiBudW1iZXI7XHJcbiAgICBtb25leUF2YWlsYWJsZT86IG51bWJlcjtcclxuICAgIG1vbmV5TWF4PzogbnVtYmVyO1xyXG4gICAgbnVtT3BlblBvcnRzUmVxdWlyZWQ/OiBudW1iZXI7XHJcbiAgICBvcGVuUG9ydENvdW50PzogbnVtYmVyO1xyXG4gICAgcHVyY2hhc2VkQnlQbGF5ZXI6IGJvb2xlYW47XHJcbiAgICByYW1Vc2VkOiBudW1iZXI7XHJcbiAgICByZXF1aXJlZEhhY2tpbmdTa2lsbD86IG51bWJlcjtcclxuICAgIHNlcnZlckdyb3d0aD86IG51bWJlcjtcclxuICAgIHNtdHBQb3J0T3BlbjogYm9vbGVhbjtcclxuICAgIHNxbFBvcnRPcGVuOiBib29sZWFuO1xyXG4gICAgc3NoUG9ydE9wZW46IGJvb2xlYW47XHJcbiAgICBwYXJlbnRTZXJ2ZXI/OiBzdHJpbmc7XHJcbiAgICByYW1BdmFpbGFibGU6IG51bWJlcjtcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTpTZXJ2ZXIsIHBhcmVudFNlcnZlcjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmJhY2tkb29ySW5zdGFsbGVkID0gZGF0YS5iYWNrZG9vckluc3RhbGxlZCA/PyBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iYXNlRGlmZmljdWx0eSA9IGRhdGEuYmFzZURpZmZpY3VsdHkgPz8gMDtcclxuICAgICAgICAgICAgdGhpcy5jcHVDb3JlcyA9IGRhdGEuY3B1Q29yZXM7XHJcbiAgICAgICAgICAgIHRoaXMuZnRwUG9ydE9wZW4gPSBkYXRhLmZ0cFBvcnRPcGVuO1xyXG4gICAgICAgICAgICB0aGlzLmhhY2tEaWZmaWN1bHR5ID0gZGF0YS5oYWNrRGlmZmljdWx0eSA/PyAwOyBcclxuICAgICAgICAgICAgdGhpcy5oYXNBZG1pblJpZ2h0cyA9IGRhdGEuaGFzQWRtaW5SaWdodHM7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdE5hbWUgPSBkYXRhLmhvc3RuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBQb3J0T3BlbiA9IGRhdGEuaHR0cFBvcnRPcGVuO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29ubmVjdGVkVG8gPSBkYXRhLmlzQ29ubmVjdGVkVG87XHJcbiAgICAgICAgICAgIHRoaXMucmFtTWF4ID0gZGF0YS5tYXhSYW07XHJcbiAgICAgICAgICAgIHRoaXMubWluRGlmZmljdWx0eSA9IGRhdGEubWluRGlmZmljdWx0eSA/PyA5OTk5OTk7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXlBdmFpbGFibGUgPSBkYXRhLm1vbmV5QXZhaWxhYmxlID8/IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vbmV5TWF4ID0gZGF0YS5tb25leU1heDtcclxuICAgICAgICAgICAgdGhpcy5udW1PcGVuUG9ydHNSZXF1aXJlZCA9IGRhdGEubnVtT3BlblBvcnRzUmVxdWlyZWQ7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblBvcnRDb3VudCA9IGRhdGEub3BlblBvcnRDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWRCeVBsYXllciA9IGRhdGEucHVyY2hhc2VkQnlQbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMucmFtVXNlZCA9IGRhdGEucmFtVXNlZDtcclxuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZEhhY2tpbmdTa2lsbCA9IGRhdGEucmVxdWlyZWRIYWNraW5nU2tpbGwgPz8gOTk5OTk5O1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlckdyb3d0aCA9IGRhdGEuc2VydmVyR3Jvd3RoID8/IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnNtdHBQb3J0T3BlbiA9IGRhdGEuc210cFBvcnRPcGVuO1xyXG4gICAgICAgICAgICB0aGlzLnNxbFBvcnRPcGVuID0gZGF0YS5zcWxQb3J0T3BlbjtcclxuICAgICAgICAgICAgdGhpcy5zc2hQb3J0T3BlbiA9IGRhdGEuc3NoUG9ydE9wZW47XHJcbiAgICAgICAgICAgIHRoaXMucmFtQXZhaWxhYmxlID0gZGF0YS5tYXhSYW0tZGF0YS5yYW1Vc2VkID8/IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50U2VydmVyID0gcGFyZW50U2VydmVyOyAgICAgICBcclxuICAgIH1cclxufSJdfQ==