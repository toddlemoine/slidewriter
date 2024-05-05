const reCats = /^\[catpic( .*)?\]/gi;
const catApiUrl = "https://api.thecatapi.com/v1/images/search?format=src";

export default function cats(/*config*/) {
  return str => {
    if (str.match(reCats)) {
      return `<div class="slide-image" style="background-image:url(${catApiUrl})"></div>`;
    }

    return str;
  };
}
