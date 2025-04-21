---
keyword: InstallationPage
---

NgxTraak can be installed via npm.

```bash
npm install ngx-traak
```

Since NgxTraak is a wrapper around prosemirror, you will also need to install prosemirror packages. 

```bash
npm i prosemirror-model prosemirror-view prosemirror-commands prosemirror-state prosemirror-inputrules prosemirror-schema-list prosemirror-keymap
```

After installing the different packages, you can import the `TraakEditorComponent` into your components directly.
  
```typescript
@Component({
  selector: "app-root",
  imports: [RouterOutlet, TraakEditorComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
```

To use it in your template, you must define a configuration first. The configuration object is where you can define
what nodes and marks the editor will support.

```typescript
import { Component } from "@angular/core";
import { TraakEditorComponent, TraakConfiguration } from "ngx-traak";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TraakEditorComponent, Paragraph, Bold],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  config?: TraakConfiguration = {
    nodes: [Paragraph],
    marks: [Bold],
    starterNode: "<doc><paragraph></paragraph></doc>",
  }
}
```

In the configuration, the `starter-node` attribute is a required parameter as well. 
This attribute specifies the initial node with which the editor will be initialized. To instantiate a node, you need to provide an XML string that represents the tree-like structure of your document. 
Every document begins with a root document node. 
In this case, the editor will be initialized with an empty paragraph as the starting node.
The final step to see the editor in action is to add the component to your template.
```html
<traak-editor [config]="config"></traak-editor>
```
{{ NgDocActions.demo("EditorDemoComponent") }}
