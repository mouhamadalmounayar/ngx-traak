import { ITALIC } from "../input-rules/regex";
import { MarkInterface } from "./MarkInterface";

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
