import sys
import eel
import tkinter
import tkinter.filedialog as TkFile
import json
import ctypes
import mammoth


def hideConsole():
  whnd = ctypes.windll.kernel32.GetConsoleWindow()
  if whnd != 0:
     ctypes.windll.user32.ShowWindow(whnd, 0)


from python_src.constants.config_names import *
from python_src.helpers.database.document_helper import DBHelper

tk = tkinter.Tk()
tk.geometry('0x0+0+0')
tk.withdraw()
tk.lift()

config_data={
    "name":"TextEd",
    "folder_name":"TextEd",
    "db_file_name":"texted_db.json"
    }
    
# Imports path config 
database_folder_path=get_db_path(config_data)
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
            print(data)
            if(file_to_write_in!=None):
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
            return None
        elif (force == True):
            extenion = [("TextEd File", "*.texted")]
            file_to_write_in = TkFile.asksaveasfile(
                filetypes=extenion, defaultextension='.texted', initialfile=path.split('/')[-1])
            if(file_to_write_in!=None):
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
            return None
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
def open_file_from_path(path:str):
    file_open=open(path,"r")
    if(file_open.readable()):
        return json.dumps({
            "filename": path.split('/')[-1],
            "path": path,
            "content": file_open.read()
        })
    return None


@eel.expose
def open_file():
    ''' This method is to open file '''
    try:
        tk.lift()
        extenion = [("TextEd File", "*.texted"),("Word document",".docx")]
        #Open file
        file_open = TkFile.askopenfile(
            filetypes=extenion, defaultextension='.texted', mode="r")
        if(file_open != None):
            filename_name =file_open.name.split('/')[-1]
            print(filename_name.split('.')[-1])
            if(filename_name.split('.')[-1]=="docx"):
                print('Is a document word')
                docx_file=open(file_open.name, "rb")
                result = mammoth.convert_to_html(docx_file)
                return json.dumps({
                    "filename": filename_name,
                    "path": None,
                    "content": result.value
                })
            # json_file_content=json.loads(file_open.read())
            # print(json_file_content)
            else :
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
    if(len(sys.argv)>1):
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
            port=8888,
            chromeFlags=["--start-fullscreen", "--browser-startup-dialog"]
            )
            eel.init('build',[".js",".html",".tsx",".ts",".jsx"])
            eel.start({
                'port': 8888,
                'host': 'localhost'
            },size=(int(tk.winfo_screenwidth()), int(
            tk.winfo_screenheight())), suppress_error=True, **eel_kwargs)

        except EnvironmentError:
            # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
            if sys.platform in ['win32', 'win64'] and int(platform.release()) >= 10:
                eel.start("index.html", mode='edge',size=(int(tk.winfo_screenwidth()), int(
                tk.winfo_screenheight())), suppress_error=True,**eel_kwargs)
            else:
                raise
        


@eel.expose
def exit_eel():
    sys.exit(0)


if __name__ == "__main__":
    # hideConsole()
    init()
