import Document from "../entities/document/Document";
import { DocumentFailureOuput } from "../entities/document/DocumentFailure";

export default interface DocumentRepository {

    //Save/Update document
    saveOrUpdateDocument(document:Document):Promise<boolean|DocumentFailureOuput>

    //Get document 
    getDocument(documentId:number):Promise<Document|DocumentFailureOuput>;

    //Get recent documents
    //We will limit the recent docs to 5
    getDocuments(limit:number):Promise<Array<Document>|DocumentFailureOuput>;

    //Delete a document
    deleteDocument(documentId:number):Promise<boolean|DocumentFailureOuput>;

}