import { Node, Schema } from "prosemirror-model";
import {
  addLine,
  addListItemCommand,
  addBulletList,
  exitListItem,
  splitBlock,
} from "../../../src/commands";
import { builders, eq } from "prosemirror-test-builder";
import { Command, Transaction } from "prosemirror-state";
import { createState, getTagObject, select } from "./utils";
import ist from "ist";
import { SchemaFactory } from "../../../src/schemas/schema-factory";
import {
  BulletList,
  ListItem,
  Paragraph,
  TaskList,
  TaskListItem,
} from "../../../src/nodes";
const apply = (doc: Node, command: Command, result?: Node) => {
  let state = createState(doc);
  command(state, (tr: Transaction) => (state = state.apply(tr)));
  ist(state.doc, result || doc, eq);
  if (result && getTagObject(result).a != null) {
    ist(state.selection, select(result), eq);
  }
};
describe("test paragraph commands", () => {
  const schema = SchemaFactory.create([Paragraph], []);
  const traakBuilders = builders(schema);
  it("should add a paragraph to the document", () => {
    const doc = traakBuilders["doc"](traakBuilders["paragraph"]("Hello<a>"));
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["paragraph"]("<a>"),
    );
    apply(doc, addLine, expectedResult);
  });
  it("should split a paragraph content correctly", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello<a>World"),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["paragraph"]("<a>World"),
    );
    apply(doc, splitBlock, expectedResult);
  });
});

describe("test list commands", () => {
  const schema = SchemaFactory.create([
    Paragraph,
    ListItem,
    BulletList,
    TaskListItem,
    TaskList,
  ], []);
  const traakBuilders = builders(schema);
  it("should add a bullet_list to the document ", () => {
    const doc = traakBuilders["doc"](traakBuilders["paragraph"]("Hello<a>"));
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](traakBuilders["list_item"](
        traakBuilders["paragraph"]()
      )),
    );
    apply(doc, addBulletList, expectedResult);
  });
  it("should add a list item to the existing bullet_list", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"](traakBuilders["paragraph"]("World<a>")),
      ),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"](traakBuilders["paragraph"]("World")),
        traakBuilders["list_item"](traakBuilders["paragraph"]("<a>")),
      ),
    );
    apply(doc, addListItemCommand("list_item"), expectedResult);
  });
  it("should exit a list into a paragraph node with the same text content", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"](traakBuilders["paragraph"]("<a>World")),
      ),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["paragraph"]("<a>World"),
    );
    apply(doc, exitListItem("list_item"), expectedResult);
  });
  it("should exit a single list item into a paragraph node with the same text content", () => {
    const doc = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"](traakBuilders["paragraph"]("World")),
        traakBuilders["list_item"](traakBuilders["paragraph"]("<a>Planet")),
      ),
    );
    const expectedResult = traakBuilders["doc"](
      traakBuilders["paragraph"]("Hello"),
      traakBuilders["bullet_list"](
        traakBuilders["list_item"](traakBuilders["paragraph"]("World")),
      ),
      traakBuilders["paragraph"]("<a>Planet"),
    );
    apply(doc, exitListItem("list_item"), expectedResult);
  });
});
