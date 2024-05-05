export default function readFilenameFromPath(path) {
    const rawfile = path.split('/').pop();
    const [ file, querystring ] = rawfile.split('?'); 
    return decodeURIComponent(file);
}