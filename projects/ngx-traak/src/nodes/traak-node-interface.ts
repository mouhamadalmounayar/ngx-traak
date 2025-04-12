import { InputRule } from "prosemirror-inputrules";
import { NodeSpec } from "prosemirror-model";

export interface TraakNodeInterface {
  type: string;
  spec: NodeSpec;
  inputRule?: InputRule; 
}
