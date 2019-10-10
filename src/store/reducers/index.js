import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import pictureDetailsReducer from './picture-details';
import pictureEditorReducer from './picture-editor';
import pictureFormDataReducer from './picture-form-data';
import picturePostRequestReducer from './picture-post-request';
import picturesGetRequestReducer from './pictures-get-request';


export const rootReducer = combineReducers({
  pictureDetails: pictureDetailsReducer,
  pictureEditor: pictureEditorReducer,
  pictureFormData: pictureFormDataReducer,
  picturePostRequest: picturePostRequestReducer,
  picturesGetRequest: picturesGetRequestReducer,
  form: formReducer,
});
