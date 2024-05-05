import fm from 'front-matter';

const SEPARATOR = '---';
const NEW_LINE = "\n";
const DOUBLE_QUOTE = '\"';

function encodeForYaml(val) {
	return typeof val === 'string' ? DOUBLE_QUOTE+val+DOUBLE_QUOTE : val;
}

export function extractBodyAndMetadata(markdown) {
	const parsed = fm(markdown || '');
	const body = parsed.body;
	const metadata = parsed.attributes;
	return { body, metadata };
}

export function assembleFrontMatter(metadata = {}) {
	const frontMatter =
		Object.entries( metadata )
		.reduce( (acc, [key, val]) => {
			acc.push(`${key}: ${encodeForYaml(val)}`);
			return acc;
		}, [])
		.join( NEW_LINE );

	return [SEPARATOR, frontMatter, SEPARATOR].join( NEW_LINE );
}

export function assemblePresentationFile(body, metadata) {
	const frontMatter = assembleFrontMatter(metadata);
	return [ frontMatter, body ].join( NEW_LINE );
}

export function ensureOriginAndId(source, origin, id, options = { partsOnly: false }) {
	const { body, metadata } = extractBodyAndMetadata(source);
	
    if (!metadata.id) {
      metadata.id = id;
	}

    if ( !metadata.origin) {
      metadata.origin = origin;
	}

	return (options.partsOnly)  ? { body, metadata } : assemblePresentationFile(body, metadata);
}
