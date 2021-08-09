# Drag-and-drop

## No Model

```html { playground data-cy="simple-drag-and-drop-no-model" }
<div class="ngx-dnd-container" ngxDroppable="example-two">
  <div class="ngx-dnd-item" ngxDraggable>Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example-two">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

## Restricted

```html { playground data-cy="restricted-drag-and-Drop-no-model" }
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable="['restricted-target']">Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable="['restricted-target']">Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable="['restricted-target']">Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="restricted-target">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

## Copy and remove on spill

```html { playground context='{ "sourceItems": ["Item 1a", "Item 2a", "Item 3a"], "targetItemsA": [], "targetItemsB": [] }' }
<ngx-dnd-container [model]="sourceItems" [copy]="true" [dropZones]="['multiple-target-a', 'multiple-target-b']">
</ngx-dnd-container>
<ngx-dnd-container [model]="targetItemsA" dropZone="multiple-target-a" [removeOnSpill]="true"> </ngx-dnd-container>
<ngx-dnd-container [model]="targetItemsB" dropZone="multiple-target-b" [removeOnSpill]="true"> </ngx-dnd-container>
```
