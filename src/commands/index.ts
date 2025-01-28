import { EditorState, TextSelection, Transaction } from "prosemirror-state";
import {
  addNode,
  isCursorAtEnd,
  isCursorAtStart,
  isFirstChild,
  isNodeEmpty,
  replaceWithNode,
} from "../utils/helpers";
import { TraakNode } from "../nodes";
import { chainCommands, joinBackward } from "prosemirror-commands";

type Command = (
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
) => boolean;

export const addLine: Command = (state, dispatch) => {
  let tr = addNode(state, new TraakNode("paragraph"));
  tr = tr!.scrollIntoView();
  if (dispatch) {
    dispatch(tr);
    return true;
  }
  return false;
};

export const splitBlock: Command = (state, dispatch) => {
  const { selection } = state;
  const { $from } = selection;
  if (isCursorAtEnd($from)) return false;
  let tr = state.tr.split($from.pos);
  if (dispatch) {
    dispatch(tr);
    return true;
  }
  return false;
};

export const removeSelection: Command = (state, dispatch) => {
  const { selection } = state;
  if (selection.empty) return false;
  const tr = state.tr.delete(selection.$from.pos, selection.$to.pos);
  if (dispatch) {
    dispatch(tr);
    return true;
  }
  return false;
};

export const removeEmptySelection: Command = (state, dispatch) => {
  const { selection } = state;
  if (selection.empty) {
    let tr = state.tr.delete(selection.$from.pos - 1, selection.$from.pos);
    let newPos = selection.$from.pos - 1;
    if (!newPos) return false;
    if (dispatch) dispatch(tr);
    return true;
  }
  return false;
};

export const exitFirstListItem: Command = (state, dispatch) => {
  const { selection, schema } = state;
  const { $from } = selection;
  const range = $from.blockRange();
  let tr;
  if (
    $from.parent.type.name != "list_item" ||
    !isCursorAtStart($from) ||
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
};

export const exitListItem: Command = (state, dispatch) => {
  const { selection, schema } = state;
  const { $from } = selection;
  const range = $from.blockRange();
  if (
    $from.parent.type.name !== "list_item" ||
    !isCursorAtStart($from) ||
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
};

export const addListItem: Command = (state, dispatch) => {
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
};

export const addOrderedList: Command = (state, dispatch) => {
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
};

export const addBulletList: Command = (state, dispatch) => {
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
};

export const removeTaskList: Command = (state, dispatch) => {
  const { selection } = state;
  const { $from } = selection;
  if (!$from.node(1)) {
    return false;
  }
  if ($from.node(1).type.name != "task_list" || !isCursorAtStart($from))
    return false;
  let tr = replaceWithNode(
    state,
    new TraakNode("paragraph", [
      new TraakNode(
        "text",
        $from.parent.textContent ? $from.parent.textContent : " ",
      ),
    ]),
  );
  if (!tr) return false;
  tr.setSelection(TextSelection.create(tr.doc, $from.pos - 1, $from.pos - 1));
  tr.scrollIntoView();
  if (dispatch) {
    dispatch(tr);
    return true;
  }
  return false;
};

export const addTaskList: Command = (state, dispatch) => {
  const { selection, schema } = state;
  const { $from } = selection;
  if ($from.node(1).type.name != "task_list") return false;
  let tr = addNode(
    state,
    new TraakNode("task_list", [
      new TraakNode("task_checkbox"),
      new TraakNode("paragraph"),
    ]),
  );
  if (dispatch) {
    dispatch(tr!);
    return true;
  }
  return false;
};

export function getKeymap(): Record<string, Command> {
  return {
    Enter: chainCommands(addTaskList, addListItem, splitBlock, addLine),
    Backspace: chainCommands(
      removeTaskList,
      exitFirstListItem,
      exitListItem,
      removeSelection,
      joinBackward,
    ),
  };
}
