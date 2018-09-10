# `ContainerComponent`

## Overview

`<ngx-dnd-container>` provides a container for draggable items.

## API

### Inputs

| Prop                               | Description |
| ---------------------------------- | ----------- |
| `model: any`                       |
| `copy: boolean = false`            |
| `removeOnSpill: boolean = false`   |
| `droppableItemClass: string | ((o: any) => any)` |
| `dropZone: any`                    |
| `dropZones: any`                   |
| `moves: (model: any, source: any, handle: any, sibling: any) => boolean` |
| `template: TemplateRef<any>`       |
| `droppable: any`                   |

### Outputs

| Name                        | Description |
| --------------------------- | ----------- |
| `drop: EventEmitter<any>`   |
| `drag: EventEmitter<any>`   |
| `over: EventEmitter<any>`   |
| `out: EventEmitter<any>`    |
| `remove: EventEmitter<any>` |
| `cancel: EventEmitter<any>` |


## Examples

### Basic

```html { run context='{ "orderableList": ["Item 1", "Item 2", "Item 3"] }' }
<ngx-dnd-container
  [model]="orderableList">
</ngx-dnd-container>
<code><pre>orderableList = {{orderableList | json}}</pre></code>
```

### Nested

```html { playground context='{ "orderableLists": [["Item 1a", "Item 2a", "Item 3a"], ["Item 1b", "Item 2b", "Item 3b"]] }' }
<ngx-dnd-container
  [model]="orderableLists">
</ngx-dnd-container>
<code><pre>orderableLists = {{orderableLists | json}}</pre></code>
```

### Nested with Containers

```html { playground context='{ "nestedLists": [ { "label": "Item 1", "children": [] }, { "label": "Item 2", "children": [ { "label": "Item 2a", "children": [] }, { "label": "Item 2b", "children": [] }, { "label": "Item 2c", "children": [] } ] }, { "label": "Item 3", "children": [ { "label": "Item 3a", "children": [] }, { "label": "Item 3b", "children": [] }, { "label": "Item 3c", "children": [] } ] }] }' }
<ngx-dnd-container
  [model]="nestedLists">
</ngx-dnd-container>
<code><pre>nestedLists = {{nestedLists | json}}</pre></code>
````
