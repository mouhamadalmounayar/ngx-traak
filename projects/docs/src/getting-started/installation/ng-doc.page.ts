import { NgDocPage } from "@ng-doc/core";
import GettingStartedCategory from "../ng-doc.category";
import { EditorDemoComponent } from "../../demos/editor-demo/editor-demo.component";
const InstallationPage: NgDocPage = {
  title: `Installation and Setup`,
  mdFile: "./index.md",
  demos: { EditorDemoComponent },
  category: GettingStartedCategory,
};

export default InstallationPage;
