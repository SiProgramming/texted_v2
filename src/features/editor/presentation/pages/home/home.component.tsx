import React from 'react';
import DocumentViewItem from '../../components/document-view-item/document-view-item.component';
import RecentDocumentList from '../../components/recent-document-list/recent-document-list.component';
import Logo from '../../components/svg/logo/Logo';
import './home.style.scss';

const Home = () => {
    return (
        <div className="home">
            <div className="left-side">
                <div className="header">
                    <p style={{display:"flex",justifyContent:"space-between"}}><h2 className="title" style={{}} >Bienvenue !</h2><div style={{width:100,height:100,backgroundColor:"white",border:"2px solid #009FE3",borderRadius:50,display:"flex",justifyContent:"center",alignItems:"center"}}><Logo /></div></p>
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