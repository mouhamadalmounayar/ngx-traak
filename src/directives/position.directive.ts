import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";
import { HoverService } from "../services/hover.service";

@Directive({
  selector: "[position-rel-node]",
})
export class PositionPlugin implements AfterViewInit {
  @Input() placement: "left" | "right" | "top" | "bottom" | "center" = "top";
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 0;
  private nodeRect?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
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

  ngAfterViewInit() {
    this.updatePosition();
  }

  private updatePosition() {
    window.requestAnimationFrame(() => {
      if (!this.nodeRect) return;
      const elemRect = this.el.nativeElement.getBoundingClientRect();

      let left: number;
      let top: number;
      switch (this.placement) {
        case "left":
          left = this.nodeRect.left - elemRect.width + this.offsetX;
          top = this.nodeRect.top + this.offsetY;
          break;
        default:
          left = 0;
          top = 0;
          break;
      }
      this.renderer.setStyle(this.el.nativeElement, "left", `${left}px`);
      this.renderer.setStyle(this.el.nativeElement, "top", `${top}px`);
    });
  }
}
