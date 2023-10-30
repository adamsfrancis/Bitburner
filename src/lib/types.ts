export type toolsData = {
    Program:string;
    Command:string;
    portFlag:string;
    purchaseCost:number;
}

export type progressFlags = {
    allBruteSSH:boolean;
    allFTPCrack:boolean;
    allRelaySMTP:boolean;
    allHTTPWorm:boolean;
    allSQLInject:boolean;
    [key:string]:boolean
}

export type ComparisonOperator = '===' | '<' | '<=' | '>' | '>=';
