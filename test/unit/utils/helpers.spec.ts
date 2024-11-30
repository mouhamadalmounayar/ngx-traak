import { Schema } from "prosemirror-model";
import { createDocument, createNode } from "../../../src/utils/helpers";
import { TraakNode } from "../../../src/nodes/traak-node";
import { TraakConfiguration } from "../../../src/models/traak-configuration.model";
import { builders, eq } from "prosemirror-test-builder";

describe("helpers functions", () => {
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

  const traakBuilders = builders(schema);

  it("should return a new node", () => {
    const node = new TraakNode(
      "paragraph",
      [new TraakNode("text", "Hello", null)],
      null,
    );
    const result = createNode(schema, node);
    const expectedResult = traakBuilders.paragraph("Hello");
    eq(result, expectedResult);
  });
});
