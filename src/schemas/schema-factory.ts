import {Schema} from "prosemirror-model";
import {baseSchema, createSchema} from "./traak-schema";
import {TraakNodeInterface} from "../nodes/traak-node-interface";

export class SchemaFactory {
  static create(nodes: TraakNodeInterface[]) {
    let schema: Schema;
    schema = nodes.reduce((acc: Schema, curr: TraakNodeInterface) => {
      acc = createSchema(acc, curr.type, curr.spec);
      return acc;
    }, baseSchema);
    return schema;
  }
}
