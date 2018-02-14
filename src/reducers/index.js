import { combineReducers } from 'redux';
import { pools, poolsHasErrored, poolsIsLoading } from './pools';

export default combineReducers({
    pools,
    poolsHasErrored,
    poolsIsLoading
});