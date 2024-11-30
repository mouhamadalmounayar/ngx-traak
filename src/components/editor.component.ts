import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
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
@Component({
  selector: "editor",
  standalone: true,
  imports: [],
  template: ` <div #editor test-id="editor"></div> `,
  styles: ``,
})
export class EditorComponent implements OnInit {
  @ViewChild("#editor") editor?: ElementRef;
  @Input() config?: TraakConfiguration;
  @Output() transactionEvent: EventEmitter<Transaction> =
    new EventEmitter<Transaction>();
  @Output() viewEvent: EventEmitter<EditorView> =
    new EventEmitter<EditorView>();
  schema?: Schema;

  constructor() {}

  ngOnInit(): void {
    this.initializeEditor();
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
      },
    });
    this.viewEvent.emit(view);
  }
}
