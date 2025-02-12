import { Injectable } from "@angular/core";
import { EventService } from "./event.service";
type OutEventDetails = {
  event: string;
};
@Injectable({
  providedIn: "root",
})
export class OutService extends EventService<OutEventDetails> {}
