import { ITALIC } from "../input-rules/regex";
import { MarkInterface } from "./MarkInterface";

/**
 * Represents an italic mark.
 */
export const Italic: MarkInterface = {
  type: "italic",
  mark: {
    toDOM() {
      return ["i", 0];
    },
    parseDOM: [{ tag: "i" }],
  },
  regExp: ITALIC,
};
