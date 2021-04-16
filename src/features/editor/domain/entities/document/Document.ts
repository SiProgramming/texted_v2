import { convertToRaw } from "draft-js";
import {ContentState, EditorState} from "react-draft-wysiwyg";

export default class Document {
    private _editorState: EditorState;
    private _documentName:string;
    public docId?:number;
    private _createdOn:Date;
    private listeners:Array<DocumentListener>;

    constructor(documentId:number,contentState:ContentState,documentName:string,createdOn:string){
        this.docId=documentId;
        this._editorState=EditorState.createWithContent(contentState);
        this._documentName=documentName!!;
        this._createdOn=new Date(createdOn!!);
        this.listeners=[];
    }

        //For adding listener in listeners
    addListener(listener:DocumentListener){
        this.listeners.push(listener);
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

    public toJson(){
            return JSON.parse(JSON.stringify({
                document_id:this.docId!!,
                content:convertToRaw(this.editorContent),
                date:Date.now().toLocaleString()
            }));
    }

}

export interface DocumentListener {
    onSaving():void
}