import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from "@angular/core";
import { HoverService } from "../services/hover.service";

@Directive({
  selector: "[position-rel-node]",
})
/**
 * PositionPlugin is a directive that positions an element relative to a node.
 */
export class PositionPlugin implements AfterViewInit {
  /**
   * placement of the element relative to the node
   */
  @Input() placement: "left" | "right" | "top" | "bottom" | "center" = "top";

  /**
   * x offset of the element relative to the node
   */
  @Input() offsetX: number = 0;

  /**
   * y offset of the element relative to the node
   */
  @Input() offsetY: number = 0;

  private nodeRect?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };

  /**
   * @internal
   */
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private _hoverService: HoverService,
  ) {
    this.renderer.setStyle(this.el.nativeElement, "position", "fixed");
    this._hoverService.eventSubject.subscribe((details) => {
      if (details?.nodeRect) {
        this.nodeRect = details.nodeRect;
        this.updatePosition();
      }
    });
  }

  /**
   * @internal
   */
  ngAfterViewInit() {
    // update the position when an animation starts to avoid delay in positioning
    // for chrome.
    this.el.nativeElement.addEventListener("animationstart", () => {
      this.updatePosition();
    });
    this.updatePosition();
  }

  private updatePosition() {
    if (!this.nodeRect) return;
    const elemRect = this.el.nativeElement.getBoundingClientRect();

    let left: number;
    let top: number;
    switch (this.placement) {
      case "left":
        left = this.nodeRect.left - elemRect.width - this.offsetX;
        top =
          this.nodeRect.top +
          this.nodeRect.height / 2 -
          elemRect.height / 2 +
          this.offsetY;
        break;
      // TODO: Implement the rest of the cases
      default:
        left = 0;
        top = 0;
        break;
    }
    this.renderer.setStyle(this.el.nativeElement, "left", `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, "top", `${top}px`);
    this.renderer.setStyle(this.el.nativeElement, "z-index", "9999");
  }
}
