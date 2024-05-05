import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Content from '../components/Content';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import './Home.css';
import ActivityBar from '../components/activityBar/ActivityBar';

function getProps({ store }) {
    return {
        isPreviewing: store.isPreviewing,
    };
}

@inject(getProps)
@observer
class Home extends Component {
    render() {
        return (
            <Content className="home">
                <ActivityBar />
                <Editor />
                <Preview />
            </Content>
        );
    }
}

export default Home;
