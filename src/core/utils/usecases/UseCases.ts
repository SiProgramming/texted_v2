export default interface UseCase<OutPut,Params>{
    //On trigger action
    trigger(params:Params):OutPut;
}