import { NgDocPage } from "@ng-doc/core";
import PluginsCategory from "../ng-doc.category";
import { MenuDemoComponent } from "../../demos/menu-demo/menu-demo.component";
const BuiltinsPage: NgDocPage = {
  title: `Builtins`,
  mdFile: "./index.md",
  category: PluginsCategory,
  demos: { MenuDemoComponent },
};

export default BuiltinsPage;
