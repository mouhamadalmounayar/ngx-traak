import { Component } from "@angular/core";
import {
  TraakEditorComponent,
  TraakConfiguration,
  Paragraph,
  Bold,
} from "ngx-traak";

@Component({
  selector: "app-editor-demo",
  imports: [TraakEditorComponent],
  templateUrl: "./editor-demo.component.html",
  styleUrl: "./editor-demo.component.css",
})
export class EditorDemoComponent {
  config?: TraakConfiguration = {
    nodes: [Paragraph],
    marks: [Bold],
    starterNode: "<doc><paragraph>This is an editor instance.</paragraph></doc>",
  };
}
