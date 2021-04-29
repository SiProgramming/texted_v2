import Button from '@material-ui/core/Button';
import { FolderOpen, PictureAsPdf, PostAdd, Print, Save, SaveAlt } from '@material-ui/icons';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { eel } from '../../../../../eel';
import './texted-editor.style.scss';
import ToolBarItems from './TextEditorToolBarItems';
import { convertToRaw, EditorState } from 'draft-js';
import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';
import jsPDF from 'jspdf';
import draftToHtml from 'draftjs-to-html';
import { withRouter } from 'react-router-dom';


// const CameraIcon = (props) => {
//     return (
//         <div onClick={props.onClick} className="custom-toolbar-button" title="Webcam">
//             <CameraAlt fontSize="small" />
//         </div>
//     )
// };

const textEditor = class TextEdEditor extends React.Component<any, {
    editorState: EditorState,
    documentName?: string,
    path?: null,
    isCameraClose: boolean,
    openSidebar: boolean,
    hideToolBar: boolean,
    isSaved: boolean
}>{
    actionBarRef: React.RefObject<HTMLDivElement>;
    fileInfoRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            documentName: "Document Sans nom",
            path: undefined,
            isCameraClose: false,
            openSidebar: false,
            hideToolBar: false,
            isSaved: false
        };
        console.log('Props', this.props.history)
        this.fileInfoRef = React.createRef();
        this.actionBarRef = React.createRef();
    }

    onEditorContentChange = (editorState: EditorState) => this.setState({ ...this.state, editorState });

    componentDidMount = () => {
        //Save document
        document.addEventListener('keydown', (e) => {
            if (window.navigator.platform.match("Win") && e.ctrlKey && e.code === "KeyS") {
                e.preventDefault();
                console.log('Handle')
                this.saveDocument();
                // Process the event here (such as click on submit button)
            }
        });
        //Handle printing
        document.addEventListener('keydown', async (e) => {
            if (window.navigator.platform.match("Win") && e.ctrlKey && e.code === "KeyP") {
                e.preventDefault();
                console.log('Want to print')
                this.setState({ hideToolBar: true });
                setTimeout(() => {
                    window.print();
                }, 2000)
            }
        });
        window.addEventListener('afterprint', () => {
            console.log('After printer')
            this.setState({ hideToolBar: false })
        });
    }

    onHandlePrinting = () => {
        this.setState({ ...this.state, hideToolBar: true });
        setTimeout(() => {
            window.print();
        }, 2000)
    }

    // Openin sidebar
    onHandleSideBarOpening = () => {
        this.setState({ ...this.state, openSidebar: true });
        this.actionBarRef?.current?.classList?.toggle('open-bar');
        // console.log(actionBarRef.current?.classList)
    }
    // Openin sidebar
    onHandleSideBarCLosing = () => {
        this.setState({ ...this.state, openSidebar: false });
        this.actionBarRef?.current?.classList?.remove('open-bar');
        // console.log(actionBarRef.current?.classList)
    }



    // Open new
    openNewWindow = async () => {
        await eel.open_new_intance()();
    }

    saveDocument = async (force?: boolean) => {
        // console.log(this._editorState);
        const document_stringlify = EditorStateTransformer2.convertToString(this.state.editorState.getCurrentContent())
        console.log(document_stringlify)
        const result = await eel.save_file(document_stringlify, this.state.path != null ? this.state.path : "empty", this.state.documentName, force)();
        console.log(result['filename']);
        console.log(result);
        this.setState({
            documentName: result['filename'],
            path: result['path']
        });
        this.fileInfoRef.current?.classList.add('file-info')

        setTimeout(() => {
            this.fileInfoRef.current?.classList.remove('file-info');
            this.setState({ isSaved: true });
            setTimeout(() => {
                this.setState({ isSaved: false })
            }, 2000)
        }, 6000)

    }


    exportAsPdf = () => {
        const docHtml = convertToRaw(this.state.editorState.getCurrentContent());
        const doc = new jsPDF();

        const markup = draftToHtml(docHtml);
        const splitText = doc.splitTextToSize(markup, 250);
        console.log(splitText)
        doc.setFontSize(12);
        const pageHeight = doc.internal.pageSize.height;
        var y = 20;
        for (var i = 0; i < splitText.length; i++) {
            if (y > pageHeight) {
                y = 20;
                doc.addPage();
            }
            // doc.fromHTML(splitText[i], 15, y, undefined, undefined, 15);
            y = y + 5;
            // }
            // console.log(markup);
            doc.fromHTML(markup, 20, 5, undefined, undefined,)
        }
        doc.save('save-me.pdf');
    }

    openDocument = async () => {
        const file_infos = await eel.open_file()()
        if (file_infos != null) {
            // console.log(file_infos);
            const file_info_json = JSON.parse(file_infos);
            this.setState({
                documentName: file_info_json.filename,
                path: file_info_json.path,
                editorState: EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content))
            })
        }
    }

    render() {
        return (
            <div className="texted-editor">
                {/* <CameraIcon onClick={openCamera} /> */}
                {/* {isCameraCLose ? <Modal open={isCameraCLose} onClose={props.capture}><TextEdWebcam onCLose={openCamera} webcamRef={webcamRef} onCapture={capture} /></Modal> : null} */}
                <div className="" style={{ flexBasis: "95.5%", display: "flex", flexDirection: "column", order: 2 }}>
                    <div className="file-anim" ref={this.fileInfoRef} style={{ backgroundColor: "white", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "40px", display: "flex" }}>
                        <p style={{ width: "100%", paddingLeft: this.state.isSaved ? 230 : 0, paddingTop: 5, textAlign: "center" }}>{this.state.documentName} - {this.state.path ? this.state.path : "Non defini"} {this.state.isSaved ? <span style={{ float: "right", marginRight: 50, color: "rgb(4, 226, 4)" }}>Document enregistrée avec sucess</span> : null}</p>
                    </div>
                    <Editor toolbarHidden={this.state.hideToolBar} toolbarClassName="toolbar" editorState={this.state.editorState} onEditorStateChange={this.onEditorContentChange} editorClassName="test" toolbar={ToolBarItems} toolbarCustomButtons={[]} wrapperStyle={{ height: "100%", overflow: "hidden", flexBasis: "100%", order: 2 }} editorStyle={{ padding: 25, backgroundColor: "white", marginTop: !this.state.hideToolBar ? 35 : 0, marginLeft: !this.state.hideToolBar ? 70 : 0, marginRight: !this.state.hideToolBar ? 70 : 0, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", overflow: "hidden" }} />
                </div>
                {/* */}
                {!this.state.hideToolBar ? <div ref={this.actionBarRef} onMouseEnter={this.onHandleSideBarOpening} onMouseLeave={this.onHandleSideBarCLosing} className="actions-bar" style={{ flexBasis: !this.state.openSidebar ? "4.5%" : "10%", transition: "flex-basis 400ms cubic-bezier(0.075, 0.82, 0.165, 1) reversed" }}>
                    {!this.state.openSidebar ? <PostAdd style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openNewWindow}><PostAdd style={{ marginRight: 4 }} />Nouveau</Button>}
                    {!this.state.openSidebar ? <FolderOpen style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openDocument}><FolderOpen style={{ marginRight: 4 }} />Ouvrir</Button>}
                    {!this.state.openSidebar ? <Save style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={() => this.saveDocument()}><Save style={{ marginRight: 4 }} /> Enregistrer</Button>}
                    {!this.state.openSidebar ? <SaveAlt style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 11, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Enregistrer sous" onClick={() => this.saveDocument(true)}><SaveAlt style={{ marginRight: 4 }} /> Enreg. sous</Button>}
                    {!this.state.openSidebar ? <PictureAsPdf style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Exporter en PDF" onClick={this.exportAsPdf}><PictureAsPdf style={{ marginRight: 4 }} />Exp. PDF</Button>}
                    {!this.state.openSidebar ? <Print style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.onHandlePrinting}><Print style={{ marginRight: 4 }} /> Imprimer</Button>}
                    {/* {!openSidebar ?<ExitToApp style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", display: "flex", justifyContent: "flex-start" }} onClick={exit}><ExitToApp style={{ marginRight: 4 }} /> Quitter</Button>} */}
                </div> : null}
            </div>
        );
    }
}


export default withRouter(textEditor)