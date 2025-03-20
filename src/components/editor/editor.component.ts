import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TraakConfiguration } from "../../models";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { SchemaFactory } from "../../schemas/schema-factory";
import { fromHtmlToNode, parseXml } from "../../utils/helpers";
import {
  ConfigurationMissingException,
  ConfigurationParameterMissing,
  MISSING_PARAM,
  CONFIGURATION_MISSING,
} from "../../errors/errors";
import { keymap } from "prosemirror-keymap";
import { getKeymap } from "../../commands";
import { domEventPlugin } from "../../plugins/dom.plugin";

@Component({
  selector: "editor",
  standalone: true,
  imports: [],
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements AfterViewInit {
  @ViewChild("editor", { static: false }) editorRef?: ElementRef<HTMLElement>;
  @Input() config?: TraakConfiguration;
  @Output() transactionEvent = new EventEmitter<Transaction>();
  @Output() viewEvent = new EventEmitter<EditorView>();
  @Output() nodeHoverEvent = new EventEmitter<CustomEvent>();
  @Output() nodeOutEvent = new EventEmitter<CustomEvent>();
  @Output() nodeClickEvent = new EventEmitter<CustomEvent>();

  private schema?: Schema;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeEditor();
    }
  }

  private initializeEditor(): void {
    if (!this.config) {
      throw new ConfigurationMissingException(CONFIGURATION_MISSING);
    }
    if (!this.config.nodes) {
      throw new ConfigurationParameterMissing(MISSING_PARAM("nodes"));
    }

    this.schema = SchemaFactory.create(this.config.nodes);
    const doc = fromHtmlToNode(this.schema, parseXml(this.config.starterNode));
    const state = EditorState.create({
      doc,
    });

    if (!this.editorRef?.nativeElement) {
      throw new Error("Editor element not found.");
    }

    const view = new EditorView(this.editorRef.nativeElement, {
      state,
      dispatchTransaction: (tr: Transaction) => {
        const newState = view.state.apply(tr);
        view.updateState(newState);
        this.transactionEvent.emit(tr);
        this.viewEvent.emit(view);
      },
      plugins: [domEventPlugin, keymap(getKeymap())],
    });

    this.viewEvent.emit(view);
  }

  @HostListener("nodeHover", ["$event"])
  handleNodeHover(event: CustomEvent): void {
    this.nodeHoverEvent.emit(event);
  }

  @HostListener("nodeOut", ["$event"])
  handleNodeOut(event: CustomEvent): void {
    this.nodeOutEvent.emit(event);
  }

  @HostListener("nodeClick", ["$event"])
  handleNodeClick(event: CustomEvent): void {
    this.nodeClickEvent.emit(event);
  }
}
