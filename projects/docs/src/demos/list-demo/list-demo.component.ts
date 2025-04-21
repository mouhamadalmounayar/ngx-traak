import { Component } from "@angular/core";
import {
  TraakEditorComponent,
  TraakConfiguration,
  Paragraph,
  ListItem,
  TaskListItem,
  BulletList,
  OrderedList,
  TaskList,
  Code
} from "ngx-traak";
@Component({
  selector: "app-list-demo",
  imports: [TraakEditorComponent],
  templateUrl: "./list-demo.component.html",
  styleUrl: "./list-demo.component.css",
})
export class ListDemoComponent {
  config?: TraakConfiguration = {
    nodes: [
      Paragraph,
      ListItem,
      TaskListItem,
      BulletList,
      OrderedList,
      TaskList,
    ],
    marks: [Code],
    starterNode: `
      <doc>
        <bullet_list>
            <list_item><paragraph>This is a bullet list.</paragraph></list_item>
        </bullet_list>
        <ordered_list>
            <list_item><paragraph>This is an ordered list.</paragraph></list_item>
        </ordered_list>
        <task_list>
            <task_list_item><paragraph>This is a task list.</paragraph></task_list_item>
        </task_list>
      </doc>
    `
  };
}
