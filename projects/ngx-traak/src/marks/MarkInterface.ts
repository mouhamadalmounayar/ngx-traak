import { MarkSpec } from "prosemirror-model";

export interface MarkInterface {
  type: string;
  regExp: RegExp;
  mark: MarkSpec;
}
