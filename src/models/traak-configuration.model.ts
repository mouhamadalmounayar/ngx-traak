import { TraakNode } from "../nodes/traak-node";
import { TraakNodeInterface } from "../nodes/traak-node-interface";

export interface TraakConfiguration {
  nodes: TraakNodeInterface[];
  starterNode: TraakNode;
}
