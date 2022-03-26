import axios from "axios";

export function basedataFetchDataSuccess(baseData) {
    return {
        type: "BASEDATA_FETCH_DATA_SUCCESS",
        baseData
    }
}


export function basedataFetchData(url){

    return (dispatch) => {
    axios.get(url)
            .then(response =>
            {
                console.log(response.data)

                return response.data
            })
            .then(baseData => dispatch(basedataFetchDataSuccess(baseData)))
    }
}