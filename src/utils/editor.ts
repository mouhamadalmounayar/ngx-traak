import { Schema, ResolvedPos } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { VIEW_MISSING, ViewMissing } from "../errors/errors";
import { Commands } from "./chain";

export class Editor {
  _view?: EditorView;
  schema?: Schema;
  commands: Commands;
  constructor(view: EditorView, schema: Schema) {
    this._view = view;
    this.schema = schema;
    this.commands = new Commands();
  }
  set view(newView: EditorView) {
    this._view = newView;
    this.commands.updateView(newView);
  }
  get view(): EditorView {
    return this._view!;
  }

  private getResolvedPos(): ResolvedPos {
    if (!this._view) {
      throw new ViewMissing(VIEW_MISSING);
    }
    const { state } = this._view;
    const { selection } = state;
    const { $from } = selection;
    return $from;
  }
}
