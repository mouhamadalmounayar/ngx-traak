import { Injectable } from "@angular/core";
import { EventService } from "./event.service";
export type HoverEventDetails = {
  nodeRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
  start: number;
};
@Injectable({
  providedIn: "root",
})
export class HoverService extends EventService<HoverEventDetails> {}
