import { combineReducers } from 'redux';
import simpleReducer from './SimpleReducer';
import animationReducer from './AnimationReducer';

export default combineReducers({
 simpleReducer,
 animationReducer
});
