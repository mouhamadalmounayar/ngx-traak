import { Injectable } from "@angular/core";
import { EventService } from "./event.service";
import { Node } from "prosemirror-model";
export type Coordinates = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
export type HoverEventDetails = {
  start: number;
  dims: Coordinates;
  node: Node;
};
@Injectable({
  providedIn: "root",
})
export class HoverService extends EventService<HoverEventDetails> {}
