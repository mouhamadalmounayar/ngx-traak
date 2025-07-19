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

The library also defines a set of marks with markdown support, which you can include in the `marks` attribute of the `TraakConfiguration` object.
