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
import {
  chainCommands,
  joinBackward,
  joinTextblockBackward,
} from "prosemirror-commands";
import { liftListItem, wrapInList } from "prosemirror-schema-list";
import { Query } from "@angular/core";

type Command = (
  state: EditorState,
  dispatch: ((tr: Transaction) => void) | undefined,
) => boolean;

export const addLine: Command = (state, dispatch) => {
  let tr = addNode(state.tr, new TraakNode("paragraph"));
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

export const exitListItem = (type: string): Command => {
  return (state, dispatch) => {
    const { selection } = state;
    const { $from } = selection;
    if ($from.node(-1).type.name != type || !isCursorAtStart($from)) {
      return false;
    }
    return liftListItem(state.schema.nodes[type])(state, dispatch);
  };
};
export const addListItemCommand = (type: string): Command => {
  return (state, dispatch) => {
    const { selection } = state;
    const { $from } = selection;
    if ($from.node(-1).type.name !== type) return false;
    let tr = addNode(
      state.tr,
      new TraakNode(type, [new TraakNode("paragraph")]),
    );
    tr = tr!.scrollIntoView();
    if (dispatch) {
      dispatch(tr);
      return true;
    }
    return false;
  };
};

export const addOrderedList: Command = (state, dispatch) => {
  let tr = addNode(
    state.tr,
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
    state.tr,
    new TraakNode("bullet_list", [new TraakNode("list_item")], null),
  );
  tr = tr!.scrollIntoView();
  if (dispatch) {
    dispatch(tr);
    return true;
  }
  return false;
};

export function getKeymap(): Record<string, Command> {
  return {
    Enter: chainCommands(
      addListItemCommand("task_list_item"),
      addListItemCommand("list_item"),
      splitBlock,
      addLine,
    ),
    Backspace: chainCommands(
      exitListItem("list_item"),
      exitListItem("task_list_item"),
      joinTextblockBackward,
      joinBackward,
      removeSelection,
    ),
  };
}
