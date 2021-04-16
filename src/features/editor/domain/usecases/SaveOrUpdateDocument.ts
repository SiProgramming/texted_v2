import UseCase from "../../../../core/utils/usecases/UseCases";
import Document from "../entities/document/Document";
import { DocumentFailureOuput } from "../entities/document/DocumentFailure";
import DocumentRepository from "../repositories/DocumentRepository";

/**
 * This is the action to trigger for saving a document 
 */
export class SaveOrUpdateDocument implements UseCase<Promise<boolean|DocumentFailureOuput>,SaveOrUpdateDocumentParams>{
    private documentRepository:DocumentRepository;
    constructor(documentRepository:DocumentRepository){
        this.documentRepository=documentRepository;
    }

    
    async trigger(params: SaveOrUpdateDocumentParams):Promise<boolean|DocumentFailureOuput>{
        return await this.documentRepository.saveOrUpdateDocument(params.document);
    }

    //notify listeners
}

export interface SaveOrUpdateDocumentParams {
    document:Document
}

