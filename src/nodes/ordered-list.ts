import { orderedList } from "prosemirror-schema-list";
import { TraakNodeInterface } from "./traak-node-interface";

export const OrdererList: TraakNodeInterface = {
  type: "ordered_list",
  spec: {
    content: "list_item+",
    group: "block",
    parseDOM: [{ tag: "ol" }],
    toDOM() {
      return ["ol", 0];
    },
  },
};
