import { Plugin } from "prosemirror-state";
const NON_HOVERABLE_NODES = [
  "task_list",
  "list_item",
  "bullet_list",
  "ordered_list",
];
export const domEventPlugin: Plugin = new Plugin({
  props: {
    handleDOMEvents: {
      mouseover(view, event) {
        const target = event.target as HTMLElement;
        const posInDom = view.posAtDOM(target, 0);
        const $posInDom = view.state.doc.resolve(posInDom);
        if ($posInDom.pos === 0) {
          return;
        }
        if (NON_HOVERABLE_NODES.includes($posInDom.parent.type.name)) {
          return;
        }
        if (NON_HOVERABLE_NODES.includes($posInDom.node(1).type.name)) {
          return;
        }
        const start = $posInDom.start();
        const end = $posInDom.end();
        const startCoords = view.coordsAtPos(start);
        const endCoords = view.coordsAtPos(end);
        target.dispatchEvent(
          new CustomEvent("nodeHover", {
            bubbles: true,
            detail: {
              nodeRect: {
                left: startCoords.left,
                top: startCoords.top,
                right: endCoords.right,
                bottom: endCoords.bottom,
                width: endCoords.right - startCoords.left,
                height: endCoords.bottom - startCoords.top,
              },
              target: target,
              start: start,
            },
          }),
        );
      },
      mouseout(view, event) {
        const target = event.target as HTMLElement;
        target.dispatchEvent(
          new CustomEvent("nodeOut", {
            bubbles: true,
            detail: {
              event: "out",
            },
          }),
        );
      },
      click(view, event) {
        const target = event.target as HTMLElement;
        const posInDom = view.posAtDOM(target, 0);
        const $posInDom = view.state.doc.resolve(posInDom);
        const node = $posInDom.parent;
        target.dispatchEvent(
          new CustomEvent("nodeClick", {
            bubbles: true,
            detail: { nodeType: node.type.name, domElement: target },
          }),
        );
      },
    },
  },
});
