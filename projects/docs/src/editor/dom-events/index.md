---
keyword: DomEventsPage
---

In order to listen to DOM events, we provide Event Services which you can inject into your components.
Each event service provides an `eventSubject` which you can subscribe to, and which emits a `details` object containing information about the event. The properties of the `details` object depend on the service in question.

### Hover Service
The hover service provides information about the node being hovered over. 
```ts 
constructor(private hoverService: HoverService) {
  this.hoverService.eventSubject.subscribe(details: HoverEventDetails => {
    console.log(details);
    // Do something with the details
  });
}
```
The `HoverEventDetails` definition is as follows:

```ts

type HoverEventDetails = {
  nodeRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
  start: number;
  end: number;
};
```

## Click Service
The click service provides information about the node being clicked on. 
```ts 
constructor(private clickService: ClickService) {
  this.clickService.eventSubject.subscribe(details: ClickEventDetails => {
    console.log(details);
    // Do something with the details
  });
}
```
The `ClickEventDetails` definition is as follows:

```ts
type ClickEventDetails = {
  type: string;
  domElement: HTMLElement;
};
```

## Out Service
The out service provides information about the node being hovered out of. 
```ts 
constructor(private outService: OutService) {
  this.outService.eventSubject.subscribe(details: OutEventDetails => {
    console.log(details);
    // Do something with the details
  });
}
```
The `OutEventDetails` definition is as follows:

```ts
type OutEventDetails = {
  event: string;
};
```
