export function poolsHasErrored(bool) {
    return {
        type: 'POOLS_HAS_ERRORED',
        error: bool
    };
}
export function poolsIsLoading(bool) {
    return {
        type: 'POOLS_IS_LOADING',
        loading: bool
    };
}
export function poolsFetchDataSuccess(pools) {
    return {
        type: 'POOLS_FETCH_DATA_SUCCESS',
        pools
    };
}

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(poolsHasErrored(true));
        }, 5000);
    };
}

export function poolsFetchData(url) {
    return (dispatch) => {
        dispatch(poolsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(poolsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((pools) => {
				pools.array = Object.keys(pools.data).map(function (key) { return pools.data[key]; });
				dispatch(poolsFetchDataSuccess(pools))
			})
            .catch(() => dispatch(poolsHasErrored(true)));
    };
}