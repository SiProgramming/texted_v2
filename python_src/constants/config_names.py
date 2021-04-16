import json
import os
import platform as platform

'''
    This class will define all the necessary names or
    files name that will should 
    like: folder_path, software_name, and much more
'''
CONFIG_FILE_NAME='python_src/constants/config.json'

def get_config_value():
    ''' For getting the value of the config file '''
    file_json=open(CONFIG_FILE_NAME,'r')    
    return json.load(file_json)

def get_db_path(dict):
    if(platform.system()=='Windows'):
        # Here we get back the path of the db
        return os.path.join(os.getenv('APPDATA'),dict['db_file_name'])
