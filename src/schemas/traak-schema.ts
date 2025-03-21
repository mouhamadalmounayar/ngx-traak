import { MarkSpec, NodeSpec, Schema } from "prosemirror-model";

export const baseSchema = new Schema({
  nodes: {
    text: {},
    default: {
      group: "block",
    },
    doc: {
      content: "block*",
    },
  },
  marks: {
    bold: {
      toDOM() {
        return ["strong", 0];
      },
      parseDOM: [{ tag: "strong" }],
    },
    italic: {
      toDOM() {
        return ["i", 0];
      },
      parseDOM: [{ tag: "i" }],
    },
    strikethrough: {
      toDOM() {
        return ["s", 0];
      },
      parseDOM: [{ tag: "s" }],
    },
    code: {
      toDOM() {
        return ["code", 0];
      },
      parseDOM: [{ tag: "code" }],
    },
    link: {
      attrs: {
        href: {},
      },
      inclusive: false,
      toDOM(node) {
        const { href } = node.attrs;
        return ["a", { href }, 0];
      },
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs(dom) {
            return { href: dom.getAttribute("href") };
          },
        },
      ],
    },
  },
});

export const appendNodesToSchema = (
  schema: Schema,
  type: string,
  node: NodeSpec,
) => {
  const nodes = schema.spec.nodes.addToStart(type, node);
  return new Schema({ nodes: nodes });
};

export const appendMarksToSchema = (
  schema: Schema,
  type: string,
  mark: MarkSpec,
) => {
  const marks = schema.spec.marks.addToStart(type, mark);
  return new Schema({ nodes: schema.spec.nodes, marks: marks });
};
