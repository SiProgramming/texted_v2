import tinydb
import os
import json
import platform


CONFIG_FILE_NAME = 'config.json'


def get_config_value():
    ''' For getting the value of the config file '''
    file_json = open(CONFIG_FILE_NAME, 'r')
    return json.load(file_json)


def get_db_path(dict):
    if(platform.system() == 'Windows'):
        # Here we get back the path of the db
        return os.path.join(os.getenv('APPDATA'), dict['db_file_name'])


class DBHelper:
    def __init__(self, db_path: str):
        '''
            Will use the helper to getting more flexibility 
            to use our tiny Db 

            will povide in params the path for the database storage

            That path will be automticly got from the os to assure to always use the right database
        '''
        # If not exist create the file
        if(not os.path.exists(db_path)):
            print('Here for creation')
            folder_path = ''
            if (platform.system() == 'Windows'):
                split_path = db_path.split('\\')
                del split_path[len(split_path)-1]
                # Create database folder
                for i in range(0, len(split_path)):
                    folder_path = folder_path+split_path[i]+"/"

            else:
                split_path = db_path.split('/')
                del split_path[len(split_path)-1]
                # Create database folder
                for i in range(0, len(split_path)):
                    folder_path = folder_path+split_path[i]+"/"
            os.mkdir(folder_path)
            file = open(db_path, "w")
            file.close()

        #Creation or get instances
        self.db = tinydb.TinyDB(db_path)
        self.documents_collection = self.db.table('documents', cache_size=50)
        self.doc_query = tinydb.Query()

    def save_or_update_document(self, docJson):
        ''' Save or update document'''
        try:
            doc_id = self.documents_collection.insert(docJson)
            return doc_id != None  # Return true if well save and false if not
        except:
            print('An Error occurrend')
            return False  # Should thow an exception
            ##TODO

    def get_document(self, doc_id):
        ''' Get document based on his Id '''
        try:
            return self.documents_collection.get(self.doc_query.document_id == doc_id)
        except:
            print('An Error Occured')

    def get_documents(self, limit):
        ''' Get documents List based on limit number '''
        try:
            return self.documents_collection.all()[0:limit+1]
        except:
            print('An Error Occured')

    def delete_document(self, document_id):
        ''' delete document based his id '''
        try:
            delted_docs_id = self.documents_collection.remove(
                self.doc_query.document_id == document_id)
            return len(delted_docs_id) != 0
        except:
            print('An Error occured')
