import { NgDocPage } from "@ng-doc/core";
import EditorCategory from "../ng-doc.category";
import {ListDemoComponent} from '../../demos/list-demo/list-demo.component';
import {HeadingDemoComponent} from '../../demos/heading-demo/heading-demo.component';


const NodesAndMarksPage: NgDocPage = {
  title: `Nodes and Marks`,
  mdFile: "./index.md",
  demos: {ListDemoComponent, HeadingDemoComponent},
  category: EditorCategory,
};

export default NodesAndMarksPage;
