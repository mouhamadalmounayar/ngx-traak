import { Node } from "prosemirror-model";
import {
  EditorState,
  NodeSelection,
  TextSelection,
  Selection,
} from "prosemirror-state";

export function createState(doc: Node) {
  return EditorState.create({
    doc,
    selection: select(doc),
  });
}

export function getTagObject(node: Node) {
  return (node as any).tag;
}

export function select(doc: Node) {
  const a = getTagObject(doc).a;
  if (a != null) {
    const $a = doc.resolve(a);
    if ($a.parent.inlineContent) {
      return new TextSelection(
        $a,
        getTagObject(doc).b != null
          ? doc.resolve(getTagObject(doc).b)
          : undefined,
      );
    } else {
      return new NodeSelection($a);
    }
  }
  return Selection.atStart(doc);
}
