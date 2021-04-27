import { convertToRaw } from "draft-js";
import {ContentState} from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';
import { eel } from '../../../../../eel';


export default class Document2 {
    private _editorState: EditorState;
    public documentName?:string;
    public path?:string;
    public rebuilder?:(docu:Document2)=>void;

    constructor(contentState?:ContentState,documentName?:string,path?:string){
        this._editorState=contentState!==undefined?EditorState.createWithContent(contentState):EditorState.createEmpty();
        // this._editorState=EditorState.createEmpty();
        this.documentName=documentName;
        this.path=path;

        // if document exist
    }

    public get editorState(){
        return this._editorState;
    }


    //To get content of the content that should be display in the editor 
    public get editorContent():ContentState{
        return this._editorState.getCurrentContent()!!;
    }

    public toJson=()=>{
            return JSON.parse(JSON.stringify({
                content:convertToRaw(this.editorContent),
            }));
    }

    public saveDocument=async(editorState:EditorState)=>{
        if(editorState!==undefined){
                console.log("Herre");
            // console.log(this._editorState);
            console.log("Herre");
            const document_stringlify=EditorStateTransformer2.convertToString(editorState.getCurrentContent())
            console.log(document_stringlify)
        const result=await eel.save_file(document_stringlify,this.documentName!=null?this.documentName:"empty")();
        console.log(result)
        this.documentName=result['filename'];
        this.path=result['path'];
        //Notify listener
        if(this.rebuilder)this.rebuilder(this);
        }
    }
    
    public  openDocument=async()=>{
        const file_infos=await eel.open_file()()
        if(file_infos!=null){
            // console.log(file_infos);
            const file_info_json=JSON.parse(file_infos);
            console.log(typeof file_info_json)
            console.log(file_info_json.content)
            this.documentName=file_info_json.filename;
            this.path=file_info_json.path;
            this._editorState=EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content));
            //Notify listener
            if(this.rebuilder)this.rebuilder(this);
        }
    }

    public updateDocumentContent=(editorState:EditorState)=>{
        this._editorState=editorState;
        return this;
    }
}