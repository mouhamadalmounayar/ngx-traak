---
keyword: NodesAndMarksPage
---

The library defines a set of nodes, which you can decide to include in the `TraakConfiguration` object.
When you add a node, all its associated commands and keymaps will be added to the editor as well. How to dynamically add or remove nodes is described in the Plugins section.

### Paragraph
This is the most essential node in the editor. You can't do much without this one, and it represents a paragraph node which can include text.

### Heading
This node represents a heading. It can be used to create headings of different levels (h1, h2, h3, etc.). You can define
what level you want for the heading by passing it as an attribute on instantiation.
{{NgDocActions.demo("HeadingDemoComponent")}}
### Lists
The library supports ordered, unordered and task lists.
{{NgDocActions.demo("ListDemoComponent")}}

Below is a table summarizing the nodes and their corresponding XML format.

| node | xml format |
|:-----|:-----------|
| Paragraph | `<paragraph> paragraph </paragraph>` |
| Heading | `<heading level=3> Heading 3 </heading>` |
| BulletList | `<bullet_list><list_item><paragraph> list item </paragraph></list_item></bullet_list>`|
| OrderedList | `<ordered_list><list_item><paragraph> list item </paragraph></list_item></ordered_list>`|
| TaskList | `<task_list><task_list_item><paragraph> list item </paragraph></task_list_item></task_list>`|

The library also defines a set of marks, which you can include in the `marks` attribute of the `TraakConfiguration` object. The table below lists each mark name along with its corresponding input rule which is activated on import.

| mark | input rule | 
|:-----|:---------|
| Bold | **       |
| Code | `        | 
| Strikethrough | ~ |
| Italic | * |
