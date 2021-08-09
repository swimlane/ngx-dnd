# `ContainerComponent`

## Overview

`<ngx-dnd-container>` provides a container for draggable items.

## API

### Inputs

| Prop                                                                     | Description |
| ------------------------------------------------------------------------ | ----------- |
| `model: any`                                                             |
| `copy: boolean = false`                                                  |
| `removeOnSpill: boolean = false`                                         |
| `droppableItemClass: string | ((o: any) => any)`                         |
| `dropZone: any`                                                          |
| `dropZones: any`                                                         |
| `moves: (model: any, source: any, handle: any, sibling: any) => boolean` |
| `template: TemplateRef<any>`                                             |
| `droppable: any`                                                         |
| `direction: 'vertical' | 'horizontal' | 'mixed' = 'vertical'`            |

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
<ngx-dnd-container [model]="orderableList"> </ngx-dnd-container>
<code><pre>orderableList = {{orderableList | json}}</pre></code>
```

### Nested

```html { playground context='{ "orderableLists": [["Item 1a", "Item 2a", "Item 3a"], ["Item 1b", "Item 2b", "Item 3b"]] }' }
<ngx-dnd-container [model]="orderableLists"> </ngx-dnd-container>
<code><pre>orderableLists = {{orderableLists | json}}</pre></code>
```

### Nested with Containers

```html { playground context='{ "nestedLists": [ { "label": "Item 1", "children": [] }, { "label": "Item 2", "children": [ { "label": "Item 2a", "children": [] }, { "label": "Item 2b", "children": [] }, { "label": "Item 2c", "children": [] } ] }, { "label": "Item 3", "children": [ { "label": "Item 3a", "children": [] }, { "label": "Item 3b", "children": [] }, { "label": "Item 3c", "children": [] } ] }] }' }
<ngx-dnd-container [model]="nestedLists"> </ngx-dnd-container>
<code><pre>nestedLists = {{nestedLists | json}}</pre></code>
```

### Grid

```html { playground context='{ "boxList": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100] }' }
<div class="ngx-dnd-container clearfix" ngxDroppable [model]="boxList" [direction]="'mixed'">
  <div class="ngx-dnd-box" ngxDraggable [model]="box" *ngFor="let box of boxList">
    {{box}}
  </div>
</div>
```
