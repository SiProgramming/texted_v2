import Button from '@material-ui/core/Button';
import { CameraAlt, FolderOpen, PictureAsPdf, PostAdd, Print, Save, SaveAlt } from '@material-ui/icons';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { eel } from '../../../../../eel';
import './texted-editor.style.scss';
import ToolBarItems from './TextEditorToolBarItems';
import { EditorState } from 'draft-js';
import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';
// import ReactCSSTransitionGroup from 'react-transition-group';
// import { makeStyles } from '@material-ui/core';
// import { ContentState, convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
// import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';

// import StateToPDF from 'draft-js-export-pdfmake/lib/stateToPdfMake';
// import * as Printer from 'draft-js-export-pdfmake/lib/stateToPdfMake';


const CameraIcon = (props) => {
    return (
        <div onClick={props.onClick} className="custom-toolbar-button" title="Webcam">
            <CameraAlt fontSize="small" />
        </div>
    )
};

export default class TextEdEditor extends React.Component<any, {
    editorState: EditorState,
    documentName?: string,
    path?: null,
    isCameraClose: boolean,
    openSidebar: boolean
}>{
    onEditorContentChange: (editorState: EditorState) => void;
    actionBarRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            documentName: undefined,
            path: undefined,
            isCameraClose: false,
            openSidebar: false
        };
        this.actionBarRef = React.createRef();
        this.onEditorContentChange = editorState => this.setState({ ...this.state, editorState });
    }

    // const [isCameraCLose, setCamera] = useState(false);
    // const [openSidebar,setOpenSideBar]=useState(false);
    // const [document2,setDocument]=useState<Document2>(new Document2());



    // Openin sidebar
    onHandleSideBarOpening = () => {
        this.setState({ ...this.state, openSidebar: !this.state.openSidebar });
        this.actionBarRef?.current?.classList?.toggle('open-bar');
        // console.log(actionBarRef.current?.classList)
    }


    // Take screenshot 
    // const capture = () => {
    //     const imageSrc = webcamRef?.current?.getScreenshot();
    //     console.log(imageSrc);
    // }

    // Open new
    openNewWindow = async () => {
        await eel.open_new_intance()();
    }

    // // Open camera
    // const openCamera = () => {
    //     setCamera(state => !state);
    // }

    // const handleDocumentStateChange=(editorState:RawDraftContentState)=>{
    //     setDocument(prevDocument2=>new Document2(convertFromRaw(editorState),prevDocument2.documentName,prevDocument2.path));
    // }

    // //For saving document
    // const saveDocument=async()=>{
    //     const test=EditorStateTransformer2.convertToString(document.getCurrentContent())
    //     console.log(test)
    //    const d=await eel.save_file(test)();
    //    console.log(d)
    // }

    //Open document 
    // const openDocument=async()=>{
    //     const file_string=await eel.open_file()();
    //     const contentState=EditorStateTransformer2.convertToContentState(file_string);
    //     setDocument(oldDocu=>EditorState.createWithContent(contentState));
    // }

    saveDocument = async (force?: boolean) => {
        // console.log(this._editorState);
        const document_stringlify = EditorStateTransformer2.convertToString(this.state.editorState.getCurrentContent())
        console.log(document_stringlify)
        const result = await eel.save_file(document_stringlify, this.state.documentName != null ? this.state.documentName : "empty", force)();
        console.log(result)
        this.setState({
            documentName: result['filename'],
            path: result['path']
        });
    }

    openDocument = async () => {
        const file_infos = await eel.open_file()()
        if (file_infos != null) {
            // console.log(file_infos);
            const file_info_json = JSON.parse(file_infos);
            console.log(typeof file_info_json)
            console.log(file_info_json.content)
            this.setState({
                documentName: file_info_json.filename,
                path: file_info_json.path,
                editorState: EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content))
            })
        }
    }

    // Export to PDF
    // const exportToPDF=()=>{
    //    const docPdfState= new StateToPDF(document.getCurrentContent());
    //    const contents=docPdfState.generate();

    //    const docu=(new Printer()).createPdfKitDocument(contents);
    //    console.log(docu);
    // }

    // FOr printing document
    // const printDoc=()=>{
    //     //COnvert to HTML
    //     // Open in a new tab and print
    //     //TODO
    // }
    render() {
        return (
            <div className="texted-editor">
                {/* <CameraIcon onClick={openCamera} /> */}
                {/* {isCameraCLose ? <Modal open={isCameraCLose} onClose={props.capture}><TextEdWebcam onCLose={openCamera} webcamRef={webcamRef} onCapture={capture} /></Modal> : null} */}
                <Editor editorState={this.state.editorState} onEditorStateChange={this.onEditorContentChange} editorClassName="test" toolbar={ToolBarItems} toolbarCustomButtons={[]} wrapperStyle={{ height: "100%", overflow: "hidden", flexBasis: "95.5%", order: 2 }} editorStyle={{ padding: 25, backgroundColor: "white", marginTop: 25, marginLeft: 70, marginRight: 70, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", overflow: "hidden" }} />
                {/* */}
                <div ref={this.actionBarRef} onMouseEnter={this.onHandleSideBarOpening} onMouseLeave={this.onHandleSideBarOpening} className="actions-bar" style={{ flexBasis: !this.state.openSidebar ? "4.5%" : "10%", transition: "flex-basis 400ms cubic-bezier(0.075, 0.82, 0.165, 1) reversed" }}>
                    {!this.state.openSidebar ? <PostAdd style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openNewWindow}><PostAdd style={{ marginRight: 4 }} />Nouveau</Button>}
                    {!this.state.openSidebar ? <FolderOpen style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openDocument}><FolderOpen style={{ marginRight: 4 }} />Ouvrir</Button>}
                    {!this.state.openSidebar ? <Save style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={()=>this.saveDocument()}><Save style={{ marginRight: 4 }} /> Enregistrer</Button>}
                    {!this.state.openSidebar ? <SaveAlt style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 11, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Enregistrer sous" onClick={()=>this.saveDocument(true)}><SaveAlt style={{ marginRight: 4 }} /> Enreg. sous</Button>}
                    {!this.state.openSidebar ? <PictureAsPdf style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Exporter en PDF" onClick={() => { }}><PictureAsPdf style={{ marginRight: 4 }} />Exp. PDF</Button>}
                    {!this.state.openSidebar ? <Print style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={() => { }}><Print style={{ marginRight: 4 }} /> Imprimer</Button>}
                    {/* {!openSidebar ?<ExitToApp style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", display: "flex", justifyContent: "flex-start" }} onClick={exit}><ExitToApp style={{ marginRight: 4 }} /> Quitter</Button>} */}
                </div>
            </div>
        );
    }
}
