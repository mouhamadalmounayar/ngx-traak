import { TraakNodeInterface } from "./traak-node-interface";

export const TaskList: TraakNodeInterface = {
  type: "task_list",
  spec: {
    content: "task_checkbox paragraph*",
    group: "block",
    toDOM() {
      return ["div", { class: "task-list" }, 0];
    },
  },
};
