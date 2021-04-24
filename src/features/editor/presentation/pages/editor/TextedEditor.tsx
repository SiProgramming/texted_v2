import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { CameraAlt, ExitToApp, PictureAsPdf, PostAdd, Print, Save, SaveAlt } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { eel } from '../../../../../eel';
import TextEdWebcam from '../../components/webcam/webcam.components';
import './texted-editor.style.scss';
import ToolBarItems from './TextEditorToolBarItems';


const CameraIcon = (props) => {
    return (
        <div onClick={props.onClick} className="custom-toolbar-button" title="Webcam">
            <CameraAlt fontSize="small" />
        </div>
    )
};

const TextEdEditor = (props) => {

    const [isCameraCLose, setCamera] = useState(false);

    const editorFocusRef: any = useRef(null);
    const webcamRef: any = React.useRef(null);

    const capture = () => {
        console.log("Ddee");
        const imageSrc = webcamRef?.current?.getScreenshot();
        console.log(imageSrc);
    }

    const openNewWindow = async () => {
        await eel.open_new_intance()();
    }

    const exit = async () => {
        window?.close();
    }

    const openCamera = () => {
        setCamera(state => !state);
    }



    return (
        <div className="texted-editor">
            {/* {isCameroCLose? <TextEdWebcam webcamRef={webcamRef} onCapture={capture} />: null} */}
            {isCameraCLose ? <Modal open={isCameraCLose} onClose={props.capture}><TextEdWebcam onCLose={openCamera} webcamRef={webcamRef} onCapture={capture} /></Modal> : null}
            <Editor editorClassName="test" ref={editorFocusRef} toolbar={ToolBarItems} toolbarCustomButtons={[<CameraIcon onClick={openCamera} />]} wrapperStyle={{ height: "100%", overflow: "hidden", flexBasis: "90%", order: 2 }} editorStyle={{ padding: 25, backgroundColor: "white" }} />
            <div className="actions-bar">
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "blue", width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={openNewWindow}><PostAdd style={{ marginRight: 4 }} />Nouveau</Button>
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "blue", width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={() => { }}><Save style={{ marginRight: 4 }} /> Enregistrer</Button>
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 11, textTransform: "capitalize", borderColor: "blue", width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Enregistrer sous" onClick={() => { }}><SaveAlt style={{ marginRight: 4 }} /> Enreg. sous</Button>
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "blue", width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Exporter en PDF" onClick={() => { }}><PictureAsPdf style={{ marginRight: 4 }} />Exp. PDF</Button>
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "blue", width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={() => { }}><Print style={{ marginRight: 4 }} /> Imprimer</Button>
                <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "blue", width: "85%", display: "flex", justifyContent: "flex-start" }} onClick={exit}><ExitToApp style={{ marginRight: 4 }} /> Quitter</Button>
            </div>
        </div>
    );
}

export default TextEdEditor;