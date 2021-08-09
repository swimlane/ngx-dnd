# Sortables

## No Model

```html { playground data-cy="sortable-no-model" }
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable>Item 1</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3</div>
</div>
```

## Drag Handle

```html { playground data-cy="simple-sortable-with-drag-handle" }
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable>
    <i class="fa fa-ellipsis-v" aria-hidden="true" ngxDragHandle></i>
    Item 1
  </div>
  <div class="ngx-dnd-item" ngxDraggable>
    <i class="fa fa-ellipsis-v" aria-hidden="true" ngxDragHandle></i>
    Item 2
  </div>
  <div class="ngx-dnd-item" ngxDraggable>
    <i class="fa fa-ellipsis-v" aria-hidden="true" ngxDragHandle></i>
    Item 3
  </div>
</div>
```

## From Array model

```html { run context='{ "orderableList": ["Item 1", "Item 2", "Item 3"] }'  }
<ngx-dnd-container data-cy="simple-sortable-from-array-model" [model]="orderableList"> </ngx-dnd-container>

<pre data-cy="simple-sortable-from-array-model-json"><code>orderableList = {{orderableList | json}}
  </code></pre>
```

[[spoiler | Directives]]
| `html | <div class="ngx-dnd-container" | ngxDroppable [model]="orderableList"> | <div class="ngx-dnd-item" | ngxDraggable | *ngFor="let item of orderableList" | [model]="item"> | {{item}} | </div> | </div> |`

[[spoiler | Components]]
| `html | <ngx-dnd-container | [model]="orderableList"> | </ngx-dnd-container> |`

## Nested

```html { playground context='{ "orderableLists": [["Item 1a", "Item 2a", "Item 3a"], ["Item 1b", "Item 2b", "Item 3b"]] }' }
<ngx-dnd-container [model]="orderableLists"> </ngx-dnd-container>
```

## Nested with Containers

```html { playground context='{ "nestedLists": [ { "label": "Item 1", "children": [] }, { "label": "Item 2", "children": [ { "label": "Item 2a", "children": [] }, { "label": "Item 2b", "children": [] }, { "label": "Item 2c", "children": [] } ] }, { "label": "Item 3", "children": [ { "label": "Item 3a", "children": [] }, { "label": "Item 3b", "children": [] }, { "label": "Item 3c", "children": [] } ] }] }' }
<ngx-dnd-container [model]="nestedLists"> </ngx-dnd-container>
```
