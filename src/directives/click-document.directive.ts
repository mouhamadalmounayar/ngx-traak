import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[click-outside]",
})
export class ClickOutside {
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();
  constructor(private elementRef: ElementRef) {
    document.addEventListener("click", (event) => {
      console.log("Called on click");
      console.log("Event target", event.target);
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.clickOutside.emit(event);
      }
    });
  }
}
