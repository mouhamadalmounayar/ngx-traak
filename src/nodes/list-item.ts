import { TraakNodeInterface } from "./traak-node-interface";
import { listItem } from "prosemirror-schema-list";

export const ListItem: TraakNodeInterface = {
  type: "list_item",
  spec: {
    content: "paragraph*",
    group: "block",
    parseDOM: [{ tag: "li" }],
    toDOM() {
      return ["li", 0];
    },
  },
};
