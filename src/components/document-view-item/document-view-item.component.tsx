import React from 'react';
import { useHistory } from 'react-router-dom';
import './document-view-item.style.scss';


const DocumentViewItem=()=>{
    const _history=useHistory();

    const onClick=(e)=>{
        e.preventDefault();
        _history.push('/editor');
    }

    return (
        <div  onClick={onClick} className="document-item">
            <div className="document-item-inner">
                <p>Page Vierge</p>
            </div> 
        </div>
    )
}

export default DocumentViewItem;