import { NS } from "@ns";


/** @remarks RAM: 0 GB */
export function stringifyObject(data:object):string {
    const stringifiedObject:string = JSON.stringify(data);
    return stringifiedObject;
}

/** @remarks RAM: 0 GB */
export async function writeToFile(ns:NS,filePath:string,dataToWrite:string):Promise<void>{
    await ns.write(filePath,dataToWrite,"w");
}

/** @remarks RAM: 0 GB */
export async function readFromFile(ns:NS,filePath:string):Promise<string>{
    const fileData:string = await ns.read(filePath);
    return fileData;
}

/** @remarks RAM: 0GB */
export async function stringifyAndWrite(ns:NS,objectData:object,filePath:string):Promise<void> {
    const stringifiedObject:string = stringifyObject(objectData);
    await writeToFile(ns,filePath,stringifiedObject);
}