import UseCase from "../../../../core/utils/usecases/UseCases";
import Document from "../entities/document/Document";
import { DocumentFailureOuput } from "../entities/document/DocumentFailure";
import DocumentRepository from "../repositories/DocumentRepository";
import GetRecentDocumentsParams from "./usecase_params/GetRecentDocumentsParams";

/**
 * This is the action to trigger for saving a document 
 */
export class GetRecentDocuments implements UseCase<Promise<Array<Document>|DocumentFailureOuput>,GetRecentDocumentsParams>{
    private documentRepository:DocumentRepository;

    constructor(documentRepository:DocumentRepository){
        this.documentRepository=documentRepository;
    }
    
    async trigger(params: GetRecentDocumentsParams):Promise<Array<Document>|DocumentFailureOuput>{
        return await this.documentRepository.getDocuments(params.limit);
    }
}

export interface SaveOrUpdateDocumentParams {
    document:Document
}