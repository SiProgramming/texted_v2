import tinydb
import os

class DBHelper:
    def __init__(self,db_path):
        '''
            Will use the helper to getting more flexibility 
            to use our tiny Db 

            will povide in params the path for the database storage

            That path will be automticly got from the os to assure to always use the right database
        '''
        # If not exist create the file 
        if(not os.path.exists(db_path)):
            os.open(db_path)

        #Creation or get instances
        self.db=tinydb.TinyDB(db_path)
        self.documents_collection=self.db.table('documents',cache_size=50)
        self.doc_query=tinydb.Query()

    def save_or_update_document(self,docJson):
        ''' Save or update document'''
        try:
            doc_id=self.documents_collection.insert(docJson)
            return doc_id!=None # Return true if well save and false if not 
        except:
            print('An Error occurrend')
            return False # Should thow an exception
            ##TODO

    def get_document(self,doc_id):
        ''' Get document based on his Id '''
        try:
            return self.documents_collection.get(self.doc_query.document_id==doc_id)
        except:
            print('An Error Occured')


    def get_documents(self,limit):
        ''' Get documents List based on limit number '''
        try:
            return self.documents_collection.all()[1:limit+1]
        except:
            print('An Error Occured')
    
    def delete_document(self,document_id):
        ''' delete document based his id '''
        try:
            delted_docs_id=self.documents_collection.remove(self.doc_query.document_id==document_id)
            return len(delted_docs_id)!=0
        except:
            print('An Erro occured')