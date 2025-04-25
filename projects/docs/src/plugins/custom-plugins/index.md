---
keyword: CustomPluginsPage
---

With NgxTraak, you have full control over the editor's overall feel. You can create your own plugins that integrate seamlessly with the editor.

A plugin is simply an angular component which extends the `TraakPlugin` abstract class.

## Creating a Plugin
Start by generating an angular component.
```bash
ng generate component my-plugin
```
In your new component, import and extend the TraakPlugin class:

```ts name="my-plugin.component.ts"
import { TraakPlugin } from '@ngx-traak/core';

export class MyPluginComponent extends TraakPlugin {
  constructor() {
    super();
  }
}
``` 
To make your plugin recognizable by the editor, provide the `TraakPlugin` token in your component metadata:

```ts name="my-plugin.component.ts"
@Component({
  selector: "my-plugin",
  templateUrl: "./my-plugin.component.html",
  styleUrls: ["./my-plugin.component.css"],
  imports: [NgIf, NgClass, PositionPlugin, FormsModule, ClickOutside],
  providers: [
    { provide: TraakPlugin, useExisting: forwardRef(() => MyPluginComponent) },
  ],
  standalone: true,
})
```

## Commands
Inside your plugin, you can access editor commands through the this.editor.commands API. For example, to add a new paragraph node when a button is clicked:
```html name="my-plugin.component.html"
<button (click)="addParagraph()">Add Paragraph</button>
```
Now, you can implement the `addParagraph` method in your component.
```ts name="my-plugin.component.ts"
addParagraph() {
  this.editor.commands.addNode(`<paragraph></paragraph>`).commit();
}
```
> **Note**
> When calling `.commands`, you are creating a transaction which chains different commands together. For the transaction to take effect, you need to commit it by calling `.commit()`.

## Positioning Directives
All that's left to do is to position your plugin correctly. You can use the `PositionPlugin` directive to position your plugin relatively to the current hovered editor node. 
In the case of the example above, you can position the button on the left of the the currently hovered node.
```ts 
<button (click)="addParagraph()" position-rel-node [placement]="'left'">Add Paragraph</button>
```
