const youTubeEmbedBaseUrl = 'https://www.youtube.com/embed/';
const reYouTube = /^https:\/\/(www\.)?(youtube\.com)\/(.*)/;
const reYouTubeShort = /^https:\/\/(www\.)?(youtu\.be)\/(.*)/;

function contains(str = '', searchStr) {
	return str.indexOf(searchStr) !== -1;
}


function paramsToUrlString(params) {
	if (Object.keys(params).length == 0) return '';

	return Object.entries(params)
			.map( keyVal => keyVal.join('='))
			.join('&')
}

function sourceFromYouTuDotBe(str) {
	const lastPart = str.match(reYouTubeShort).pop();
	const [ video, t ] = lastPart.split('?');
	const params = { feature: 'youtu.be' };

	if (t) {
		params.start = t.split('=').pop();
	}

	return youTubeEmbedBaseUrl + video + `?${paramsToUrlString(params)}`;
}

function parseQueryString(url) {
	const qs = url.split('?').pop();
	return qs.split('&').reduce( (acc, curr) => {
		const [ key, val ] = curr.split('=');
		acc[ key ] = val;
		return acc;
	}, {});
}

function sourceFromYouTubeDotCom(str) {
	const lastPart = str.match(reYouTube).pop();
	const queryStringParams = parseQueryString(lastPart);
	const params = {};

	if (queryStringParams.t) {
		params.start = queryStringParams.t;
	}

	return youTubeEmbedBaseUrl + queryStringParams.v + `?${paramsToUrlString(params)}`;
}

function embedYouTube(src) {
    return `<iframe width="560" height="315" src="${src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

function convertToYouTubeEmbed(str) {
	if (str.match(reYouTubeShort)) {
		return embedYouTube( sourceFromYouTuDotBe(str) );
	}

  if (str.match(reYouTube)) {
		return embedYouTube( sourceFromYouTubeDotCom(str) );
  }

  return str;
}

export default function transformYouTube(/*config*/) {
	return convertToYouTubeEmbed;
}
