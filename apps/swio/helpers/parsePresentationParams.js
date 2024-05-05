export default function parsePresentationParams(pathname) {
    const parts = pathname.replace('/','').split(':');
    return parts.length ? { id: parts[1], origin: parts[0] } : null;
}