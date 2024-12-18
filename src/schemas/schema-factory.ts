import { Schema } from "prosemirror-model";
import { baseSchema, createSchema } from "./traak-schema";
import { TraakNodeInterface } from "../nodes/traak-node-interface";
import { addListNodes } from "prosemirror-schema-list";

export class SchemaFactory {
  static create(nodes: TraakNodeInterface[]) {
    let schema: Schema;
    schema = nodes.reduce((acc: Schema, curr: TraakNodeInterface) => {
      acc = createSchema(acc, curr.type, curr.spec);
      return acc;
    }, baseSchema);
    return schema;
  }
  static createSchemaWithList(schema: Schema) {
    return new Schema({
      nodes: addListNodes(
        schema.spec.nodes as any,
        "paragraph block*",
        "block"
      ),
      marks: schema.spec.marks,
    });
  }
}
