import { configureTransforms } from "../transforms";
import marked from "marked";

const SLIDE_DELIMITER = "\n\n";
const LINE_BREAK = "\n";

class SlideParser {
  constructor(config) {
    this.transforms = configureTransforms(config);
  }
  combinedTransforms = (str, data) => {
    return this.transforms.reduce((acc, fn) => fn(acc, data), str);
  };

  applyTransforms = (str, data) => {
    return str
      .split(LINE_BREAK)
      .map(str => this.combinedTransforms(str, data))
      .join(LINE_BREAK);
  };

  parse = (markdown, data) => {
    return markdown
      .split(SLIDE_DELIMITER)
      .map(str => this.applyTransforms(str, data))
      .map(str => marked(str));
  };
}

export default SlideParser;
