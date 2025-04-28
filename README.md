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
   
# Contributing
Contributions are welcome (also very much needed), read the `Contributing.md` if you wish to contribute.

# Documentation
Documentation is available online [here](https://ngxtraak.com/getting-started/installation). 
