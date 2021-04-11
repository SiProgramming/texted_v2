export default class UserAuthFailure implements Error {
    name: string;
    message: string;
    
    constructor(){
        this.name="USER_IS_NOT_SIGNED_IN";
        this.message="User is not authenticated";
    }
}