import {convertFromRaw,convertToRaw} from 'draft-js';
import { ContentState} from "react-draft-wysiwyg";
import Document from '../../../features/editor/domain/entities/document/Document';

export default class EditorStateTransformer {
    //For transforming  EditorState object to json(string)
    public static convertToJson(document:Document):string{
        return JSON.stringify({
            document_id:document.docId,
            content:convertToRaw(document.editorContent)});
    }

    // From json to ContentState
    public static convertToContentState(data:string):ContentState{
        return convertFromRaw(JSON.parse(data));
    }
}

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
