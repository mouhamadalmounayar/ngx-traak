import { Component, forwardRef, signal, computed, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { HoverService } from "../../../services/hover.service";
import { TraakPlugin } from "../traak-plugin";
import { TraakNode } from "../../../nodes";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { OutService } from "../../../services/out.service";
import { merge, map, filter } from "rxjs";
import { PositionPlugin } from "../../../directives";
import { FormsModule } from "@angular/forms";
import { ClickOutside } from "../../../directives/click-document.directive";
@Component({
  selector: "menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
  imports: [NgIf, NgClass, NgForOf, PositionPlugin, FormsModule, ClickOutside],
  providers: [
    { provide: TraakPlugin, useExisting: forwardRef(() => MenuComponent) },
  ],
  standalone: true,
})
export class MenuComponent extends TraakPlugin {
  isPluginVisible = signal(false);
  isHoveringButton = signal(false);
  isHoveringNode: Signal<boolean>;
  start: Signal<number | undefined>;
  buttonClasses = computed(() => ({
    "add-button__visible": this.isHoveringNode() || this.isHoveringButton(),
    "add-button__hidden": !this.isHoveringNode() && !this.isHoveringButton(),
  }));
  searchTerm: string = "";
  isMenuElementVisible(nodeName: string) {
    return () => {
      return !this.searchTerm
        ? true
        : nodeName.toLowerCase().includes(this.searchTerm.toLowerCase());
    };
  }
  constructor(
    private hoverService: HoverService,
    private outService: OutService,
  ) {
    super();

    const hover$ = this.hoverService.eventSubject.pipe(
      map((details) => !!details),
    );

    const out$ = this.outService.eventSubject.pipe(
      filter((details) => details?.event === "out"),
      map(() => false),
    );

    const start = this.hoverService.eventSubject.pipe(
      map((details) => details?.start),
    );

    this.start = toSignal(start);

    this.isHoveringNode = toSignal(merge(hover$, out$), {
      initialValue: false,
    });
  }

  hideMenu(): void {
    console.log("called method");
    this.isPluginVisible.set(false);
  }

  showMenu(): void {
    this.isPluginVisible.set(true);
  }

  onMouseOut(): void {
    this.isHoveringButton.set(false);
  }

  onMouseOver(): void {
    this.isHoveringButton.set(true);
  }

  addBulletList($event: MouseEvent): void {
    $event.preventDefault();
    this.editor.commands
      .setCursorToEndOfLine(this.start())
      .addNode(new TraakNode("bullet_list", [new TraakNode("list_item")]))
      .commit();
    this.isPluginVisible.set(false);
  }

  addOrderedList($event: MouseEvent): void {
    $event.preventDefault();
    this.editor.commands
      .setCursorToEndOfLine(this.start())
      .addNode(new TraakNode("ordered_list", [new TraakNode("list_item")]))
      .commit();
    this.isPluginVisible.set(false);
  }

  addTaskList($event: MouseEvent): void {
    $event.preventDefault();
    this.editor.commands
      .setCursorToEndOfLine(this.start())
      .addNode(
        new TraakNode("task_list", [
          new TraakNode("task_checkbox"),
          new TraakNode("paragraph"),
        ]),
      )
      .commit();
    this.isPluginVisible.set(false);
  }

  addLine($event: MouseEvent): void {
    $event.preventDefault();
    this.editor.commands
      .setCursorToEndOfLine(this.start())
      .addNode(new TraakNode("paragraph"))
      .commit();
    this.isPluginVisible.set(false);
  }

  update(): void {}
}
