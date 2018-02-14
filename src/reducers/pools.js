export function poolsHasErrored(state = false, action) {
    switch (action.type) {
        case 'POOLS_HAS_ERRORED':
            return action.error;
        default:
            return state;
    }
}
export function poolsIsLoading(state = false, action) {
    switch (action.type) {
        case 'POOLS_IS_LOADING':
            return action.loading;
        default:
            return state;
    }
}
export function pools(state = [], action) {
    switch (action.type) {
        case 'POOLS_FETCH_DATA_SUCCESS':
            return action.pools;
        default:
            return state;
    }
}