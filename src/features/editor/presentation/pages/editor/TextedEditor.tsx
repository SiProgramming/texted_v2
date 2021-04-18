import { Button, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './texted-editor.style.scss';

export default class TextEdEditor extends React.Component {

    render(){
        return (
            <div className="texted-editor">
                <div className="editor-actions">
                    <Button className="actions-button" style={{backgroundColor:"blue",color:"white"}} title="dezs">Enregistrer</Button>
                </div>
                <Editor  editorStyle={{padding:25}} />
            </div>
        );
    }
}

