import {convertFromRaw,convertToRaw} from 'draft-js';
import { ContentState} from "react-draft-wysiwyg";

export default class EditorStateTransformer {
    //For transforming  EditorState object to json(string)
    public static convertToJson(data:ContentState):string{
        return JSON.stringify(convertToRaw(data));
    }

    // From json to ContentState
    public static convertToContentState(data:string):ContentState{
        return convertFromRaw(JSON.parse(data));
    }
}