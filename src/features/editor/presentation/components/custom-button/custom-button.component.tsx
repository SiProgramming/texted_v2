import { Button } from '@material-ui/core';
import React from 'react';


const CustomButton=(props:CustomButtonProps)=>{
    return (
        <div className='custom-button'>
                        
        </div>
    )
}

export default CustomButton;

export interface CustomButtonProps {
    label:string,
    onPressed:(e:any)=>void
}
