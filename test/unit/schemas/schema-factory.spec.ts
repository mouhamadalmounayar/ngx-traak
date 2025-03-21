import { MarkInterface } from "../../../src/marks/MarkInterface";
import { Paragraph } from "../../../src/nodes/paragraph";
import { TraakNodeInterface } from "../../../src/nodes/traak-node-interface";
import { SchemaFactory } from "../../../src/schemas/schema-factory";

describe("SchemaFactory", () => {
  it("should create a schema with the provided nodes", () => {
    const nodes: TraakNodeInterface[] = [Paragraph];
    const schema = SchemaFactory.create(nodes, []);
    expect(schema.nodes["paragraph"]).toBeDefined();
  });
  it("should create a default schema with no nodes when no nodes are proviced", () => {
    const schema = SchemaFactory.create([], []);
    expect(schema.nodes["text"]).toBeDefined();
    expect(schema.nodes["doc"]).toBeDefined();
  });
});
