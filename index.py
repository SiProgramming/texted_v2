import sys
import eel
import tkinter
import tkinter.filedialog as TkFile
import json


from python_src.constants.config_names import *
from python_src.helpers.database.document_helper import DBHelper

tk = tkinter.Tk()
tk.geometry('0x0+0+0')
tk.withdraw()
tk.lift()

# Imports path config 
database_folder_path=get_db_path(get_config_value())
print(database_folder_path)
# Init tiny db object
tinydb_helper=DBHelper(database_folder_path)


@eel.expose
def save_file(data: str, path: str,doc_filename:str, force: bool):
    ''' The data passed here is suppose to be of type string '''
    try:
        tk.lift()
        print(path)

        if(path == "empty"):
            extenion = [("TextEd File", "*.texted")]
            file_to_write_in = TkFile.asksaveasfile(
                filetypes=extenion, defaultextension='.texted',initialfile=doc_filename)

            #Saving data
            file_to_write_in.write(data)
            file_to_write_in.close()
            filename_name = file_to_write_in.name.split('/')[-1]
            print(file_to_write_in.name.split('/'))
            dict_obj={
                "filename": filename_name,
                "path": file_to_write_in.name,
            }
            tinydb_helper.save_or_update_document(dict_obj)
            return dict_obj

        elif (force == True):
            extenion = [("TextEd File", "*.texted")]
            file_to_write_in = TkFile.asksaveasfile(
                filetypes=extenion, defaultextension='.texted', initialfile=path.split('/')[-1])

            #Saving data
            file_to_write_in.write(data)
            file_to_write_in.close()
            filename_name = file_to_write_in.name.split('/')[-1]
            dict_obj={
                "filename": filename_name,
                "path": file_to_write_in.name,
            }
            tinydb_helper.save_or_update_document(dict_obj)
            return dict_obj

        else:
            file_to_write_in = open(path, "w")
            file_to_write_in.write(data)
            file_to_write_in.close()
            dict_obj= {
                "filename": path.split('/')[-1],
                "path": path,
            }
            tinydb_helper.save_or_update_document(dict_obj)
            return dict_obj
    except:
        return "AN ERROR OCCURED"

@eel.expose
def get_recents_documents():
    return tinydb_helper.get_documents(5)

@eel.expose
def open_file():
    ''' This method is to open file '''
    try:
        tk.lift()
        extenion = [("TextEd File", "*.texted")]
        #Open file
        file_open = TkFile.askopenfile(
            filetypes=extenion, defaultextension='.texted', mode="r")
        filename_name = file_open.name.split('/')[-1]
        if(file_open != None):
            # json_file_content=json.loads(file_open.read())
            # print(json_file_content)
            return json.dumps({
                "filename": filename_name,
                "path": file_open.name,
                "content": file_open.read()
            })
    except:
        return None


@eel.expose
def open_new_intance():
    init()


def init():
    if(sys.argv[1] == "--develop"):
        # Init the project
        eel.init("public")

        # Need to define also the start launcher
        eel.start({
            'port': 3000,
            'host': 'localhost'
        }, options={
            'port': 8888,
            'host': 'localhost'
        }, suppress_error=True, size=(int(tk.winfo_screenwidth()), int(tk.winfo_screenheight())))
    else:
        try:
            eel_kwargs = dict(
            host='localhost',
            port=8888
            )
            eel.init('build',[".js",".html",".tsx",".ts",".jsx"])
            eel.start('index.html', size=(int(tk.winfo_screenwidth()), int(
            tk.winfo_screenheight())), suppress_error=True, **eel_kwargs)

        except:
            # TODO 
            if(platform.system()=="Windows"):
                eel_kwargs = dict(
                host='localhost',
                port=8888,
                app="edge"
                )
                eel.init('build',[".js",".html",".tsx",".ts",".jsx",".css",".png"])
                eel.start('index.html', size=(int(tk.winfo_screenwidth()), int(
                tk.winfo_screenheight())), suppress_error=True, **eel_kwargs)
            else:
                raise
        


@eel.expose
def exit_eel():
    sys.exit(0)


if __name__ == "__main__":
    init()
