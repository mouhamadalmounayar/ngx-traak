import { EditorState, Transaction } from "prosemirror-state";
import {
  addNode,
  isCursorAtStart,
  isFirstChild,
  isNodeEmpty,
} from "../utils/helpers";
import { TraakNode } from "../nodes";
import { chainCommands } from "prosemirror-commands";

type Command = (
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
) => boolean;

export class CommandFactory {
  addLine(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    let tr = addNode(state, new TraakNode("paragraph"));
    tr = tr!.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  removeSelection(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ): boolean {
    const { selection } = state;
    if (selection.empty) return false;
    const tr = state.tr.delete(selection.$from.pos, selection.$to.pos);
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  removeEmptySelection(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ): boolean {
    const { selection } = state;
    if (selection.empty) {
      const tr = state.tr.delete(selection.$from.pos - 1, selection.$from.pos);
      if (dispatch) dispatch(tr);
      return true;
    }
    return false;
  }

  exitFirstListItem(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    const { selection, schema } = state;
    const { $from } = selection;
    const range = $from.blockRange();
    let tr;
    if (
      !isCursorAtStart($from) ||
      $from.parent.type.name != "list_item" ||
      !range ||
      !isFirstChild($from, range.depth)
    )
      return false;
    if (isNodeEmpty($from.parent)) {
      const listPos = $from.before(range.depth);
      const listNode = $from.node(range.depth);
      tr = state.tr.delete(listPos, listPos + listNode.nodeSize);
      if (dispatch) {
        dispatch(tr);
        return true;
      }
    }
    tr = state.tr.lift(range, range.depth - 1);
    tr = tr.setBlockType($from.pos, $from.pos, schema.nodes["paragraph"]);
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  exitListItem(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    const { selection, schema } = state;
    const { $from } = selection;
    const range = $from.blockRange();
    if (
      !isCursorAtStart($from) ||
      $from.parent.type.name !== "list_item" ||
      !range
    )
      return false;
    let tr = state.tr.lift(range, range.depth - 1);
    tr = tr.setBlockType(range.start, range.end, schema.nodes["paragraph"]);
    if (dispatch) {
      dispatch(tr!);
      return true;
    }
    return false;
  }

  addListItem(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    const { selection } = state;
    const { $from } = selection;
    if ($from.parent.type.name !== "list_item") return false;
    let tr = addNode(state, new TraakNode("list_item"));
    tr = tr!.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  addOrderedList(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    let tr = addNode(
      state,
      new TraakNode("ordered_list", [new TraakNode("list_item")], null),
    );
    tr = tr!.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  addBulletList(
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) {
    let tr = addNode(
      state,
      new TraakNode("bullet_list", [new TraakNode("list_item")], null),
    );
    tr = tr!.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  }

  getKeymap(): Record<string, Command> {
    return {
      Enter: chainCommands(this.addListItem, this.addLine),
      Backspace: chainCommands(
        this.exitFirstListItem,
        this.exitListItem,
        this.removeEmptySelection,
        this.removeSelection,
      ),
    };
  }
}
