import { Schema } from "prosemirror-model";
import {
  baseSchema,
  appendNodesToSchema,
  appendMarksToSchema,
} from "./traak-schema";
import { TraakNodeInterface } from "../nodes/traak-node-interface";
import { MarkInterface } from "../marks/MarkInterface";

export class SchemaFactory {
  static create(nodes: TraakNodeInterface[], marks: MarkInterface[]) {
    let schema: Schema;
    schema = nodes.reduce((acc: Schema, curr: TraakNodeInterface) => {
      acc = appendNodesToSchema(acc, curr.type, curr.spec);
      return acc;
    }, baseSchema);
    schema = marks.reduce((acc: Schema, curr: MarkInterface) => {
      acc = appendMarksToSchema(acc, curr.type, curr.mark);
      return acc;
    }, schema);
    return schema;
  }
}
