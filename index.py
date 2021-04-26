import sys
import eel
import tkinter
import tkinter.filedialog as TkFile 
from cryptography.fernet import Fernet

from python_src import *

tk=tkinter.Tk()
private_key=Fernet.generate_key()
frenetEnc=Fernet(private_key)

@eel.expose
def save_file(data:str):
    ''' The data passed here is suppose to be of type string '''
    try:
        extenion=[("TextEd File","*.texted")]
        file_to_write_in=TkFile.TkFIle.asksaveasfile(filetypes=extenion,defaultextension='.texted')

        # Encryption of data
        encData=frenetEnc.encrypt(data.encode())
        #Saving data
        file_to_write_in.write(encData)
        file_to_write_in.close()
    except :
        return "AN ERROR OCCURED"

@eel.expose
def open_file():
    ''' This method is to open file '''
    extenion=[("TextEd File","*.texted")]
    #Open file
    file_open=TkFile.askopenfile(filetypes=extenion,defaultextension='.texted',mode="r")
    #Decode data
    file_in_bytes=frenetEnc.decrypt(bytes(file_open.read(),"utf-8"))
    return file_in_bytes.decode()


@eel.expose
def open_new_intance():
    init()




















def init():
    if(sys.argv[1]=="--develop"):
        # Init the project 
        eel.init("public")
        
            # Need to define also the start launcher
        eel.start({
            'port':3000,
            'host':'localhost'
        },options={
            'port':8888,
            'host':'localhost'
        },suppress_error=True,size=(int(tk.winfo_screenwidth()),int(tk.winfo_screenheight())));
    else :
        eel_kwargs = dict(
        host='localhost',
        port=8888
        )
        eel.init('build')
        eel.start('index.html',size=(int(tk.winfo_screenwidth()),int(tk.winfo_screenheight())),suppress_error=True,**eel_kwargs)


@eel.expose
def test_me():
    return "Hello From Python"


@eel.expose
def exit_eel():
    sys.exit(0)


if __name__=="__main__":
    init(None)