import { TraakNodeInterface } from "./traak-node-interface";
import { bulletList } from "prosemirror-schema-list";

export const BulletList: TraakNodeInterface = {
  type: "bullet_list",
  spec: {
    content: "list_item+",
    group: "block",
    parseDOM: [{ tag: "ul" }],
    toDOM() {
      return ["ul", 0];
    },
  },
};
