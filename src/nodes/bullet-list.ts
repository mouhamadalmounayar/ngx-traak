import { TraakNodeInterface } from "./traak-node-interface";
import { bulletList } from "prosemirror-schema-list";

export const BulletList: TraakNodeInterface = {
  type: "bullet_list",
  spec: bulletList,
};
