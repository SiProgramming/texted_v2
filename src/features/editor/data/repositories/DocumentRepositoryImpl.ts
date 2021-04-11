import Document from "../../domain/entities/document/Document";
import { DocumentFailureOuput } from "../../domain/entities/document/DocumentFailure";
import DocumentRepository from "../../domain/repositories/DocumentRepository";
import LocalDataSource from "../data_sources/local_data_source/local_data_source";
import RemoteDataSource from "../data_sources/remote_data_source/remote_data_source";
import DocumentModel from "../models/DocumentModel";

export default class DocumentRepositoryImpl implements DocumentRepository {
    localDataSource:LocalDataSource;
    remoteDataSource:RemoteDataSource;
    //Later will add connection checker

    /**
     * 
     * @param localDataSource local source for dealing with local data source
     * @param remoteDataSource remote source for dealing with local data source 
     */

    constructor(localDataSource:LocalDataSource,remoteDataSource:RemoteDataSource){
        this.localDataSource=localDataSource;
        this.remoteDataSource=remoteDataSource;
    }

    async saveOrUpdateDocument(document: Document): Promise<boolean|DocumentFailureOuput> {
        //Currently we're just going to add local storage feature
        const _savedResponse=await this.localDataSource.saveOrUpdateDocument(document);
        return _savedResponse;
    }

    async getDocument(documentId:number): Promise<DocumentModel|DocumentFailureOuput> {
        //Currently we're just going to add local storage feature
        const _doc=await this.localDataSource.getDocument(documentId);
        return _doc;
    }

    async getDocuments(): Promise<Array<Document>|DocumentFailureOuput> {
        //Currently we're just going to add local storage feature
        const _docsList=await this.localDataSource.getDocuments(5);
        return _docsList;
    }
    
    async deleteDocument(documentId:number): Promise<boolean|DocumentFailureOuput> {
        //Currently we're just going to add local storage feature
        const _deletedReponse=await this.localDataSource.deleteDocument(documentId);
        return _deletedReponse;
    }
}