import React from 'react';
import DocumentViewItem from '../../components/document-view-item/document-view-item.component';
import RecentDocumentList from '../../components/recent-document-list/recent-document-list.component';
import './home.style.scss';

const Home = (props) => {
    return (
        <div className="home">
            <div className="left-side">
                <div className="header">
                        <h2 className="title">Bienvenue !</h2>
                </div>
                <div className="recent-box">
                    <p className="recent-subtitle">Retrouvez vos fichiers recents :</p>
                    <div className="content">
                        <RecentDocumentList />
                    </div>
                </div>
            </div>
            <div className="right-side">
                <DocumentViewItem />
            </div>
        </div>
    )
}

export default Home;