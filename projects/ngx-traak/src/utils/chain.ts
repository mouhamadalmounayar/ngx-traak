import { EditorView } from "prosemirror-view";
import { addNode } from "./helpers";
import { TextSelection, Transaction } from "prosemirror-state";

export class Commands {
  tr?: Transaction;
  view?: EditorView;
  constructor() {}
  addNode(node: string) {
    if (!this.tr || !this.view) return this;
    let tr = addNode(this.tr, node);
    if (tr) this.tr = tr;
    return this;
  }
  moveCursor(pos?: number) {
    if (!this.tr || !this.view) return this;
    pos = pos ? pos : this.view.state.selection.$from.pos;
    this.tr.setSelection(TextSelection.near(this.view.state.doc.resolve(pos)));
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
