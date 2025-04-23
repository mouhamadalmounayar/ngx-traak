import { TraakNodeInterface } from "./traak-node-interface";
import { listItem } from "prosemirror-schema-list";

export const ListItem: TraakNodeInterface = {
  type: "list_item",
  spec: {
    content: "paragraph*",
    group: "block",
    parseDOM: [{ tag: "li.ngx-traak-node__list-item" }],
    toDOM() {
      return ["li", { class: "ngx-traak-node__list-item" }, 0];
    },
  },
};
