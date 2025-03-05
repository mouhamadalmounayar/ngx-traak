import { EditorView } from "prosemirror-view";
import { TraakNode } from "../nodes";
import { addNode } from "./helpers";
import { TextSelection, Transaction } from "prosemirror-state";

export class Commands {
  tr?: Transaction;
  view?: EditorView;
  constructor() {}
  addNode(node: TraakNode) {
    if (!this.tr || !this.view) return this;
    let tr = addNode(this.tr, node);
    if (tr) this.tr = tr;
    return this;
  }
  setCursorToEndOfLine(pos?: number) {
    if (!this.tr || !this.view) return this;
    const { $from } = this.tr.selection;
    const start = pos ? pos : $from.start();
    this.tr.setSelection(
      TextSelection.create(
        this.tr.doc,
        start + $from.parent.nodeSize - 2,
        start + $from.parent.nodeSize - 2,
      ),
    );
    return this;
  }
  commit(): void {
    if (this.tr && this.view) {
      this.view.dispatch(this.tr);
      this.view.focus();
    }
  }
  updateView(view: EditorView): void {
    this.view = view;
    this.tr = this.view.state.tr;
  }
}
