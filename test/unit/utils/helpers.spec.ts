import { Schema } from "prosemirror-model";
import { builders, eq } from "prosemirror-test-builder";
import { fromHtmlToNode, parseXml } from "../../../src/utils/helpers";

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
  it("should create a node from html", () => {
    const node = fromHtmlToNode(schema, parseXml("<paragraph>Hello</paragraph>"))
    const expectedResult = traakBuilders["paragraph"]("Hello");
   expect(node).toEqual(expectedResult);
  })
});
