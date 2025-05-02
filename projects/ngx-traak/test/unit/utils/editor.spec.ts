import { Editor } from "../../../src/utils/editor";
import { builders, eq } from "prosemirror-test-builder";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
describe("editor tests", () => {
  const schema = new Schema({
    nodes: {
      doc: { content: "block+" },
      text: { group: "inline" },
      paragraph: {
        group: "block",
        content: "inline*",
        toDOM() {
          return ["p", 0];
        },
        parseDOM: [{ tag: "p" }],
      },
    },
  });
  const traakbuilders = builders(schema);
  const doc = traakbuilders.paragraph("Hello");
  const state = EditorState.create({ doc });
  const view = new EditorView(document.createElement("div"), { state });
  const editor: Editor = new Editor(view, schema);
  it("should dispatch a transaction that adds a node to the document", () => {
    editor.commands.addNode("<paragraph>Hello</paragraph>").commit();
    const expectedResult = traakbuilders.doc(
      traakbuilders.paragraph("Hello"),
      traakbuilders.paragraph("Hello"),
    );
    eq(editor.view.state.doc, expectedResult);
  });
  it("should dispatch a transaction that inserts text at the current cursor position", () => {
    editor.commands.insertText("World").commit();
    const expectedResult = traakbuilders.doc(
      traakbuilders.paragraph("HelloWorld"),
    );
    eq(editor.view.state.doc, expectedResult);
  });
});
