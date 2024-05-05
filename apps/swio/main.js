import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Loading from '../shared/components/Loading';
import { addBrowserCSSClasses } from './helpers/browserDetect';
import AppStore from './stores/appStore';
import ExportStore from './stores/exportStore';
import Hub from './stores/hub';
import MetadataStore from './stores/metadataStore';
import PresentationStore from './stores/presentationStore';
import RoutingStore from './stores/routingStore';
import bootstrap from './bootstrap';
import history from './history';
import '../shared/styles/base.css';
import migrateFromVersion1 from './migrations/v1';

addBrowserCSSClasses(document.querySelector('html'));

const main = document.querySelector('main');
ReactDOM.render(<Loading />, main);

migrateFromVersion1()
    .then(bootstrap)
    .then(({ auth, files, origin, initialPresentation }) => {
        const hub = new Hub(files, origin, initialPresentation, history);

        const stores = {
            hub: hub,
            store: new AppStore(hub),
            metadataStore: new MetadataStore(hub),
            presentationStore: new PresentationStore(hub),
            exportStore: new ExportStore(hub),
            routing: new RoutingStore(hub, history),
        };

        ReactDOM.unmountComponentAtNode(main);

        ReactDOM.render(
            <Provider {...stores}>
                <App />
            </Provider>,
            main,
        );
    });
