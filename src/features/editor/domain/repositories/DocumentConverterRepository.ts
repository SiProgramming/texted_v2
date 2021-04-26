import DocumentRepository from "./DocumentRepository";

export default interface DocumentConverterRepository{

    // Export to word
    //TODO 
    //Will define more on that
    // exportToWord(document:{}):void;

    //Export pdf
    exportToPdf(document:{}):void;

    //Export html
    // exportToHTML(document:{}):void;
}