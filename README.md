<div align="center">
  <img src="https://github.com/user-attachments/assets/a27c4ff0-8c91-4fec-b454-4ed61bea637f" alt="Logo">  
   
![test workflow](https://github.com/mouhamadalmounayar/ngx-traak/actions/workflows/test.yaml/badge.svg)
![publish workflow](https://github.com/mouhamadalmounayar/ngx-traak/actions/workflows/publish.yaml/badge.svg)
</div>

NgxTraak is designed with high level customization in mind. You can create your own angular components that integrate seamlessly into the builtin's WYSIWYG editor logic. 

# Getting Started
## Installation
Install ngx-traak via npm by running the following command in your project directory:
```bash
npm i ngx-traak
```
NgxTraak is a wrapper around prosemirror, so you'll also need to install prosemirror packages as peer dependencies: 
```bash 
npm i prosemirror-model prosemirror-view prosemirror-commands prosemirror-state prosemirror-inputrules prosemirror-schema-list prosemirror-keymap
```
## Usage
You can setup the editor by importing the necessary components, nodes and marks you need and defining them in the `TraakConfiguration` object. 

The core component you'll need is the `TraakEditorComponent`, which contains the prosemirror logic for instantiating an editor. This component expects the `TraakConfiguration` as input. Other components are optional builtin plugins that you can choose to use, or you can create your own custom components by extending the `TraakPlugin` class.

In your configuration, you must also to define a `starterNode`, which represents the initial node instance of your editor. You can define it using an xml structure. If you want an empty editor at the start, simply set `starterNode` to : 
```js
starterNode: "<doc><paragraph></paragraph></doc>"
```
```js
import { Component } from '@angular/core';
import {
  TraakEditorComponent,
  TraakConfiguration,
  Paragraph,
  TaskList,
  TaskListItem,
  BulletList,
  ListItem,
  Heading,
  OrderedList,
} from 'ngx-traak';
@Component({
  selector: 'app-root',
  imports: [TraakEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo';
  config: TraakConfiguration = {
    nodes: [
      Paragraph,
      Heading,
      TaskListItem,
      TaskList,
      ListItem,
      OrderedList,
      BulletList,
    ],
    starterNode:
      `
        <doc>
          <paragraph>
            Hello 
          </paragraph>
          <heading level="3">
            World
          </heading>
        </doc>
      `,
  };
}

```
and then, in your template: 
```html
<traak-editor [config]="config"></traak-editor>
```
# 🌟 Main Features 
## Builtin Nodes and Marks 
NgxTraak comes with a growing set of ready-to-use ProseMirror nodes and marks including:
- Paragraph, Heading with multiple levels
- List structures: BulletList, OrderedList, ListItem
- Task-based content: TaskList, TaskListItem
- Inline formatting marks like Bold, Italic, Underline, and Code (if added via marks array)

## Builtin plugins
NgxTraak makes it easy to enhance your editor experience using built-in Angular components. For example, you can integrate a toolbar or menu with just a few steps.
Example :
Import the MenuComponent in your component's metadata
```ts 
@Component({
  selector: 'app-root',
  imports: [TraakEditorComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
```
Insert the menu component inside the `traak-editor` tag. It will automatically connect to the editor instance
```html
<traak-editor [config]="config">
  <menu></menu>
</traak-editor>
```
The list of builtin plugins will keep on growing. Keep an eye at our issues page for updates.

## Customize with your own angular components
If you want deeper control over the editor's behavior or UI, you can create your own custom plugins by leveraging Angular components. NgxTraak provides the TraakPlugin abstract class, which allows your component to hook directly into the editor lifecycle.

Start by implementing your own Angular component and register it as a TraakPlugin:
```ts
@Component({
  selector: "your-plugin",
  templateUrl: "./your-plugin.component.html",
  styleUrls: ["./your-plugin.component.css"],
  imports: [NgIf, NgClass, PositionPlugin, FormsModule, ClickOutside],
  providers: [
    { provide: TraakPlugin, useExisting: forwardRef(() => YourPluginComponent) },
  ],
  standalone: true,
})
```

You can then insert your plugin into the editor as with the `menu` example.
```html
<traak-editor [config]="config">
  <your-plugin></your-plugin>
</traak-editor>
```

## Commands
Inside a TraakPlugin, you have direct access to the editor instance via `this.editor`. This gives you full control over document manipulation through the commands API.

The commands API uses a chainable pattern. When you call `this.editor.commands`, you begin building a chain of operations that only execute when `.commit()` is called.

Let’s say you want to toggle a bold mark on the current selection when a button is clicked.
```ts
toggleMark() {
  this.editor.commands.toggleMark("bold").commit();
}
```
All that's left is to bind the method to a button click event:
```html
<button (click)="toggleMark()">Toggle Bold</button>
```

# 🤝 Contributing
Contributions are welcome (also very much needed), read the `Contributing.md` if you wish to contribute.

# 📚 Documentation
Documentation is available online [here](https://ngxtraak.com/getting-started/installation).
