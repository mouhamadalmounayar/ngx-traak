import { orderedList } from "prosemirror-schema-list";
import { TraakNodeInterface } from "./traak-node-interface";

export const OrdererList: TraakNodeInterface = {
  type: "ordered_list",
  spec: orderedList,
};
