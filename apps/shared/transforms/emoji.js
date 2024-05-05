import EmojiConverter from "emoji-js";
import "./emoji.css";

const emoji = new EmojiConverter();
emoji.img_sets.apple.path = "/assets/emoji-apple-64/";

export default function transformEmoji(/*config*/) {
  return str => {
    return emoji.replace_colons(str);
  };
}
