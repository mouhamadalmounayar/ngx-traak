import { MarkInterface } from "./MarkInterface";
import { STRIKETHROUGH } from "../input-rules/regex";

/**
 * Represents a strikethrough mark.
 */
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
