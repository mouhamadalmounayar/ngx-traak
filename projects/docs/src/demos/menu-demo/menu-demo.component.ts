import { Component } from "@angular/core";
import {
  TraakEditorComponent,
  TraakConfiguration,
  MenuComponent,
  Paragraph,
  TaskListItem,
  BulletList,
  OrderedList,
  TaskList,
} from "ngx-traak";
import { ListItem } from "../../../../ngx-traak/src/nodes";
@Component({
  selector: "app-menu-demo",
  imports: [TraakEditorComponent, MenuComponent],
  templateUrl: "./menu-demo.component.html",
  styleUrl: "./menu-demo.component.css",
})
export class MenuDemoComponent {
  config?: TraakConfiguration = {
    nodes: [
      Paragraph,
      ListItem,
      TaskListItem,
      BulletList,
      OrderedList,
      TaskList,
    ],
    marks: [],
    starterNode: `<doc><paragraph>Hover over the node</paragraph></doc>`,
    editorWidth: "500px",
  };
}
