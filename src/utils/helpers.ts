import { Schema, Node } from "prosemirror-model";
import { TraakNode } from "../nodes/traak-node";
import { TraakConfiguration } from "../models/traak-configuration.model";

export const createDocument = (schema: Schema, config: TraakConfiguration) => {
  return createNode(schema, config.starterNode);
};

export const createNode = (schema: Schema, node: TraakNode): Node => {
  if (!node.content) {
    return schema.nodes[node.type].create(node.attrs);
  }
  if (typeof node.content === "string") {
    return schema.text(node.content);
  }
  let children: Node[] = [];
  node.content.forEach((child) => {
    children.push(createNode(schema, child));
  });
  return schema.nodes[node.type].create(node.attrs, children);
};
