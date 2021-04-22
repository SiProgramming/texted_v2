import eel
import sys
import tkinter

tk=tkinter.Tk()


if __name__=="__main__":
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