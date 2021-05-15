import {convertFromRaw,convertToRaw} from 'draft-js';
import { ContentState} from "react-draft-wysiwyg";


export class EditorStateTransformer2 {
    //For transforming  EditorState object to json(string)
    public static convertToString(document:ContentState):string{
        return JSON.stringify(convertToRaw(document));
    }

    // From json to ContentState
    public static convertToContentState(data:string):ContentState{
        return convertFromRaw(JSON.parse(data));        
    }
}
