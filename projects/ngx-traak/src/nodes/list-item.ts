import { TraakNodeInterface } from "./traak-node-interface";
import { listItem } from "prosemirror-schema-list";

/**
 * A list item node. Should be instantiated as a child of bullet_list or an ordered_list node.
 */
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
