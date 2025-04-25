import { EditorView } from "prosemirror-view";
import { addNode } from "./helpers";
import { TextSelection, Transaction } from "prosemirror-state";

/**
 * This class defines the different commands that users can chain in order to interact with the editor
 */
export class Commands {
  /**
   * @internal
   */
  tr?: Transaction;

  /**
   * @internal
   */
  view?: EditorView;

  /**
   * @internal
   */
  constructor() {}

  /**
   * Adds a node to the editor at the current position
   * @param node an xml string representation of the node instance to be added
   * @returns
   */
  addNode(node: string) {
    if (!this.tr || !this.view) return this;
    let tr = addNode(this.tr, node);
    if (tr) this.tr = tr;
    return this;
  }

  /**
   * Moves the cursor to the specified position
   * @param pos an integer representing the position you want the cursor to move to. You can
   * retrieve positions by using the event services. Defaults to the current position.
   * @returns
   */
  moveCursor(pos?: number) {
    if (!this.tr || !this.view) return this;
    pos = pos ? pos : this.view.state.selection.$from.pos;
    this.tr.setSelection(TextSelection.near(this.view.state.doc.resolve(pos)));
    return this;
  }

  /**
   * Commits a transaction, making the changes effective in the editor.
   */
  commit(): void {
    if (this.tr && this.view) {
      this.view.dispatch(this.tr);
      this.view.focus();
    }
  }

  /**
   *
   * @internal
   */
  updateView(view: EditorView): void {
    this.view = view;
    this.tr = this.view.state.tr;
  }
}
