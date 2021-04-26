import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { CameraAlt, ExitToApp, FolderOpen, PictureAsPdf, PostAdd, Print, Save, SaveAlt } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { eel } from '../../../../../eel';
import TextEdWebcam from '../../components/webcam/webcam.components';
import './texted-editor.style.scss';
import ToolBarItems from './TextEditorToolBarItems';
import ReactCSSTransitionGroup from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import { ContentState, convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';

import StateToPDF from 'draft-js-export-pdfmake/lib/stateToPdfMake';
import * as Printer from 'draft-js-export-pdfmake/lib/stateToPdfMake';


const CameraIcon = (props) => {
    return (
        <div onClick={props.onClick} className="custom-toolbar-button" title="Webcam">
            <CameraAlt fontSize="small" />
        </div>
    )
};

const TextEdEditor = (props) => {

    const [isCameraCLose, setCamera] = useState(false);
    const [openSidebar,setOpenSideBar]=useState(false);
    const [document,setDocument]=useState<EditorState>(EditorState.createEmpty());

    const actionBarRef=useRef<HTMLDivElement>(null);

    const editorFocusRef: any = useRef(null);
    const webcamRef: any = React.useRef(null);

    // Openin sidebar
    const onHandleSideBarOpening=()=>{
        setOpenSideBar(state=>!state);
        actionBarRef?.current?.classList?.toggle('open-bar');
        console.log(actionBarRef.current?.classList)
    }

    // Take screenshot 
    const capture = () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        console.log(imageSrc);
    }

    // Open new
    const openNewWindow = async () => {
        await eel.open_new_intance()();
    }

    //Exit
    const exit = async () => {
        window?.close();
    }
    // Open camera
    const openCamera = () => {
        setCamera(state => !state);
    }

    const handleDocumentStateChange=(editorState:EditorState)=>{
        setDocument(oldDoc=>editorState);
    }

    //FOr saving document
    const saveDocument=async()=>{
       await eel.save_file(EditorStateTransformer2.convertToString(document.getCurrentContent()))();
    }

    //Open document 
    const openDocument=async()=>{
        const file_string=await eel.open_file()();
        const contentState=EditorStateTransformer2.convertToContentState(file_string);
        setDocument(oldDocu=>EditorState.createWithContent(contentState));
    }

    // Export to PDF
    const exportToPDF=()=>{
       const docPdfState= new StateToPDF(document.getCurrentContent());
       const contents=docPdfState.generate();

       const docu=(new Printer()).createPdfKitDocument(contents);
       console.log(docu);
    }

    // FOr printing document
    const printDoc=()=>{
        //COnvert to HTML
        // Open in a new tab and print
        //TODO
    }

    return (
        <div className="texted-editor">
            {isCameraCLose ? <Modal open={isCameraCLose} onClose={props.capture}><TextEdWebcam onCLose={openCamera} webcamRef={webcamRef} onCapture={capture} /></Modal> : null}
            <Editor onEditorStateChange={handleDocumentStateChange}  editorClassName="test" ref={editorFocusRef} toolbar={ToolBarItems} toolbarCustomButtons={[<CameraIcon onClick={openCamera} />]} wrapperStyle={{ height: "100%", overflow: "hidden", flexBasis: "95.5%", order: 2 }} editorStyle={{ padding: 25, backgroundColor: "white" }} />
            {/* */}
            <div ref={actionBarRef} onMouseEnter={onHandleSideBarOpening} onMouseLeave={onHandleSideBarOpening} className="actions-bar" style={{flexBasis:!openSidebar?"4.5%":"10%",transition:"flex-basis 400ms cubic-bezier(0.075, 0.82, 0.165, 1) reversed"}}>
                {!openSidebar  ?<PostAdd style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={openNewWindow}><PostAdd style={{ marginRight: 4 }} />Nouveau</Button>}
                {!openSidebar  ?<FolderOpen style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={openDocument}><FolderOpen style={{ marginRight: 4 }} />Ouvrir</Button>}
                {!openSidebar ?<Save style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}}   />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={saveDocument}><Save style={{ marginRight: 4 }} /> Enregistrer</Button>}
                {!openSidebar ?<SaveAlt style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}}  />: <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 11, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Enregistrer sous" onClick={saveDocument}><SaveAlt style={{ marginRight: 4 }} /> Enreg. sous</Button>}
                {!openSidebar ?<PictureAsPdf style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Exporter en PDF" onClick={exportToPDF}><PictureAsPdf style={{ marginRight: 4 }} />Exp. PDF</Button>}
                {!openSidebar ?<Print style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={printDoc}><Print style={{ marginRight: 4 }} /> Imprimer</Button>}
                {/* {!openSidebar ?<ExitToApp style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", display: "flex", justifyContent: "flex-start" }} onClick={exit}><ExitToApp style={{ marginRight: 4 }} /> Quitter</Button>} */}
            </div>
        </div>
    );
}

export default TextEdEditor;