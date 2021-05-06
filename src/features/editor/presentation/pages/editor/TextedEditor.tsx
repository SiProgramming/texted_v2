import Button from '@material-ui/core/Button';
import { CameraAlt, FolderOpen, PhotoLibraryOutlined, PostAdd, Print, Save, SaveAlt } from '@material-ui/icons';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { eel } from '../../../../../eel';
import './texted-editor.style.scss';
import ToolBarItems from './TextEditorToolBarItems';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import { EditorStateTransformer2 } from '../../../../../core/utils/transformers/EditorStateTransformer';
import { withRouter } from 'react-router-dom';

import createImagePlugin from "@draft-js-plugins/image";
import TextEdWebcam from '../../components/webcam/webcam.components';
import { Modal } from '@material-ui/core';
const imagePlugin = createImagePlugin();

const AlertMessage = (props: { isError: boolean }) => {
    return (
        <span style={{ float: "right", marginRight: 50, color: props.isError ? "red" : "rgb(4, 226, 4)" }}>{props.isError ? "Document non trouvé" : "Document Enregistrer"}</span>
    );
}

const CameraIcon = (props: {
    editorRef: any,
    onCaptureImage: () => void,
    onShowWebCam: () => void
}) => {


    return (
        <div onClick={props.onShowWebCam} className="custom-toolbar-button" title="Webcam">
            <CameraAlt fontSize="small" />
        </div>
    )
};

const AddLocalImage = (props: {
    imageRef: React.RefObject<HTMLInputElement>,
    onImageChange: () => void,
}) => {
    return (
        <div className="custom-toolbar-button" title="Ajouter une image">
            {/* <form action=""  > */}
            <label htmlFor="add-image"><PhotoLibraryOutlined fontSize="small" /></label>
            <input ref={props.imageRef} onChange={props.onImageChange} type="file" style={{ display: "none" }} accept="image/*" id="add-image" />
            {/* </form> */}
        </div>
    )
}

const textEditor = class TextEdEditor extends React.Component<any, {
    editorState: EditorState,
    documentName?: string,
    path?: null,
    openWebcam: boolean,
    openSidebar: boolean,
    hideToolBar: boolean,
    isSaved: boolean,
    isError: boolean,
    isPrinting:boolean
}>{
    actionBarRef: React.RefObject<HTMLDivElement>;
    editorRef: React.RefObject<any>;
    webcamRef: React.RefObject<any>;
    imageRef: React.RefObject<HTMLInputElement>;
    fileInfoRef: React.RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            documentName: "Document Sans nom",
            path: undefined,
            openWebcam: false,
            openSidebar: false,
            hideToolBar: false,
            isSaved: false,
            isError: false,
            isPrinting:false
        };
        this.webcamRef = React.createRef();
        this.fileInfoRef = React.createRef();
        this.actionBarRef = React.createRef();
        this.editorRef = React.createRef();
        this.imageRef = React.createRef();
    }


    // CLose webcam
    onHandleCLoseWebcam = () => {
        this.setState({ openWebcam: false });
    }


    onHandleOpenWebcam = () => {
        this.setState({ openWebcam: true });
        console.log(this.state.openWebcam)
    }


    onImageLoad = () => {
        if (this.imageRef.current?.files) {
            const fileReader = new FileReader();
            const fileInfo: { base64: string } = {
                base64: ''
            };
            fileReader.onload = (file) => {
                if (typeof file.target?.result == "string") {
                    fileInfo.base64 = file.target.result;
                    const newEditorState = this.insertImage(this.state.editorState, fileInfo.base64);
                    console.log(newEditorState.getCurrentContent())
                    this.onEditorContentChange(newEditorState);
                }
            }
            fileReader.readAsDataURL(this.imageRef.current?.files[0]);
        }
    };

    insertImage = (editorState: EditorState, base64: string, options?: { width: number, height: number }) => {
        return imagePlugin.addImage(editorState, base64, options ?? { width: 250, height: 150 });
    };

    onEditorContentChange = (editorState: EditorState) => this.setState({ ...this.state, editorState });

    componentDidMount = () => {
        //Save document
        document.addEventListener('keydown', (e) => {
            if (window.navigator.platform.match("Win") && e.ctrlKey && e.code === "KeyS") {
                e.preventDefault();
                this.saveDocument();
                // Process the event here (such as click on submit button)
            }
        });

        window.addEventListener('beforeunload', () => {
            const response = window.confirm("Etes vous sure de vouloir fermer l'Editeur ?");
            console.log(response);
        })
        //Handle printing
        document.addEventListener('keydown', async (e) => {
            if (window.navigator.platform.match("Win") && e.ctrlKey && e.code === "KeyP") {
                e.preventDefault();
                this.setState({ hideToolBar: true,isPrinting:true });
                setTimeout(() => {
                    window.print();
                }, 2000)
            }
        });
        window.addEventListener('afterprint', () => {
            this.setState({ hideToolBar: false,openSidebar:false })
        });

        if (this.props.location.state) {
            this.openDocumentFromPath(this.props.location.state.path);
        }
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
    }
    // Openin sidebar
    onHandleSideBarCLosing = () => {
        this.setState({ ...this.state, openSidebar: false });
        this.actionBarRef?.current?.classList?.remove('open-bar');
    }

    convertDoc = (file_infos: string) => {
        const file_info_json = JSON.parse(file_infos);
        this.setState({
            documentName: file_info_json.filename,
            path: file_info_json.path,
            editorState: EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content))
        });
    }



    // Open new
    openNewWindow = async () => {
        await eel.open_new_intance()();
    }

    saveDocument = async (force?: boolean) => {
        // console.log(this._editorState);
        const document_stringlify = EditorStateTransformer2.convertToString(this.state.editorState.getCurrentContent())
        const result = await eel.save_file(document_stringlify, this.state.path != null ? this.state.path : "empty", this.state.documentName, force)();
        if (result !== null || result !== "null") {
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

    }


    onCaptureImage = () => {
        console.log("Heelo");
        const imageSrc = this.webcamRef.current?.getScreenshot()
        const newEditorState = this.insertImage(this.state.editorState, imageSrc, {
            width: 300,
            height: 200
        });
        this.setState((state) => ({ ...state, openWebcam: false }));
        this.onEditorContentChange(newEditorState)
    }


    openDocument = async () => {
        const file_infos = await eel.open_file()()
        if (file_infos !== null) {
            const file_info_json = JSON.parse(file_infos);
            const split_doc: Array<string> = file_info_json.filename.split(".")
            if (split_doc[split_doc.length - 1] === "docx") {
                const blocksFromHTML = convertFromHTML(file_info_json.content);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap,
                );
                this.setState({
                    documentName: file_info_json.filename,
                    path: file_info_json.path,
                    editorState: EditorState.createWithContent(state)
                })
            }
            else {
                this.setState({
                    documentName: file_info_json.filename,
                    path: file_info_json.path,
                    editorState: EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content))
                })
            }
        }
        else {
            this.setState({ isError: false, isSaved: false })
        }
    }

    openDocumentFromPath = async (path: string) => {
        const file_infos = await eel.open_file_from_path(path)()
        if (file_infos != null) {
            const file_info_json = JSON.parse(file_infos);
            this.setState({
                documentName: file_info_json.filename,
                path: file_info_json.path,
                editorState: EditorState.createWithContent(EditorStateTransformer2.convertToContentState(file_info_json.content))
            })
        }
        else {
            this.setState({ isError: true, isSaved: true })
        }
    }

    render() {
        return (
            <div className="texted-editor">
                {/* <TextEdWebcam webcamRef={this.webcamRef} onCLose={this.onHandleCLoseWebcam} onCapture={this.onHandleOpenWebcam} /> */}
                <Modal open={this.state.openWebcam} onClose={this.onHandleCLoseWebcam}><TextEdWebcam webcamRef={this.webcamRef} onCLose={this.onHandleCLoseWebcam} onCapture={this.onCaptureImage} /></Modal>
                <div className="" style={{ flexBasis:!this.state.hideToolBar?"95.5%":"100%", display: "flex", flexDirection: "column", order: 2 }}>
                   { !this.state.hideToolBar ?
                    <div className="file-anim" ref={this.fileInfoRef} style={{ backgroundColor: "white", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "40px", display: "flex" }}>
                        <p style={{ width: "100%", paddingLeft: this.state.isSaved ? 230 : 0, paddingTop: 5, textAlign: "center" }}>{this.state.documentName} - {this.state.path ? this.state.path : "Non defini"} {this.state.isSaved ? <AlertMessage isError={this.state.isError} /> : null}</p>
                    </div>:null
                   }    
                    <Editor ref={this.editorRef} toolbarHidden={this.state.hideToolBar} toolbarClassName="toolbar" editorState={this.state.editorState} onEditorStateChange={this.onEditorContentChange} editorClassName="test" toolbar={ToolBarItems} toolbarCustomButtons={[<AddLocalImage imageRef={this.imageRef} onImageChange={this.onImageLoad} />, <CameraIcon editorRef={this.editorRef} onCaptureImage={this.onCaptureImage} onShowWebCam={this.onHandleOpenWebcam} />]} wrapperStyle={{ height: "100%", flexBasis: "100%", order: 2 }} editorStyle={{padding: 25, backgroundColor: "white", marginTop: !this.state.hideToolBar ? 35 : 0, marginLeft: !this.state.hideToolBar ? 70 : 0, marginRight: !this.state.hideToolBar ? 70 : 0, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", overflow: "auto", height:!this.state.hideToolBar? "87%":"100%" }} />
                </div>
                {/* */}
                {!this.state.hideToolBar ? <div ref={this.actionBarRef} onMouseEnter={this.onHandleSideBarOpening} onMouseLeave={this.onHandleSideBarCLosing} className="actions-bar" style={{ flexBasis: !this.state.openSidebar ? "4.5%" : "10%", transition: "flex-basis 400ms cubic-bezier(0.075, 0.82, 0.165, 1) reversed" }}>
                    {!this.state.openSidebar ? <PostAdd style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openNewWindow}><PostAdd style={{ marginRight: 4 }} />Nouveau</Button>}
                    {!this.state.openSidebar ? <FolderOpen style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.openDocument}><FolderOpen style={{ marginRight: 4 }} />Ouvrir</Button>}
                    {!this.state.openSidebar ? <Save style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={() => this.saveDocument()}><Save style={{ marginRight: 4 }} /> Enregistrer</Button>}
                    {!this.state.openSidebar ? <SaveAlt style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 11, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Enregistrer sous" onClick={() => this.saveDocument(true)}><SaveAlt style={{ marginRight: 4 }} /> Enreg. sous</Button>}
                    {/* {!this.state.openSidebar ? <PictureAsPdf style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} title="Exporter en PDF" onClick={this.exportAsPdf}><PictureAsPdf style={{ marginRight: 4 }} />Exp. PDF</Button>} */}
                    {!this.state.openSidebar ? <Print style={{ border: "1px solid white", padding: 5, color: "white", fontSize: 40, marginBottom: 7, borderRadius: 5 }} /> : <Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white", borderRadius: 5, width: "85%", marginBottom: 12, display: "flex", justifyContent: "flex-start" }} onClick={this.onHandlePrinting}><Print style={{ marginRight: 4 }} /> Imprimer</Button>}
                    {/* {!openSidebar ?<ExitToApp style={{border:"1px solid white",padding:5,color:"white",fontSize:40,marginBottom:7,borderRadius:5}} />:<Button variant="outlined" className="action-button" style={{ margin: "0 15px", fontSize: 12, textTransform: "capitalize", borderColor: "white",borderRadius:5,width: "85%", display: "flex", justifyContent: "flex-start" }} onClick={exit}><ExitToApp style={{ marginRight: 4 }} /> Quitter</Button>} */}
                </div> : null}
            </div>
        );
    }
}


export default withRouter(textEditor)
