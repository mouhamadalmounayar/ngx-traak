import { TraakNodeInterface } from "./traak-node-interface";

export const TaskCheckbox: TraakNodeInterface = {
  type: "task_checkbox",
  spec: {
    attrs: { checked: { default: "false" } },
    selectable: false,
    group: "block",
    toDOM(node) {
      if (node.attrs["checked"] === "true") {
        return [
          "input",
          {
            type: "checkbox",
            class: "task-checkbox",
            checked: "",
          },
        ];
      }
      return [
        "div",
        {
          contenteditable: "false",
        },
        [
          "input",
          {
            type: "checkbox",
            class: "task-checkbox",
          },
        ],
      ];
    },
    parseDOM: [
      {
        tag: 'input[type="checkbox"]',
        getAttrs(dom) {
          return {
            checked: dom.getAttribute("checked") === "true",
          };
        },
      },
    ],
  },
};
