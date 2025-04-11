import { MarkInterface } from "../marks/MarkInterface";
import { TraakNodeInterface } from "../nodes/traak-node-interface";

export interface TraakConfiguration {
  nodes: TraakNodeInterface[];
  marks: MarkInterface[];
  starterNode: string;
}
