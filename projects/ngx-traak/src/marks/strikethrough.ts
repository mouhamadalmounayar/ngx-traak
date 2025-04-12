import { MarkInterface } from "./MarkInterface";
import { STRIKETHROUGH } from "../input-rules/regex";
export const StrikeThrough: MarkInterface = {
  type: "strikethrough",
  mark: {
    toDOM() {
      return ["s", 0];
    },
    parseDOM: [{ tag: "s" }],
  },
  regExp: STRIKETHROUGH,
};
