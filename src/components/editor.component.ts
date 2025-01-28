import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TraakConfiguration } from "../models/traak-configuration.model";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { SchemaFactory } from "../schemas/schema-factory";
import { createNode } from "../utils/helpers";
import {
  ConfigurationMissingException,
  ConfigurationParameterMissing,
  MISSING_PARAM,
  CONFIGURATION_MISSING,
} from "../errors/errors";
import { keymap } from "prosemirror-keymap";
import { getKeymap } from "../commands";
@Component({
  selector: "editor",
  standalone: true,
  imports: [],
  template: `<div #editor test-id="editor"></div> `,
  styles: `
    .ProseMirror {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 10px 0;
    }
    p {
      height: 15px;
      padding: 5px;
    }
    .task-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements AfterViewInit {
  @ViewChild("editor") editor?: ElementRef;
  @Input() config?: TraakConfiguration;
  @Output() transactionEvent: EventEmitter<Transaction> =
    new EventEmitter<Transaction>();
  @Output() viewEvent: EventEmitter<EditorView> =
    new EventEmitter<EditorView>();
  baseSchema?: Schema;
  schema?: Schema;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) this.initializeEditor();
  }

  initializeEditor(): void {
    if (!this.config) {
      throw new ConfigurationMissingException(CONFIGURATION_MISSING);
    }
    if (!this.config.nodes) {
      throw new ConfigurationParameterMissing(MISSING_PARAM("nodes"));
    }
    this.schema = SchemaFactory.create(this.config.nodes);
    const doc = createNode(this.schema, this.config.starterNode);
    const state = EditorState.create({
      doc,
    });
    const view = new EditorView(this.editor?.nativeElement, {
      state: state,
      dispatchTransaction: (tr) => {
        const newState = view.state.apply(tr);
        view.updateState(newState);
        this.transactionEvent.emit(tr);
        this.viewEvent.emit(view);
        const { selection } = newState;
        const $from = selection.$from;
      },
      plugins: [keymap(getKeymap())],
    });
    this.viewEvent.emit(view);
  }
}
