import React from 'react';
import RecentDocumentItem from '../recent-document-item/recent-document-item.component';
import './recent-document-list.style.scss';

const RecentDocumentList=(props)=>{
    return (
        <div className="recent-document-list">
            <ul>
                {
                    [1,2,3,4,5,6].map((item)=><li><RecentDocumentItem /></li>)
                }
            </ul>
        </div>
    )
}

export default RecentDocumentList;