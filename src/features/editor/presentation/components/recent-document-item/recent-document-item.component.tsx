import React from 'react';
import {Link} from 'react-router-dom';
import './recent-document-item.style.scss';

const RecentDocumentItem=(props)=>{
    return (
        <Link style={{textDecoration:"none"}} to="/"><p className="recent-item">Software Developement Plan</p></Link>
    )
};

export default RecentDocumentItem;