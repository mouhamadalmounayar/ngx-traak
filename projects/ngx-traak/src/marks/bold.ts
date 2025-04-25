import { BOLD } from "../input-rules/regex";
import { MarkInterface } from "./MarkInterface";

/**
 * Represents a bold mark.
 */
export const Bold: MarkInterface = {
  type: "bold",
  mark: {
    toDOM() {
      return ["strong", 0];
    },
    parseDOM: [{ tag: "strong" }],
  },
  regExp: BOLD,
};
