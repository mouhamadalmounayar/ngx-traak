import { Schema, ResolvedPos } from "prosemirror-model";
import { TraakNode } from "../nodes/traak-node";
import { EditorView } from "prosemirror-view";
import { createNode } from "./helpers";

export class Editor {
  schema: Schema;
  view: EditorView;

  constructor(view: EditorView, schema: Schema) {
    this.view = view;
    this.schema = schema;
  }

  addNode(node: TraakNode): void {
    let newNode = createNode(this.schema, node);
    const $nodePos = this.getResolvedPos();
    const { state } = this.view;
    const { tr } = state;
    tr.insert($nodePos.pos, newNode);
    this.view.dispatch(tr);
  }

  private getResolvedPos(): ResolvedPos {
    const { state } = this.view;
    const { selection } = state;
    const { $from } = selection;
    return $from;
  }
}
