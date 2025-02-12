import { Schema, ResolvedPos } from "prosemirror-model";
import { TraakNode } from "../nodes/traak-node";
import { EditorView } from "prosemirror-view";
import { addNode } from "./helpers";
import { VIEW_MISSING, ViewMissing } from "../errors/errors";
import { TextSelection } from "prosemirror-state";

export class Editor {
    _view?: EditorView;
    schema?: Schema;
    constructor(view: EditorView, schema: Schema) {
        this._view = view;
        this.schema = schema;
    }
    set view(newView: EditorView) {
        this._view = newView;
    }
    addNodeToDoc(node: TraakNode, overflow: boolean = true): void {
        console.log("called with type", node.type)
        if (!this._view) {
            throw new ViewMissing(VIEW_MISSING);
        }
        const tr = addNode(this._view.state, node, overflow);
        if (tr) {
            this._view.dispatch(tr);
        }
        this._view.focus();
    }

    setCursorToEndOfLine(pos?: number): void {
        if (!this._view) {
            throw new ViewMissing(VIEW_MISSING);
        }
        let tr = this._view.state.tr;
        const { $from } = this._view.state.selection;
        const start = pos ? pos : $from.start();
        tr = tr.setSelection(
            TextSelection.create(
                tr.doc,
                start + $from.parent.nodeSize - 2,
                start + $from.parent.nodeSize - 2,
            ),
        );
        this._view.dispatch(tr);
        this._view.focus();
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
