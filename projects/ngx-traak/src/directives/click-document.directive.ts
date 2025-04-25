import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[click-outside]",
})
/**
 * ClickOutside is a directive that emits an event when a click occurs outside of the element.
 */
export class ClickOutside {
  /**
   * Event emitted when a click occurs outside of the element.
   */
  @Output() clickOutside: EventEmitter<Event> = new EventEmitter<Event>();

  /**
   * @internal
   */
  constructor(private elementRef: ElementRef) {
    document.addEventListener("click", (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.clickOutside.emit(event);
      }
    });
  }
}
