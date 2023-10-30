import { NS } from "@ns";

/** @RAM 0 GB */
export function stringifyObject(data:object):string {
    const stringifiedObject:string = JSON.stringify(data);
    return stringifiedObject;
}

/** @RAM 0 GB */
export async function writeToFile(ns:NS,filePath:string,dataToWrite:string):Promise<void>{
    await ns.write(filePath,dataToWrite,"w");
}

/** @RAM 0 GB */
export async function readFromFile(ns:NS,filePath:string):Promise<string>{
    const fileData:string = await ns.read(filePath);
    return fileData;
}
/** @RAM 0 GB */
export function parseJSON(readData:string) {
    const parsedData = JSON.parse(readData)
    return parsedData;
}
/** @RAM 0 GB */
export async function readAndParse<T>(ns:NS,filePath:string):Promise<T> {
    const readData:string = await readFromFile(ns,filePath);
    const parsedData:T= parseJSON(readData);
    return parsedData;
}

/** @RAM 0 GB */
export async function stringifyAndWrite(ns:NS,objectData:object,filePath:string):Promise<void> {
    const stringifiedObject:string = stringifyObject(objectData);
    
    await writeToFile(ns,filePath,stringifiedObject);
}
/** @RAM 0 GB */
export function timeDifference(firstTime:Date,secondTime:Date){
    return +secondTime - +firstTime;
  }