export default function guessTitleFromPresentation(body = '') {
    const LINE_BREAK = "\n";
    const matches = body.match(/# (.*)$/m);
    if (matches) return matches[1];
    
    const heading2Matches = body.match(/## (.*)$/m);
    if (heading2Matches) return heading2Matches[1];

    const lines = body.trim().split(LINE_BREAK);
    return (lines.length) ? lines[0] : 'Untitled Presentation';
}