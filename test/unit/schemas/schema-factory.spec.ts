import { Paragraph } from "../../../src/nodes/paragraph";
import { TraakNodeInterface } from "../../../src/nodes/traak-node-interface";
import { SchemaFactory } from "../../../src/schemas/schema-factory";
import { Bold, StrikeThrough } from "../../../src/marks";
import { ListItem, BulletList } from "../../../src/nodes";

describe("SchemaFactory", () => {
  it("should create a schema with the provided nodes", () => {
    const nodes: TraakNodeInterface[] = [Paragraph];
    const schema = SchemaFactory.create(nodes, []);
    expect(schema.nodes["paragraph"]).toBeDefined();
  });
  it("should create a default schema with no nodes when no nodes are provided", () => {
    const schema = SchemaFactory.create([], []);
    expect(schema.nodes["text"]).toBeDefined();
    expect(schema.nodes["doc"]).toBeDefined();
  });
  it("should create a schema with the following nodes, and marks", () => {
    const schema = SchemaFactory.create([Paragraph, ListItem, BulletList], [Bold, StrikeThrough])
    expect(schema.nodes["paragraph"]).toBeDefined();
    expect(schema.nodes["bullet_list"]).toBeDefined();
    expect(schema.nodes["list_item"]).toBeDefined();
    expect(schema.marks["bold"]).toBeDefined();
    expect(schema.marks["strikethrough"]).toBeDefined();
  })
});
