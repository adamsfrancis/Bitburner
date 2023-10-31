export function getFilteredServerMap(serverMap, serverProp, compOperator, value) {
    if (typeof value === 'number') {
        return filterByNumber(serverMap, serverProp, compOperator, value);
    }
    else {
        const filteredMap = serverMap.filter((currentServer) => currentServer[serverProp] === value);
        return filteredMap;
    }
}
/** @RAM 0 GB */
function filterByNumber(serverMap, serverProp, compOperator, value) {
    const filteredMap = serverMap.filter((currentServer) => {
        switch (compOperator) {
            case '===':
                return currentServer[serverProp] === value;
            case '<':
                return currentServer[serverProp] < value;
            case '<=':
                return currentServer[serverProp] <= value;
            case '>':
                return currentServer[serverProp] > value;
            case '>=':
                return currentServer[serverProp] >= value;
        }
    });
    return filteredMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFuYWdlcnMvbW9kdWxlcy9nZXRGaWx0ZXJlZFNlcnZlck1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsU0FBOEIsRUFBQyxVQUFrQixFQUFDLFlBQWdDLEVBQUMsS0FBZ0M7SUFDcEosSUFBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUM7UUFDekIsT0FBTyxjQUFjLENBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEU7U0FBTTtRQUNILE1BQU0sV0FBVyxHQUF1QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDakgsT0FBTyxXQUFXLENBQUM7S0FDdEI7QUFDTCxDQUFDO0FBQ0QsZ0JBQWdCO0FBQ2hCLFNBQVMsY0FBYyxDQUFDLFNBQThCLEVBQUMsVUFBa0IsRUFBQyxZQUFnQyxFQUFDLEtBQWE7SUFDcEgsTUFBTSxXQUFXLEdBQXdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtRQUN4RSxRQUFPLFlBQVksRUFBQztZQUNSLEtBQUssS0FBSztnQkFDTixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDL0MsS0FBSyxHQUFHO2dCQUNKLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBVyxHQUFHLEtBQUssQ0FBQztZQUN2RCxLQUFLLElBQUk7Z0JBQ0wsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFXLElBQUksS0FBSyxDQUFDO1lBQ3hELEtBQUssR0FBRztnQkFDSixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQVcsR0FBRyxLQUFLLENBQUM7WUFDdkQsS0FBSyxJQUFJO2dCQUNMLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBVyxJQUFJLEtBQUssQ0FBQztTQUMzRDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlcnZlck9iamVjdCB9IGZyb20gXCIvY2xhc3Nlcy9jbGFzc1NlcnZlclwiO1xyXG5pbXBvcnQgeyBDb21wYXJpc29uT3BlcmF0b3IgfSBmcm9tIFwiL2xpYi90eXBlc1wiO1xyXG5cclxuLyoqIEBSQU0gMCBHQiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAoc2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+LCBzZXJ2ZXJQcm9wOiBzdHJpbmcsIGNvbXBPcGVyYXRvcjogJz09PScsIGJvb2xWYWx1ZTogYm9vbGVhbik6IEFycmF5PHNlcnZlck9iamVjdD47XHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlcmVkU2VydmVyTWFwKHNlcnZlck1hcDogQXJyYXk8c2VydmVyT2JqZWN0Piwgc2VydmVyUHJvcDogc3RyaW5nLCBjb21wT3BlcmF0b3I6ICc8JyB8ICc8PScgfCAnPicgfCAnPj0nLCBudW1iZXJWYWx1ZTogbnVtYmVyKTogQXJyYXk8c2VydmVyT2JqZWN0PjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJlZFNlcnZlck1hcChzZXJ2ZXJNYXA6IEFycmF5PHNlcnZlck9iamVjdD4sIHNlcnZlclByb3A6IHN0cmluZywgY29tcE9wZXJhdG9yOiAnPT09Jywgc3RyaW5nVmFsdWU6IHN0cmluZyk6IEFycmF5PHNlcnZlck9iamVjdD47XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyZWRTZXJ2ZXJNYXAoc2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+LHNlcnZlclByb3A6IHN0cmluZyxjb21wT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvcix2YWx1ZTogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyk6IEFycmF5PHNlcnZlck9iamVjdD4ge1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyl7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlckJ5TnVtYmVyKHNlcnZlck1hcCxzZXJ2ZXJQcm9wLGNvbXBPcGVyYXRvcix2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTWFwOkFycmF5PHNlcnZlck9iamVjdD4gPSBzZXJ2ZXJNYXAuZmlsdGVyKChjdXJyZW50U2VydmVyKSA9PiBjdXJyZW50U2VydmVyW3NlcnZlclByb3BdID09PSB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTWFwO1xyXG4gICAgfVxyXG59XHJcbi8qKiBAUkFNIDAgR0IgKi9cclxuZnVuY3Rpb24gZmlsdGVyQnlOdW1iZXIoc2VydmVyTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+LHNlcnZlclByb3A6IHN0cmluZyxjb21wT3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvcix2YWx1ZTogbnVtYmVyKXtcclxuICAgIGNvbnN0IGZpbHRlcmVkTWFwOiBBcnJheTxzZXJ2ZXJPYmplY3Q+ID0gc2VydmVyTWFwLmZpbHRlcigoY3VycmVudFNlcnZlcikgPT4ge1xyXG4gICAgICAgIHN3aXRjaChjb21wT3BlcmF0b3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJz09PSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2VydmVyW3NlcnZlclByb3BdID09PSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc8JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTZXJ2ZXJbc2VydmVyUHJvcF0gYXMgbnVtYmVyIDwgdmFsdWU7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzw9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTZXJ2ZXJbc2VydmVyUHJvcF0gYXMgbnVtYmVyIDw9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJz4nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFNlcnZlcltzZXJ2ZXJQcm9wXSBhcyBudW1iZXIgPiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc+PSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2VydmVyW3NlcnZlclByb3BdIGFzIG51bWJlciA+PSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZE1hcDtcclxuICAgICAgICB9Il19