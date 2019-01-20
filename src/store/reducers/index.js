import {combineReducers} from 'redux';
import pictureFetchReducer from './pictureFetch';
import pictureEditorReducer from './pictureEditor';
import pictureDataReducer from './pictureData';


export const rootReducer = combineReducers({
  pictureFetch: pictureFetchReducer,
  pictureEditor: pictureEditorReducer,
  pictureData: pictureDataReducer
});
