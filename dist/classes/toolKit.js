export class toolKit {
    Program;
    Command;
    portFlag;
    constructor(data) {
        this.Program = data.Program;
        this.Command = data.Command;
        this.portFlag = data.portFlag;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbEtpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL3Rvb2xLaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxPQUFPLE9BQU87SUFDaEIsT0FBTyxDQUFRO0lBQ2YsT0FBTyxDQUFRO0lBQ2YsUUFBUSxDQUFRO0lBRWhCLFlBQVksSUFBYztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNEJBQTRCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBSyxFQUFDLFdBQWtCLEVBQUMsWUFBbUI7UUFDN0QsUUFBTyxXQUFXLEVBQUM7WUFDZixLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDVixLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOU30gZnJvbSBcIkBuc1wiXHJcbmltcG9ydCB7IHRvb2xzRGF0YSB9IGZyb20gXCIvbGliL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgdG9vbEtpdHtcclxuICAgIFByb2dyYW06c3RyaW5nO1xyXG4gICAgQ29tbWFuZDpzdHJpbmc7XHJcbiAgICBwb3J0RmxhZzpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTp0b29sc0RhdGEpe1xyXG4gICAgICAgIHRoaXMuUHJvZ3JhbSA9IGRhdGEuUHJvZ3JhbTtcclxuICAgICAgICB0aGlzLkNvbW1hbmQgPSBkYXRhLkNvbW1hbmQ7XHJcbiAgICAgICAgdGhpcy5wb3J0RmxhZyA9IGRhdGEucG9ydEZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEByZW1hcmtzIFJBTTogMC4yNSBHQiAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVzZVRvb2wobnM6TlMsdG9vbENvbW1hbmQ6c3RyaW5nLHRhcmdldFNlcnZlcjpzdHJpbmcpOlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHN3aXRjaCh0b29sQ29tbWFuZCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JydXRlc3NoJzpcclxuICAgICAgICAgICAgICAgIGF3YWl0IG5zLmJydXRlc3NoKHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZnRwY3JhY2snOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuZnRwY3JhY2sodGFyZ2V0U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyZWxheXNtdHAnOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMucmVsYXlzbXRwKHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaHR0cHdvcm0nOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuaHR0cHdvcm0odGFyZ2V0U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzcWxpbmplY3QnOlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgbnMuc3FsaW5qZWN0KHRhcmdldFNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=