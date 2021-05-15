import React from 'react';
import { Link } from 'react-router-dom';
import './recent-document-item.style.scss';

export interface RecentDocumentProps {
    path: string,
    filename: string
}

const RecentDocumentItem = (props: RecentDocumentProps) => {
    return (
        <Link style={{ textDecoration: "none" }} to={
            {
                pathname:"/editor",
                state:{path:props.path}
            }
        }><p className="recent-item">{props.filename.split('.texted')[0]}</p></Link>
    )
};

export default RecentDocumentItem;