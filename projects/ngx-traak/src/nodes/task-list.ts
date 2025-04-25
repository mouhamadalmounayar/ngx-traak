import { TraakNodeInterface } from "./traak-node-interface";

/**
 * A task list node.
 */
export const TaskList: TraakNodeInterface = {
  type: "task_list",
  spec: {
    content: "task_list_item*",
    group: "block",
    toDOM() {
      return ["div", { class: "ngx-traak-node__task-list" }, 0];
    },
    parseDOM: [{ tag: "div.task-list" }],
  },
};
