import { ContentState } from "draft-js";
import EditorStateTransformer from "../../../../core/utils/transformers/EditorStateTransformer";
import Document from "../../domain/entities/document/Document";

/**
 * Here the model of the data we're getting from the datasource or repository
 */
export default class DocumentModel extends Document {
    constructor(doc:DocumentModelParams){
        //Convert back the JSON object to ContentState
        const docContentState:ContentState=EditorStateTransformer.convertToContentState(doc.content);
        super(docContentState,doc.documentName,doc.createdOn);
    }
}

export interface DocumentModelParams {
    content: string;
    documentName:string;
    createdOn:string;
}