import { NgDocApi } from "@ng-doc/core";
import PluginsCategory from "./plugins/ng-doc.category";

const Api: NgDocApi = {
  title: "API References",
  order: 4,
  scopes: [
    {
      name: "ngx-traak",
      route: "ngx-traak",
      include: [
        "projects/ngx-traak/src/utils/chain.ts",
        "projects/ngx-traak/src/nodes/index.ts",
        "projects/ngx-traak/src/marks/index.ts",
        "projects/ngx-traak/src/directives/index.ts",
      ],
    },
  ],
};

export default Api;
