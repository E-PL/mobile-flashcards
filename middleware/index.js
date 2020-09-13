/*
* Middleware
*/
import { applyMiddleware } from 'redux';
// Import thunk just in case async action creator will be needed in the future
import thunk from 'redux-thunk';
// Import Redux-logger to log actions to console
import logger from 'redux-logger';

export default applyMiddleware(thunk, logger);