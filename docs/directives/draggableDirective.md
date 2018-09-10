# `DraggableDirective`

`[ngxDraggable]` adds properties and events to draggable elements

## Inputs

| Prop                               | Description |
| ---------------------------------- | ----------- |
| `dropZones: string[]`              |
| `model: any`                       |
| `moves: boolean = true`            |
| `ngxDraggable: strings[]`          |

## Outputs

| Name                        | Description |
| --------------------------- | ----------- |
| `drag: EventEmitter<any>`   |

## Examples

### No Model

```html { playground }
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

### Restricted

```html { playground }
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