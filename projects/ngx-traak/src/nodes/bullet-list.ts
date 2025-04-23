import { InputRule } from "prosemirror-inputrules";
import { TraakNodeInterface } from "./traak-node-interface";
import { BULLET_LIST } from "../input-rules/regex";
import { Transaction } from "prosemirror-state";
import { replaceWithNode } from "../utils/helpers";

export const BulletList: TraakNodeInterface = {
  type: "bullet_list",
  spec: {
    content: "list_item+",
    group: "block",
    parseDOM: [{ tag: "ul.ngx-traak-node__bullet-list" }],
    toDOM() {
      return ["ul", { class: "ngx-traak-node__bullet-list" }, 0];
    },
  },
  inputRule: new InputRule(
    BULLET_LIST,
    (state, match, start, end): Transaction => {
      let { tr } = state;
      tr.delete(start, end);
      let result = replaceWithNode(
        tr,
        "<bullet_list><list_item><paragraph></paragraph></list_item></bullet_list>",
      );
      if (result) {
        tr = result;
      }
      return tr;
    },
  ),
};
