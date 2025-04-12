import { TraakNodeInterface } from "./traak-node-interface";

export const Paragraph: TraakNodeInterface = {
  type: "paragraph",
  spec: {
    group: "block",
    content: "text*",
    toDOM() {
      return ["p", 0];
    },
    parseDOM: [{ tag: "p" }],
  },
};
