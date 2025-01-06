import { Node, Schema } from "prosemirror-model";
import { CommandFactory } from "../../../src/commands";
import { builders, eq } from "prosemirror-test-builder";
import { Command, Transaction } from "prosemirror-state";
import { createState, getTagObject, select } from "./utils";
import ist from "ist";
import { SchemaFactory } from "../../../src/schemas/schema-factory";
import { BulletList, ListItem, Paragraph } from "../../../src/nodes";
const apply = (doc: Node, command: Command, result?: Node) => {
  let state = createState(doc);
  command(state, (tr: Transaction) => (state = state.apply(tr)));
  ist(state.doc, result || doc, eq);
  if (result && getTagObject(result).a != null) {
    ist(state.selection, select(result), eq);
  }
};
describe("test paragraph commands", () => {
  const schema = SchemaFactory.create([Paragraph]);
  const traakBuilders = builders(schema);
  it("should add a paragraph to the document", () => {
    const doc = traakBuilders["doc"](traakBuilders["paragraph"]("Hello<a>"));
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["paragraph"](" <a>"),
    );
    console.log("DOC", doc);
    apply(doc, new CommandFactory().addLine, expectedResult);
  });
});

describe("test list commands", () => {
  const schema = SchemaFactory.create([Paragraph, ListItem, BulletList]);
  const traakBuilders = builders(schema);
  it("should add a bullet_list to the document ", () => {
    const doc = traakBuilders["doc"](traakBuilders["paragraph"]("Hello<a>"));
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](traakBuilders["list_item"]()),
    );
    apply(doc, new CommandFactory().addBulletList, expectedResult);
  });
  it("should add a list item to the existing bullet_list", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](traakBuilders["list_item"]("World<a>")),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"]("World"),
        traakBuilders["list_item"]("<a>"),
      ),
    );
    apply(doc, new CommandFactory().addListItem, expectedResult);
  });
  it("should exit a list into a paragraph node with the same text content", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](traakBuilders["list_item"]("<a>World")),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["paragraph"]("<a>World"),
    );
    apply(doc, new CommandFactory().exitFirstListItem, expectedResult);
  });
  it("should exit a single list item into a paragraph node with the same text content", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"]("World"),
        traakBuilders["list_item"]("<a>Planet"),
      ),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](traakBuilders["list_item"]("World")),
      traakBuilders["paragraph"]("<a>Planet"),
    );
    apply(doc, new CommandFactory().exitListItem, expectedResult);
  });
});
