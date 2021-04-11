import { DocumentFailureOuput } from "../../../domain/entities/document/DocumentFailure";
import DocumentModel from "../../models/DocumentModel";

export default interface RemoteDataSource {
    /**
     * This method will allows us to save in a local db all the information related to a document
     * 
     * Infos to store are : 
     *      - document name
     *      - creation data 
     *      - path to the file
     *      - [later] thumbail of the doc  
     */ 
    saveOrUpdateDocument(document:Document):Promise<boolean|DocumentFailureOuput>;

    //Get document 
    getDocument(documentId:number):Promise<DocumentModel|DocumentFailureOuput>;

    //Get recent documents
    //We will limit the recent docs to 5
    getDocuments(limit:number):Promise<Array<DocumentModel>|DocumentFailureOuput>;

    //Delete a document
    deleteDocument(documentId:number):Promise<boolean|DocumentFailureOuput>
}