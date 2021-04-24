import sys
import eel
import tkinter

from python_src import *

tk=tkinter.Tk()
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
        eel.init('build')
        eel.start('index.html',size=(int(tk.winfo_screenwidth()),int(tk.winfo_screenheight())))


@eel.expose
def test_me():
    return "Hello From Python"


@eel.expose
def open_new_intance():
    init()

@eel.expose
def exit_eel():
    sys.exit(0)


if __name__=="__main__":
    init()