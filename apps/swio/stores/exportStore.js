import { action } from 'mobx';

class ExportStore {
    constructor(hub) {
        this.hub = hub;
    }

    @action 
    export = () => {
        const { hub } = this;
        const text = hub.assemblePresentationFile();
        const title = hub.bestAvailableTitle;
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([text], {type: 'text/markdown'}));
        a.download = `${title}.md`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }
}

export default ExportStore;