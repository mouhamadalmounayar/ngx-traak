import { TraakNodeInterface } from "./traak-node-interface";

export const Paragraph: TraakNodeInterface = {
  type: "paragraph",
  spec: {
    group: "block",
    content: "text*",
    toDOM() {
      return ["p", { class: "ngx-traak-node__paragraph" }, 0];
    },
    parseDOM: [{ tag: "p.ngx-traak-node__paragraph" }],
  },
};
