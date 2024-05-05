import * as agents from '../../agents';

export default function loadSample() {
    return agents.fetch.get("/assets/sample.md");
}