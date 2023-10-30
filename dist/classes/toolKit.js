export class toolKit {
    Program;
    Command;
    portFlag;
    purhcaseCost;
    purchasedTool;
    constructor(data, purchasedTool) {
        this.Program = data.Program;
        this.Command = data.Command;
        this.portFlag = data.portFlag;
        this.purhcaseCost = data.purchaseCost;
        this.purchasedTool = this.purchasedTool ?? false;
    }
    /** @remarks RAM: 0.25 GB */
    async useTool(ns, toolCommand, targetServer) {
        switch (toolCommand) {
            case 'brutessh':
                await ns.brutessh(targetServer);
                break;
            case 'ftpcrack':
                await ns.ftpcrack(targetServer);
                break;
            case 'relaysmtp':
                await ns.relaysmtp(targetServer);
                break;
            case 'httpworm':
                await ns.httpworm(targetServer);
                break;
            case 'sqlinject':
                await ns.sqlinject(targetServer);
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbEtpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL3Rvb2xLaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxPQUFPLE9BQU87SUFDaEIsT0FBTyxDQUFRO0lBQ2YsT0FBTyxDQUFRO0lBQ2YsUUFBUSxDQUFRO0lBQ2hCLFlBQVksQ0FBUTtJQUNwQixhQUFhLENBQVU7SUFFdkIsWUFBWSxJQUFjLEVBQUMsYUFBcUI7UUFFNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUM7SUFDckQsQ0FBQztJQUVELDRCQUE0QjtJQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUssRUFBQyxXQUFrQixFQUFDLFlBQW1CO1FBQzdELFFBQU8sV0FBVyxFQUFDO1lBQ2YsS0FBSyxVQUFVO2dCQUNYLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBQ1osTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TlN9IGZyb20gXCJAbnNcIlxyXG5pbXBvcnQgeyB0b29sc0RhdGEgfSBmcm9tIFwiL2xpYi90eXBlc1wiO1xyXG5pbXBvcnQgeyBoYWNraW5nVG9vbHMgfSBmcm9tIFwiL2xpYi9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyB0b29sS2l0e1xyXG4gICAgUHJvZ3JhbTpzdHJpbmc7XHJcbiAgICBDb21tYW5kOnN0cmluZztcclxuICAgIHBvcnRGbGFnOnN0cmluZztcclxuICAgIHB1cmhjYXNlQ29zdDpudW1iZXI7XHJcbiAgICBwdXJjaGFzZWRUb29sPzpib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6dG9vbHNEYXRhLHB1cmNoYXNlZFRvb2w6Ym9vbGVhbil7XHJcblxyXG4gICAgICAgIHRoaXMuUHJvZ3JhbSA9IGRhdGEuUHJvZ3JhbTtcclxuICAgICAgICB0aGlzLkNvbW1hbmQgPSBkYXRhLkNvbW1hbmQ7XHJcbiAgICAgICAgdGhpcy5wb3J0RmxhZyA9IGRhdGEucG9ydEZsYWc7XHJcbiAgICAgICAgdGhpcy5wdXJoY2FzZUNvc3QgPSBkYXRhLnB1cmNoYXNlQ29zdDtcclxuICAgICAgICB0aGlzLnB1cmNoYXNlZFRvb2wgPSB0aGlzLnB1cmNoYXNlZFRvb2wgPz8gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEByZW1hcmtzIFJBTTogMC4yNSBHQiAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVzZVRvb2wobnM6TlMsdG9vbENvbW1hbmQ6c3RyaW5nLHRhcmdldFNlcnZlcjpzdHJpbmcpOlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHN3aXRjaCh0b29sQ29tbWFuZCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JydXRlc3NoJzpcclxuICAgICAgICAgICAgICAgIGF3YWl0IG5zLmJydXRlc3NoKHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZnRwY3JhY2snOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuZnRwY3JhY2sodGFyZ2V0U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyZWxheXNtdHAnOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMucmVsYXlzbXRwKHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaHR0cHdvcm0nOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuaHR0cHdvcm0odGFyZ2V0U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzcWxpbmplY3QnOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuc3FsaW5qZWN0KHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==