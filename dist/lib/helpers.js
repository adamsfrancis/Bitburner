/** @RAM 0 GB */
export function stringifyObject(data) {
    const stringifiedObject = JSON.stringify(data);
    return stringifiedObject;
}
/** @RAM 0 GB */
export async function writeToFile(ns, filePath, dataToWrite) {
    await ns.write(filePath, dataToWrite, "w");
}
/** @RAM 0 GB */
export async function readFromFile(ns, filePath) {
    const fileData = await ns.read(filePath);
    return fileData;
}
/** @RAM 0 GB */
export function parseJSON(readData) {
    const parsedData = JSON.parse(readData);
    return parsedData;
}
/** @RAM 0 GB */
export async function readAndParse(ns, filePath) {
    const readData = await readFromFile(ns, filePath);
    const parsedData = parseJSON(readData);
    return parsedData;
}
/** @RAM 0GB */
export async function stringifyAndWrite(ns, objectData, filePath) {
    const stringifiedObject = stringifyObject(objectData);
    await writeToFile(ns, filePath, stringifiedObject);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxnQkFBZ0I7QUFDaEIsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFXO0lBQ3ZDLE1BQU0saUJBQWlCLEdBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUFFRCxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsRUFBSyxFQUFDLFFBQWUsRUFBQyxXQUFrQjtJQUN0RSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsZ0JBQWdCO0FBQ2hCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLEVBQUssRUFBQyxRQUFlO0lBQ3BELE1BQU0sUUFBUSxHQUFVLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBQ0QsZ0JBQWdCO0FBQ2hCLE1BQU0sVUFBVSxTQUFTLENBQUMsUUFBZTtJQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZDLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFDRCxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLEtBQUssVUFBVSxZQUFZLENBQUksRUFBSyxFQUFDLFFBQWU7SUFDdkQsTUFBTSxRQUFRLEdBQVUsTUFBTSxZQUFZLENBQUMsRUFBRSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sVUFBVSxHQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBRUQsZUFBZTtBQUNmLE1BQU0sQ0FBQyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsRUFBSyxFQUFDLFVBQWlCLEVBQUMsUUFBZTtJQUMzRSxNQUFNLGlCQUFpQixHQUFVLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxNQUFNLFdBQVcsQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5TIH0gZnJvbSBcIkBuc1wiO1xyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5T2JqZWN0KGRhdGE6b2JqZWN0KTpzdHJpbmcge1xyXG4gICAgY29uc3Qgc3RyaW5naWZpZWRPYmplY3Q6c3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICByZXR1cm4gc3RyaW5naWZpZWRPYmplY3Q7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlVG9GaWxlKG5zOk5TLGZpbGVQYXRoOnN0cmluZyxkYXRhVG9Xcml0ZTpzdHJpbmcpOlByb21pc2U8dm9pZD57XHJcbiAgICBhd2FpdCBucy53cml0ZShmaWxlUGF0aCxkYXRhVG9Xcml0ZSxcIndcIik7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRGcm9tRmlsZShuczpOUyxmaWxlUGF0aDpzdHJpbmcpOlByb21pc2U8c3RyaW5nPntcclxuICAgIGNvbnN0IGZpbGVEYXRhOnN0cmluZyA9IGF3YWl0IG5zLnJlYWQoZmlsZVBhdGgpO1xyXG4gICAgcmV0dXJuIGZpbGVEYXRhO1xyXG59XHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSlNPTihyZWFkRGF0YTpzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKHJlYWREYXRhKVxyXG4gICAgcmV0dXJuIHBhcnNlZERhdGE7XHJcbn1cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZEFuZFBhcnNlPFQ+KG5zOk5TLGZpbGVQYXRoOnN0cmluZyk6UHJvbWlzZTxUPiB7XHJcbiAgICBjb25zdCByZWFkRGF0YTpzdHJpbmcgPSBhd2FpdCByZWFkRnJvbUZpbGUobnMsZmlsZVBhdGgpO1xyXG4gICAgY29uc3QgcGFyc2VkRGF0YTpUPSBwYXJzZUpTT04ocmVhZERhdGEpO1xyXG4gICAgcmV0dXJuIHBhcnNlZERhdGE7XHJcbn1cclxuXHJcbi8qKiBAUkFNIDBHQiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RyaW5naWZ5QW5kV3JpdGUobnM6TlMsb2JqZWN0RGF0YTpvYmplY3QsZmlsZVBhdGg6c3RyaW5nKTpQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHN0cmluZ2lmaWVkT2JqZWN0OnN0cmluZyA9IHN0cmluZ2lmeU9iamVjdChvYmplY3REYXRhKTtcclxuICAgIGF3YWl0IHdyaXRlVG9GaWxlKG5zLGZpbGVQYXRoLHN0cmluZ2lmaWVkT2JqZWN0KTtcclxufVxyXG5cclxuIl19