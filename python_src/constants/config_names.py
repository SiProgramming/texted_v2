import json
import os
import platform as platform

'''
    This class will define all the necessary names or
    files name that will should 
    like: folder_path, software_name, and much more
'''

def get_db_path(dict:dict):
    if(platform.system()=='Windows'):
        # Here we get back the path of the db
        return os.path.join(os.getenv('APPDATA'),dict['folder_name'],dict['db_file_name'])
