export function baseData(state = {}, action){
    switch(action.type){
        case "BASEDATA_FETCH_DATA_SUCCESS":
            return action.baseData;
        default:
            return state;
    }
}