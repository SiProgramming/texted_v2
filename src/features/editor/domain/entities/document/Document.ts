import {ContentState, EditorState} from "react-draft-wysiwyg";

export default class Document {
    private _editorState: EditorState;
    private _documentName:string;
    private _createdOn:Date;

    constructor(contentState:ContentState,documentName:string,createdOn:string){
        this._editorState=EditorState.createWithContent(contentState);
        this._documentName=documentName!!;
        this._createdOn=new Date(createdOn!!);
    }

    //Getters
    public get editorState():EditorState{
        return this._editorState??EditorState.createEmpty();
    }

    public get documentName():string{
        return this._documentName;
    }

    public get createdOn():Date{
        return this._createdOn;
    }

    //To get content of the content that should be display in the editor 
    public get editorContent():ContentState{
        return this._editorState.getCurrentContent()!!;
    }

    //Convert [RawDraftContentState] to json
    convertToJson():{}{
        //TODO
        return {};
    }
}