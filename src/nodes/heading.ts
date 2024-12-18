import { TraakNodeInterface } from "./traak-node-interface";

export const Heading: TraakNodeInterface = {
  type: "heading",
  spec: {
    group: "block",
    content: "text*",
    attrs: { level: { default: 1 } },
    parseDOM: [
      {
        tag: "h1",
        getAttrs(dom: HTMLElement) {
          return { level: 1 };
        },
      },
      {
        tag: "h2",
        getAttrs(dom: HTMLElement) {
          return { level: 2 };
        },
      },
      {
        tag: "h3",
        getAttrs(dom: HTMLElement) {
          return { level: 3 };
        },
      },
      {
        tag: "h4",
        getAttrs(dom: HTMLElement) {
          return { level: 4 };
        },
      },
      {
        tag: "h5",
        getAttrs(dom: HTMLElement) {
          return { level: 5 };
        },
      },
      {
        tag: "h6",
        getAttrs(dom: HTMLElement) {
          return { level: 6 };
        },
      },
    ],
    toDOM(node) {
      return ["h" + node.attrs["level"], 0];
    },
  },
};
