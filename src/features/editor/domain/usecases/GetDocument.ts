import UseCase from "../../../../core/utils/usecases/UseCases";
import Document from "../entities/document/Document";
import { DocumentFailureOuput } from "../entities/document/DocumentFailure";
import DocumentRepository from "../repositories/DocumentRepository";
import DeleteOrGetDocumentParams from "./usecase_params/DeleteOrGetDocumentParams";

/**
 * This is the action to trigger for saving a document 
 */
export class GetDocument implements UseCase<Promise<Document|DocumentFailureOuput>,DeleteOrGetDocumentParams>{
    private documentRepository:DocumentRepository;

    constructor(documentRepository:DocumentRepository){
        this.documentRepository=documentRepository;
    }
    
    async trigger(params: DeleteOrGetDocumentParams):Promise<Document|DocumentFailureOuput>{
        return await this.documentRepository.getDocument(params.documentId);
    }
}

export interface SaveOrUpdateDocumentParams {
    document:Document
}