import { TraakNodeInterface } from "./traak-node-interface";

export const TaskListItem: TraakNodeInterface = {
  type: "task_list_item",
  spec: {
    content: "paragraph*",
    group: "block",
    toDOM(node) {
      return [
        "div",
        { class: "task-list-item" },
        [
          "input",
          {
            type: "checkbox",
            class: "checkbox",
            checked: node.attrs["checked"] ? "checked" : null,
          },
        ],
        ["div", 0],
      ];
    },
    parseDOM: [
      {
        tag: "div.task-list-item",
        getAttrs(dom) {
          return {
            checked:
              dom
                .querySelector("input[type=checkbox]")
                ?.getAttribute("checked") === "true",
          };
        },
      },
    ],
  },
};
