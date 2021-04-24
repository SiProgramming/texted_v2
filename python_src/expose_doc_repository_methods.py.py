'''
In this file we'll expose all the repository method through eel
'''
import eel
from python_src.constants.config_names import *
from python_src.helpers.database.document_helper import DBHelper
## Db path 
DB_PATH=get_db_path(get_config_value())

# Create instance of DocumentHelper
doc_helper_instance=DBHelper(DB_PATH)

@eel.expose
def save_or_update_document(docJson):
    ''' Doc Json is the json format of the document '''
    return doc_helper_instance.save_or_update_document(docJson)


@eel.expose
def get_document(document_id):
    ''' Document Id is the unique identifier of the document '''
    return doc_helper_instance.get_document(document_id)


@eel.expose
def get_documents(limit):
    ''' Limit is parameter to indicate the max document number we want to fetch '''
    return doc_helper_instance.get_documents(limit)


@eel.expose
def delete_document(document_id):
    ''' Limit is parameter to indicate the max document number we want to fetch '''
    return doc_helper_instance.get_documents(document_id)


