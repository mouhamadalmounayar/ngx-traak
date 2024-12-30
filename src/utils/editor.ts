import { Schema, ResolvedPos } from "prosemirror-model";
import { TraakNode } from "../nodes/traak-node";
import { EditorView } from "prosemirror-view";
import { addNode } from "./helpers";

export class Editor {
  schema: Schema;
  view: EditorView;

  constructor(view: EditorView, schema: Schema) {
    this.view = view;
    this.schema = schema;
  }

  addNodeToDoc(node: TraakNode): void {
    const tr = addNode(this.view.state, node);
    if (tr) {
      this.view.dispatch(tr);
    }
    this.view.focus();
  }

  private getResolvedPos(): ResolvedPos {
    const { state } = this.view;
    const { selection } = state;
    const { $from } = selection;
    return $from;
  }
}
