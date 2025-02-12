import { EventService } from "./event.service";
import { Injectable } from "@angular/core";
type ClickEventDetails = {
  type: string;
  domElement: HTMLElement;
};
@Injectable({
  providedIn: "root",
})
export class ClickService extends EventService<ClickEventDetails> {}
