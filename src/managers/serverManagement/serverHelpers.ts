import { serverObject } from "/classes/classServer";
import { ComparisonOperator } from "/lib/types";


/** @RAM 0 GB */
export function getFilteredServerMap(serverMap: Array<serverObject>, serverProp: string, compOperator: '===', boolValue: boolean): Array<serverObject>;
export function getFilteredServerMap(serverMap: Array<serverObject>, serverProp: string, compOperator: '<' | '<=' | '>' | '>=', numberValue: number): Array<serverObject>;
export function getFilteredServerMap(serverMap: Array<serverObject>, serverProp: string, compOperator: '===', stringValue: string): Array<serverObject>;

export function getFilteredServerMap(serverMap: Array<serverObject>,serverProp: string,compOperator: ComparisonOperator,value: boolean | number | string): Array<serverObject> {
    if(typeof value === 'number'){
        return filterByNumber(serverMap,serverProp,compOperator,value);
    } else {
        const filteredMap:Array<serverObject> = serverMap.filter((currentServer) => currentServer[serverProp] === value);
        return filteredMap;
    }
}

function filterByNumber(serverMap: Array<serverObject>,serverProp: string,compOperator: ComparisonOperator,value: number){
    const filteredMap: Array<serverObject> = serverMap.filter((currentServer) => {
        switch(compOperator){
                    case '===':
                        return currentServer[serverProp] === value;
                    case '<':
                        return currentServer[serverProp] as number < value; 
                    case '<=':
                        return currentServer[serverProp] as number <= value;
                    case '>':
                        return currentServer[serverProp] as number > value;
                    case '>=':
                        return currentServer[serverProp] as number >= value;
                }
            });
            return filteredMap;
        }