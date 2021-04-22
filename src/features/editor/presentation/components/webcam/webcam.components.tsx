import { Button, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { CameraAlt, Close } from '@material-ui/icons';
import React from 'react';
import Webcam from 'react-webcam';

const TextEdWebcam=(props:{
    webcamRef:any,
    onCapture:any,
    onCLose:any
})=>{

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };

    return (
        <div style={{padding:15, position:"absolute",top:"25%",left:"45%"}}>
            <Card style={{borderRadius:25,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}} elevation={12} >
                <IconButton style={{marginTop:15}} onClick={props.onCLose}><Close /></IconButton>
                <Webcam ref={props.webcamRef} videoConstraints={videoConstraints} height={300} width={300} audio={false} />
                <Button  onClick={props.onCapture} style={{boxSizing:"border-box",cursor:"pointer",padding:"0 12px",position:"relative",top:-25,backgroundColor:"black",width:"40%",color:"white",borderRadius:25,height:30}}><CameraAlt  style={{marginRight:7}}/> Capturer</Button>
            </Card>
        </div>
    )
}

export default TextEdWebcam;