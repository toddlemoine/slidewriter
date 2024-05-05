import marked from 'marked';
import { configureTransforms } from '../../shared/transforms';

const SLIDE_DELIMITER = "\n\n";
const LINE_BREAK = "\n";

const transforms = [
  image,
  youtube,
  vimeo,
  emoji,
  instagram,
  dropbox,
  chart,
  cats
];

function combinedTransforms(str) {
  return transforms.reduce( (acc, fn) => fn(acc), str);
}

function applyTransforms (str) {
  return str.split(LINE_BREAK)
    .map(combinedTransforms)
    .join(LINE_BREAK);
}

export default function parseSlidesFromMarkdown(markdown) {
  return markdown.split(SLIDE_DELIMITER)
    .map(applyTransforms)
    .map(str => marked(str))
  }
