import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
  BulletList,
  ListItem,
  OrderedList,
  Paragraph,
  TraakConfiguration,
  TraakEditorComponent,
  Heading,
  Bold,
  Italic,
  StrikeThrough,
  MenuComponent,
} from "ngx-traak";
@Component({
  selector: "app-root",
  imports: [RouterOutlet, TraakEditorComponent, MenuComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "ngx-traak-demo";
  config: TraakConfiguration = {
    nodes: [Paragraph, Heading, ListItem, BulletList, OrderedList],
    marks: [Bold, Italic, StrikeThrough],
    starterNode: "<doc><paragraph>Hello World !</paragraph></doc>",
  };
}
