import sys
import eel
import tkinter
import tkinter.filedialog as TkFile
import json
from cryptography.fernet import Fernet


from python_src import *

tk = tkinter.Tk()
tk.geometry('0x0+0+0')
tk.withdraw()


@eel.expose
def save_file(data: str, path: str, force: bool):
    ''' The data passed here is suppose to be of type string '''
    try:
        if(path == "empty"):
            extenion = [("TextEd File", "*.texted")]
            file_to_write_in = TkFile.asksaveasfile(
                filetypes=extenion, defaultextension='.texted')

            #Saving data
            file_to_write_in.write(data)
            file_to_write_in.close()
            filename_name = file_to_write_in.name.split('/')[-1]
            return {
                "filename": filename_name,
                "path": file_to_write_in.name,
            }
        elif (force == True):
            extenion = [("TextEd File", "*.texted")]
            file_to_write_in = TkFile.asksaveasfile(
                filetypes=extenion, defaultextension='.texted', initialfile=path.split('/')[-1])

            #Saving data
            file_to_write_in.write(data)
            file_to_write_in.close()
            filename_name = file_to_write_in.name.split('/')[-1]
            return {
                "filename": filename_name,
                "path": file_to_write_in.name,
            }
        else:
            file_to_write_in = open(path, "w")
            file_to_write_in.write(data)
            file_to_write_in.close()
            print("Second cas")
            return {
                "filename": filename_name,
                "path": file_to_write_in.name,
            }
    except:
        return "AN ERROR OCCURED"


@eel.expose
def open_file():
    ''' This method is to open file '''
    try:
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
        eel_kwargs = dict(
            host='localhost',
            port=8888
        )
        eel.init('build')
        eel.start('index.html', size=(int(tk.winfo_screenwidth()), int(
            tk.winfo_screenheight())), suppress_error=True, **eel_kwargs)


@eel.expose
def exit_eel():
    sys.exit(0)


if __name__ == "__main__":
    init()
