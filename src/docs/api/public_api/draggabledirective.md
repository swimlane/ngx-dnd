# Table of contents

* [DraggableDirective][ClassDeclaration-1]
    * Constructor
        * [constructor()][Constructor-0]
    * Methods
        * [onMove(e)][MethodDeclaration-0]
        * [onDown()][MethodDeclaration-1]
        * [onUp()][MethodDeclaration-2]
        * [ngOnInit()][MethodDeclaration-3]
        * [update()][MethodDeclaration-4]
        * [ngOnDestroy()][MethodDeclaration-5]
        * [updateElements()][MethodDeclaration-6]
        * [canMove(source, handle, sibling)][MethodDeclaration-7]
        * [moves(source, handle, sibling)][MethodDeclaration-8]
        * [ngDoCheck()][MethodDeclaration-9]
    * Properties
        * [ngxDraggable][PropertyDeclaration-0]
        * [model][PropertyDeclaration-1]
        * [dropZones][GetAccessor-0]
        * [dropZones][SetAccessor-0]
        * [_moves][PropertyDeclaration-2]
        * [handles][PropertyDeclaration-3]
        * [hasHandle][GetAccessor-1]
        * [drag][PropertyDeclaration-4]
        * [dragDelay][PropertyDeclaration-5]
        * [dragDelayed][PropertyDeclaration-6]
        * [touchTimeout][PropertyDeclaration-7]
        * [element][GetAccessor-2]
        * [_dropZones][PropertyDeclaration-8]
        * [_parentDropzones][PropertyDeclaration-9]

# DraggableDirective

Adds properties and events to draggable elements

```typescript
class DraggableDirective implements OnInit, OnDestroy
```
## Constructor

### constructor()

```typescript
public constructor();
```

## Methods

### onMove(e)

```typescript
public onMove(e: Event): void;
```

**Parameters**

| Name | Type  |
| ---- | ----- |
| e    | Event |

**Return type**

void

----------

### onDown()

```typescript
public onDown(): void;
```

**Return type**

void

----------

### onUp()

```typescript
public onUp(): void;
```

**Return type**

void

----------

### ngOnInit()

```typescript
public ngOnInit(): void;
```

**Return type**

void

----------

### update()

```typescript
public update(): void;
```

**Return type**

void

----------

### ngOnDestroy()

```typescript
public ngOnDestroy(): void;
```

**Return type**

void

----------

### updateElements()

```typescript
public updateElements(): void;
```

**Return type**

void

----------

### canMove(source, handle, sibling)

```typescript
public canMove(source?: any, handle?: any, sibling?: any): boolean;
```

**Parameters**

| Name    | Type |
| ------- | ---- |
| source  | any  |
| handle  | any  |
| sibling | any  |

**Return type**

boolean

----------

### moves(source, handle, sibling)

```typescript
public moves(source: any, handle: any, sibling: any): boolean;
```

**Parameters**

| Name    | Type |
| ------- | ---- |
| source  | any  |
| handle  | any  |
| sibling | any  |

**Return type**

boolean

----------

### ngDoCheck()

```typescript
public ngDoCheck(): void;
```

**Return type**

void

## Properties

### ngxDraggable

```typescript
public ngxDraggable: string[];
```

**Type**

string[]

----------

### model

```typescript
public model: any;
```

**Type**

any

----------

### dropZones

```typescript
public get dropZones: any;
```

**Type**

any

----------

### dropZones

```typescript
public set dropZones: any;
```

**Type**

any

----------

### _moves

```typescript
public _moves: boolean | ((args: any[]) => any);
```

**Type**

boolean | ((args: any[]) => any)

----------

### handles

```typescript
public handles: any[];
```

**Type**

any[]

----------

### hasHandle

```typescript
public get hasHandle: boolean;
```

**Type**

boolean

----------

### drag

```typescript
public drag: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### dragDelay

```typescript
public dragDelay: number;
```

**Type**

number

----------

### dragDelayed

```typescript
public dragDelayed: boolean;
```

**Type**

boolean

----------

### touchTimeout

```typescript
public touchTimeout: any;
```

**Type**

any

----------

### element

```typescript
public get element: any;
```

**Type**

any

----------

### _dropZones

```typescript
public _dropZones: string[];
```

**Type**

string[]

----------

### _parentDropzones

```typescript
public _parentDropzones: string[];
```

**Type**

string[]

[ClassDeclaration-1]: draggabledirective.md#draggabledirective
[Constructor-0]: draggabledirective.md#constructor
[MethodDeclaration-0]: draggabledirective.md#onmovee
[MethodDeclaration-1]: draggabledirective.md#ondown
[MethodDeclaration-2]: draggabledirective.md#onup
[MethodDeclaration-3]: draggabledirective.md#ngoninit
[MethodDeclaration-4]: draggabledirective.md#update
[MethodDeclaration-5]: draggabledirective.md#ngondestroy
[MethodDeclaration-6]: draggabledirective.md#updateelements
[MethodDeclaration-7]: draggabledirective.md#canmovesource-handle-sibling
[MethodDeclaration-8]: draggabledirective.md#movessource-handle-sibling
[MethodDeclaration-9]: draggabledirective.md#ngdocheck
[PropertyDeclaration-0]: draggabledirective.md#ngxdraggable
[PropertyDeclaration-1]: draggabledirective.md#model
[GetAccessor-0]: draggabledirective.md#dropzones
[SetAccessor-0]: draggabledirective.md#dropzones
[PropertyDeclaration-2]: draggabledirective.md#_moves
[PropertyDeclaration-3]: draggabledirective.md#handles
[GetAccessor-1]: draggabledirective.md#hashandle
[PropertyDeclaration-4]: draggabledirective.md#drag
[PropertyDeclaration-5]: draggabledirective.md#dragdelay
[PropertyDeclaration-6]: draggabledirective.md#dragdelayed
[PropertyDeclaration-7]: draggabledirective.md#touchtimeout
[GetAccessor-2]: draggabledirective.md#element
[PropertyDeclaration-8]: draggabledirective.md#_dropzones
[PropertyDeclaration-9]: draggabledirective.md#_parentdropzones