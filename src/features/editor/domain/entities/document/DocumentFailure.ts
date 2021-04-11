export enum DocumentFailureType{
    DOCUMENT_CREATION_FAILURE,
    DOCUMENT_READING_OR_GETTING_FAILURE,
    DOCUMENT_EXPORT_FAILURE,
    DOCUMENT_DELETE_FAILURE
}


export default class DocumentFailure{
    public getMessage(errorCode:number):DocumentFailureOuput{
        return {
            message: this._getCustomMessage(errorCode)!!
        }
    }

    private _getCustomMessage(errorCode:number){
        switch(errorCode){
            case 0:
                return "An Error occured during document's creation";

            case 1:
                return "An Error occured during opening of the document";
            case 0:
                return "An Error occured during document's exportation";
            case 0:
                return "An Error occured during document deletion";
        }
    }
}


export interface DocumentFailureOuput {
    message:string
}
