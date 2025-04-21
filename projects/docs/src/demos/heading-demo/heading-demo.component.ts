import { Component } from '@angular/core';
import { TraakConfiguration, TraakEditorComponent, Heading, Paragraph} from "ngx-traak"

@Component({
  selector: 'app-heading-demo',
  imports: [TraakEditorComponent],
  templateUrl: './heading-demo.component.html',
  styleUrl: './heading-demo.component.css'
})
export class HeadingDemoComponent {
  config?: TraakConfiguration = {
    nodes: [Paragraph, Heading],
    marks: [],
    starterNode: `
     <doc>
        <heading level="1">Heading 1</heading>
        <heading level="2">Heading 2</heading>
        <heading level="3">Heading 3</heading>
     </doc>
    `
  }
}
