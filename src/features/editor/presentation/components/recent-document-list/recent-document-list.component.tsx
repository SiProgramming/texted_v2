import React from 'react';
import { eel } from '../../../../../eel';
import RecentDocumentItem, { RecentDocumentProps } from '../recent-document-item/recent-document-item.component';
import './recent-document-list.style.scss';

export default class RecentDocumentList extends React.Component<any, { recentDocs: Array<RecentDocumentProps> }> {

    constructor(props: any) {
        super(props);
        this.state = {
            recentDocs: []
        };
    }

    async componentDidMount() {
        const recentDocs = await eel.get_recents_documents()()
        this.setState({ recentDocs: recentDocs });
    }

    render() {
        return (
            <div className="recent-document-list">
                {this.state.recentDocs.length !== 0 ? <ul>
                    {
                        this.state.recentDocs.map((doc, index) => <li key={index}><RecentDocumentItem filename={doc.filename} path={doc.path} /></li>)
                    }
                </ul> : <p style={{ color: "white" }}>Aucun document recents</p>
                }
            </div>
        )
    }
}
