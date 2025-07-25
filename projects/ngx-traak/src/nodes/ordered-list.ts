import { TraakNodeInterface } from "./traak-node-interface";
import { InputRule } from "prosemirror-inputrules";
import { ORDERED_LIST } from "../input-rules/regex";
import { Transaction } from "prosemirror-state";
import { replaceWithNode } from "../utils/helpers";

/**
 * An ordered list node
 */
export const OrderedList: TraakNodeInterface = {
  type: "ordered_list",
  spec: {
    content: "list_item+",
    group: "block",
    parseDOM: [{ tag: "ol.ngx-traak-node__ordered-list" }],
    toDOM() {
      return ["ol", { class: "ngx-traak-node__ordered-list" }, 0];
    },
  },
  inputRule: new InputRule(
    ORDERED_LIST,
    (state, match, start, end): Transaction => {
      let { tr } = state;
      tr.delete(start, end);
      let result = replaceWithNode(
        tr,
        "<ordered_list><list_item><paragraph></paragraph></list_item></ordered_list>",
      );
      if (result) {
        tr = result;
      }
      return tr;
    },
  ),
};
