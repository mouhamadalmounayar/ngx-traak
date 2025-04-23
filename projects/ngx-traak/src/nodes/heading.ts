import { TraakNodeInterface } from "./traak-node-interface";

export const Heading: TraakNodeInterface = {
  type: "heading",
  spec: {
    group: "block",
    content: "text*",
    attrs: { level: { default: 1 } },
    parseDOM: [
      {
        tag: "h1.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 1 };
        },
      },
      {
        tag: "h2.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 2 };
        },
      },
      {
        tag: "h3.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 3 };
        },
      },
      {
        tag: "h4.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 4 };
        },
      },
      {
        tag: "h5.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 5 };
        },
      },
      {
        tag: "h6.ngx-traak-node__heading",
        getAttrs(dom: HTMLElement) {
          return { level: 6 };
        },
      },
    ],
    toDOM(node) {
      return [
        "h" + node.attrs["level"],
        { class: "ngx-traak-node__heading" },
        0,
      ];
    },
  },
};
