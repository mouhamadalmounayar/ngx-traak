import { CODE } from "../input-rules/regex";
import { MarkInterface } from "./MarkInterface";

export const Code: MarkInterface = {
  type: "code",
  mark: {
    toDOM() {
      return ["code", 0];
    },
    parseDOM: [{ tag: "code" }],
  },
  regExp: CODE,
};
