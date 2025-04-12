import { Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Editor } from "../../utils/editor";
import { Schema } from "prosemirror-model";
export abstract class TraakPlugin {
  view: EditorView | null;
  transaction: Transaction | null;
  schema: Schema | null;
  editor: Editor;
  constructor() {
    this.view = null;
    this.transaction = null;
    this.schema = null;
    this.editor = new Editor(this.view!, this.schema!);
  }
  abstract update(): void;
}
