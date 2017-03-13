# ngx-dnd

🕶  Drag, Drop and Sorting Library for Angular2 and beyond!

*Note: This project is under heavy construction. As such, the API may change dramatically between major releases and documentation is lacking.*

## Features

- Drag and Drop
- Sorting
- Events (drag, drop, over, out)
- Nesting
- Touch support
- Templating

## Quick intro and examples

### Directives

`ngx-dnd` provides a base set of directives to enable drag-and-drop.  By default all children of a `ngxDroppable` element may be dragged and dropped.  Add the `ngxDraggable` to restrict drag-and-drop to the parent container.

```html
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable>Item 1</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3</div>
</div>
```

Give  multiple containers the `dropZone` same name to allow drag-and-drop between these containers.

```html
<div class="ngx-dnd-container" ngxDroppable="example">
  <div class="ngx-dnd-item" ngxDraggable>Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

`ngxDraggable` items can be restricted to specific containers:

```html
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example-target">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

### Components

`ngx-dnd` provides a set of components that encapsulates the directives mentioned and adds capability for data driven structures.

```html
<ngx-dnd-container
  [model]="orderableLists">
</ngx-dnd-container>
```

```js
orderableLists = [
  [
    "Item 1a",
    "Item 2a",
    "Item 3a"
  ],
  [
    "Item 1b",
    "Item 2b",
    "Item 3b"
  ]
]
```

Including nested containers:

```html
<ngx-dnd-container
  [model]="nestedLists">
</ngx-dnd-container>
```

```js
nestedLists = [
  {
    "label": "Item 1",
    "children": []
  },
  {
    "label": "Item 2",
    "children": [
      {
        "label": "Item 2a",
        "children": []
      },
      {
        "label": "Item 2b",
        "children": []
      },
      {
        "label": "Item 2c",
        "children": []
      }
    ]
  },
  {
    "label": "Item 3",
    "children": [
      {
        "label": "Item 3a",
        "children": []
      },
      {
        "label": "Item 3b",
        "children": []
      },
      {
        "label": "Item 3c",
        "children": []
      }
    ]
  }
]
```

See [https://swimlane.github.io/ngx-dnd/](https://swimlane.github.io/ngx-dnd/) for more lives examples.  Demo code is at [https://github.com/swimlane/ngx-dnd/tree/master/demo](https://github.com/swimlane/ngx-dnd/tree/master/demo).

## Install
To use ngx-dnd in your project install it via [npm](https://www.npmjs.com/package/@swimlane/ngx-dnd):

```
npm i @swimlane/ngx-dnd --save
```

## Credits
`ngx-dnd` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.
