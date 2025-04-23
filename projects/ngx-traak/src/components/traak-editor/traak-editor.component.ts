import {
  Component,
  contentChildren,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { Signal } from "@angular/core";
import { NgIf } from "@angular/common";
import { EditorComponent } from "../editor/editor.component";
import { EditorView } from "prosemirror-view";
import { TraakConfiguration } from "../../models";
import { TraakPlugin } from "../plugins/traak-plugin";
import { Transaction } from "prosemirror-state";
import { HoverService } from "../../services/hover.service";
import { OutService } from "../../services/out.service";
import { ClickService } from "../../services/click.service";
@Component({
  selector: "traak-editor",
  standalone: true,
  imports: [EditorComponent, NgIf],
  templateUrl: "./traak-editor.component.html",
  styleUrls: ["./traak-editor.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class TraakEditorComponent {
  @Input() config?: TraakConfiguration;
  _view?: EditorView | null = null;
  _transaction?: Transaction | null = null;
  signals: Signal<readonly TraakPlugin[]> = contentChildren(TraakPlugin);
  constructor(
    private _hoverService: HoverService,
    private _outService: OutService,
    private _clickService: ClickService,
  ) {}
  handleViewEvent(view: EditorView) {
    this.view = view;
  }

  handleTransactionEvent(transaction: Transaction) {
    this.transaction = transaction;
  }

  set transaction(newTransaction: Transaction) {
    this._transaction = newTransaction;
    let plugins = this.signals();
    plugins.forEach((plugin) => {
      plugin.transaction = newTransaction;
      plugin.update();
    });
  }

  set view(newView: EditorView) {
    this._view = newView;
    let plugins = this.signals();
    plugins.forEach((plugin) => {
      plugin.view = newView;
      plugin.editor.view = newView;
      plugin.update();
    });
  }

  handleNodeClick(evt: any): void {
    this._clickService.sendDetails(evt.detail);
  }
  handleHover(evt: any): void {
    this._hoverService.sendDetails(evt.detail);
  }
  handleOut(evt: any): void {
    this._outService.sendDetails(evt.detail);
  }
}
