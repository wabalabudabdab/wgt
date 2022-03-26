import { combineReducers }  from 'redux';
import {baseData} from "./basedata";

const rootReducer = combineReducers({
    baseData: baseData
});
export default rootReducer;