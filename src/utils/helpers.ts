import { Schema, Node, ResolvedPos } from "prosemirror-model";
import { TraakNode } from "../nodes/traak-node";
import { TraakConfiguration } from "../models/traak-configuration.model";
import { EditorState, TextSelection, Transaction } from "prosemirror-state";

export const createDocument = (schema: Schema, config: TraakConfiguration) => {
  return createNode(schema, config.starterNode);
};

export const createNode = (schema: Schema, node: TraakNode): Node => {
  if (!node.content) {
    return schema.nodes[node.type].create(node.attrs);
  }
  if (typeof node.content === "string") {
    return schema.text(node.content);
  }
  let children: Node[] = [];
  node.content.forEach((child) => {
    children.push(createNode(schema, child));
  });
  return schema.nodes[node.type].create(node.attrs, children);
};

export const addNode = (
  state: EditorState,
  node: TraakNode,
): Transaction | null => {
  const { selection, schema } = state;
  const $pos = selection.$from;
  const nodeInstance = createNode(schema, node);
  if (nodeInstance) {
    const tr = state.tr.insert($pos.pos, nodeInstance);
    const newPos = $pos.pos + nodeInstance.nodeSize;
    tr.setSelection(TextSelection.create(tr.doc, newPos, newPos));
    return tr;
  }
  return null;
};

export const removeNodeAtDepth = (
  state: EditorState,
  depth?: number,
): Transaction | null => {
  const { selection, schema } = state;
  const { $from } = selection;
  const node = depth ? $from.node(depth) : $from.parent;
  if (node.type.name === "doc") return null;
  const tr = state.tr.delete(
    $from.before(depth),
    $from.before(depth) + node.nodeSize,
  );
  return tr;
};

export const isNodeEmpty = (node: Node): boolean => {
  return node.textContent.trim().length === 0;
};

export const isCursorAtStart = ($pos: ResolvedPos): boolean => {
  return $pos.pos === $pos.before() + 1;
};

export const isCursorAtEnd = ($pos: ResolvedPos): boolean => {
  return $pos.pos === $pos.after() - 1;
};

export const isFirstChild = ($pos: ResolvedPos, depth: number): boolean => {
  return $pos.index(depth) === 0;
};

export const replaceWithNode = (
  state: EditorState,
  node: TraakNode,
): Transaction | null => {
  const { selection, schema } = state;
  const $from = selection.$from;
  const range = $from.blockRange();
  let tr = state.tr;
  if (!range) return null;
  try {
    tr = tr.replaceWith(
      $from.before(range.depth),
      $from.after(range.depth),
      createNode(schema, node),
    );
  } catch (error) {
    tr = tr.replaceWith(
      $from.before(),
      $from.after(),
      createNode(schema, node),
    );
    return tr;
  }
  return tr;
};
