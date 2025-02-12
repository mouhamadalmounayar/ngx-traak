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
import { domEventPlugin } from "../plugins/hover.plugin";
@Component({
    selector: "editor",
    standalone: true,
    imports: [],
    template: `<div #editor test-id="editor"></div> `,
    styles: `
    .ProseMirror {
      padding: 10px;
      margin: 10px 0;
      width: 500px;
      height: 500px;
      font-family: "Segoe UI"
    }
    .ProseMirror:focus{
      text-decoration: none;
      outline: none;
    }
    p {
     margin: 5px;
     white-space: normal;
     word-wrap: break-word;
     overflow-wrap: break-word;
     position: relative; 
    }
    .task-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
    }
    @font-face{
      font-family: "Segoe UI";
      src: url("../../assets/segoe-ui-this/segoeuithis.ttf")
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
    @Output() nodeHoverEvent = new EventEmitter();
    @Output() nodeOutEvent = new EventEmitter();
    @Output() nodeClickEvent = new EventEmitter();
    baseSchema?: Schema;
    schema?: Schema;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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
                console.log("Node", $from.parent);
                console.log("Current Position", $from.pos);
            },
            plugins: [domEventPlugin, keymap(getKeymap())],
        });
        this.viewEvent.emit(view);
    }

    @HostListener("nodeHover", ["$event"])
    handleNodeHover($event: CustomEvent) {
        this.nodeHoverEvent.emit($event);
    }

    @HostListener("nodeOut", ["$event"])
    handleNodeOut($event: CustomEvent) {
        this.nodeOutEvent.emit($event);
    }

    @HostListener("nodeClick", ["$event"])
    handleNodeClick($event: CustomEvent) {
        this.nodeClickEvent.emit($event);
    }
}
