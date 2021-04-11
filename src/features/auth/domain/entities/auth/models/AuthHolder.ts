/**
 * That will hold all the necessary information related to the userr authentification 
 */

import UserAuthFailure from "./AuthFailure";
import AuthListener from "./AuthListener";

export class AuthHolder {
    private _isAuthorized:boolean;
    private _authToken:string;
    private _authListeners: AuthListener[];

    constructor(){
        this._isAuthorized=false;
        this._authToken='';
        this._authListeners=[];
    }

    // Getters
    public get isAuthorized() {
        return this._isAuthorized;
    }

    public getauthToken() {
        //If the user is not signedIn will throw an error 
        if(!this._isAuthorized){
            throw new UserAuthFailure();
        }
        return this._authToken;
    }

    public addListener(listener:AuthListener){
        this._authListeners.push(listener);
    }

    public removeListener(listener:AuthListener){
        this._authListeners.splice(this._authListeners.indexOf(listener,1));
    }


    //Method to update if the user signed in
    public onSignedIn(authToken:string){
        this._isAuthorized=true;
        this._authToken=authToken;
        //Notify listeners
        this._notifyListeners()
    } 

    public onSignedOut(){
        this._isAuthorized=false;
        this._authToken='';
        //Notify listeners
        this._notifyListeners();
    }
    


    //Notfiers listeners
    private _notifyListeners(){
        this._authListeners.forEach(listener=>listener.onAuthChanged());
    }
}

