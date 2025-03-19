<img src="https://github.com/user-attachments/assets/13a57adb-251e-4066-b701-f1b66d673566" width="500">

Integrate and **customize** powerful text editors in your Angular applications with ngx-traak.
The project is a wrapper around prosemirror and is still in **early developement phases**.

![test workflow](https://github.com/mouhamadalmounayar/ngx-traak/actions/workflows/test.yaml/badge.svg)
![publish workflow](https://github.com/mouhamadalmounayar/ngx-traak/actions/workflows/publish.yaml/badge.svg)
# Getting Started
Install ngx-traak via npm by running the following command in your project directory:
   ```bash
   npm i ngx-traak
   ```
Setting up the editor
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
      "
        <doc>
          <paragraph>
            Hello 
          </paragraph>
          <heading level="3">
            World
          </heading>
        </doc>
      ",
  };
}

```
and then, in your template: 
```html
  <traak-editor [config]="config"></traak-editor>
```
   
# Build from source
To get the project up and running on your local machine :
1. Clone the repository
```bash
git clone git@github.com:mouhamadalmounayar/ngx-traak.git
```

2. Install peer dependencies
```bash
npm install --legacy-peer-deps
```

3. Build the project
```bash
npm run build
```

4. Run the tests
```bash
npm run test
```

# Documentation
Documentation is available online [here](https://mouhamad-al-mounayar.gitbook.io/traak/) . 
