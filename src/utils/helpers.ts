import { Schema, Node, ResolvedPos } from "prosemirror-model";
import { EditorState, TextSelection, Transaction } from "prosemirror-state";

export const parseXml = (htmlString: string): HTMLElement => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/xml").documentElement;
};

const getAttributesObject = (attrs: NamedNodeMap): { [key: string]: string } => {
  return Array.from(attrs).reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {} as { [key: string]: string });
};

export const fromHtmlToNode = (schema: Schema, node: HTMLElement) => {
  const attributes = getAttributesObject(node.attributes);
  if (Array.from(node.children).length === 0) {
    if (!node.textContent) return schema.nodes[node.tagName].create();
    return schema.nodes[node.tagName].create(
      attributes,
      schema.text(node.textContent)
    );
  }
  let children: Node[] = [];
  let childElements = Array.from(node.children) as HTMLElement[];
  childElements.forEach((child) => {
    children.push(fromHtmlToNode(schema, child));
  });
  return schema.nodes[node.tagName].create(attributes, children);
};

export const addNode = (tr: Transaction, node: string): Transaction | null => {
  const { selection } = tr;
  const schema = tr.doc.type.schema;
  const $pos = selection.$from;
  const nodeInstance = fromHtmlToNode(schema, parseXml(node));
  if (nodeInstance && tr) {
    tr = tr.insert($pos.pos, nodeInstance);
    tr.setSelection(
      TextSelection.near(tr.doc.resolve($pos.pos + nodeInstance.nodeSize))
    );
    tr.scrollIntoView();
    return tr;
  }
  return null;
};

export const removeNodeAtDepth = (
  state: EditorState,
  depth?: number
): Transaction | null => {
  const { selection, schema } = state;
  const { $from } = selection;
  const node = depth ? $from.node(depth) : $from.parent;
  if (node.type.name === "doc") return null;
  const tr = state.tr.delete(
    $from.before(depth),
    $from.before(depth) + node.nodeSize
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
  node: string
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
      fromHtmlToNode(schema, parseXml(node))
    );
  } catch (error) {
    tr = tr.replaceWith(
      $from.before(),
      $from.after(),
      fromHtmlToNode(schema, parseXml(node))
    );
    return tr;
  }
  return tr;
};
