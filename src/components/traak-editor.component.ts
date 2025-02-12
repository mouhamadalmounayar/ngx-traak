import {
  Component,
  contentChildren,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { Signal } from "@angular/core";
import { NgIf } from "@angular/common";
import { EditorComponent } from "./editor.component";
import { EditorView } from "prosemirror-view";
import { TraakConfiguration } from "../models";
import { TraakPlugin } from "./plugins/traak-plugin";
import { Transaction } from "prosemirror-state";
import { HoverService } from "../services/hover.service";
import { OutService } from "../services/out.service";
import { ClickService } from "../services/click.service";
@Component({
  selector: "traak-editor",
  standalone: true,
  imports: [EditorComponent, NgIf],
  template: ` <ng-content></ng-content>
    <editor
      (nodeClick)="handleNodeClick($event)"
      (nodeHover)="handleHover($event)"
      (nodeOut)="handleOut($event)"
      (viewEvent)="handleViewEvent($event)"
      (transactionEvent)="handleTransactionEvent($event)"
      *ngIf="config"
      [config]="config"
    ></editor>`,
  styles: `
    :root {
      --border-color: #e5e5e5;
      --basic-gray: #4b5563;
      --hover-gray: #f3f4f6;
      --basic-blue: #1d4ed8;
      --hover-blue: #eff6ff;

      --tooltip-width: 150px;
      --menu-width: 100px;
    }
    @font-face{
      font-family: "Segoe UI";
      src: url("../../assets/segoe-ui-this/segoeuithis.ttf")
    }
  `,
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
