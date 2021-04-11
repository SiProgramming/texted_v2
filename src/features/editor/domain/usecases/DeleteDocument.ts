import UseCase from "../../../../core/utils/usecases/UseCases";
import Document from "../entities/document/Document";
import { DocumentFailureOuput } from "../entities/document/DocumentFailure";
import DocumentRepository from "../repositories/DocumentRepository";
import DeleteOrGetDocumentParams from "./usecase_params/DeleteOrGetDocumentParams";

/**
 * This is the action to trigger for saving a document 
 */
export class DeleteDocument implements UseCase<Promise<boolean|DocumentFailureOuput>,DeleteOrGetDocumentParams>{
    private documentRepository:DocumentRepository;

    constructor(documentRepository:DocumentRepository){
        this.documentRepository=documentRepository;
    }
    
    async trigger(params: DeleteOrGetDocumentParams):Promise<boolean|DocumentFailureOuput>{
        return await this.documentRepository.deleteDocument(params.documentId);
    }
}
