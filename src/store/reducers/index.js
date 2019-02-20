import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import pictureFetchReducer from './pictureFetch';
import pictureEditorReducer from './pictureEditor';
import pictureDataReducer from './pictureData';


export const rootReducer = combineReducers({
  pictureFetch: pictureFetchReducer,
  pictureEditor: pictureEditorReducer,
  pictureData: pictureDataReducer,
  form: formReducer
});
