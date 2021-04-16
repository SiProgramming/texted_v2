import { eel } from "../../../../../../python_src/eel";
import EditorStateTransformer from "../../../../../core/utils/transformers/EditorStateTransformer";
import Document from "../../../domain/entities/document/Document";
import DocumentFailure, { DocumentFailureOuput, DocumentFailureType } from "../../../domain/entities/document/DocumentFailure";
import DocumentModel, { DocumentModelParams } from "../../models/DocumentModel";
import LocalDataSource from "./local_data_source";

export default class LocalDataSourceImpl implements LocalDataSource{
    documentFailure:DocumentFailure;

    constructor(documentFailure:DocumentFailure){
        this.documentFailure=documentFailure;
    }

    async saveOrUpdateDocument(document: Document): Promise<boolean|DocumentFailureOuput> {
        try {
                //Convert the doc to json 
        // const _jsonDoc=EditorStateTransformer.convertToJson(document);
        const _isSaved=eel.save_or_update_document(document.toJson());
            return _isSaved;
        }
        catch(e){
            return this.documentFailure.getMessage(DocumentFailureType.DOCUMENT_CREATION_FAILURE);
        }
    }

    async getDocument(documentId: number):Promise<DocumentModel|DocumentFailureOuput> {
        try {
            const _jsonDoc=JSON.parse(eel.get_document(documentId));
            return new DocumentModel({
                documentId:_jsonDoc.document_id,
                 content:_jsonDoc.content,
                documentName:_jsonDoc.documentName,
                createdOn:_jsonDoc.createdOn});
        }catch(e){
            return this.documentFailure.getMessage(DocumentFailureType.DOCUMENT_READING_OR_GETTING_FAILURE);
        }
    }

    async getDocuments(limit: number):Promise<Array<DocumentModel>|DocumentFailureOuput> {
        try {
            const _jsonDocs=JSON.parse(eel.get_documents(limit)) as Array<any>; //For getting a list of documents
            //Convert them into list of Document
            const _docsList:Array<DocumentModel>= _jsonDocs.map(_jsonDoc => {
                return new DocumentModel({
                documentId:_jsonDoc.document_id,
                    content:_jsonDoc.content,
                    documentName:_jsonDoc.documentName,
                    createdOn:_jsonDoc.createdOn
                });
            });
            return _docsList;
        }catch(e){
            return this.documentFailure.getMessage(DocumentFailureType.DOCUMENT_READING_OR_GETTING_FAILURE);
        }
    }
    async deleteDocument(documentId: number):Promise<boolean|DocumentFailureOuput> {
        try{
            const _isDeleted=eel.delete_document(documentId);
            return _isDeleted;
        }catch(e){
            return this.documentFailure.getMessage(DocumentFailureType.DOCUMENT_DELETE_FAILURE);
        }
    }
}