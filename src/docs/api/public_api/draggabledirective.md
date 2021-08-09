# Table of contents

- [DraggableDirective][classdeclaration-1]
  - Constructor
    - [constructor()][constructor-0]
  - Methods
    - [onMove(e)][methoddeclaration-0]
    - [onDown()][methoddeclaration-1]
    - [onUp()][methoddeclaration-2]
    - [ngOnInit()][methoddeclaration-3]
    - [update()][methoddeclaration-4]
    - [ngOnDestroy()][methoddeclaration-5]
    - [updateElements()][methoddeclaration-6]
    - [canMove(source, handle, sibling)][methoddeclaration-7]
    - [moves(source, handle, sibling)][methoddeclaration-8]
    - [ngDoCheck()][methoddeclaration-9]
  - Properties
    - [ngxDraggable][propertydeclaration-0]
    - [model][propertydeclaration-1]
    - [dropZones][getaccessor-0]
    - [dropZones][setaccessor-0]
    - [\_moves][propertydeclaration-2]
    - [handles][propertydeclaration-3]
    - [hasHandle][getaccessor-1]
    - [drag][propertydeclaration-4]
    - [dragDelay][propertydeclaration-5]
    - [dragDelayed][propertydeclaration-6]
    - [touchTimeout][propertydeclaration-7]
    - [element][getaccessor-2]
    - [\_dropZones][propertydeclaration-8]
    - [\_parentDropzones][propertydeclaration-9]

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

---

### onDown()

```typescript
public onDown(): void;
```

**Return type**

void

---

### onUp()

```typescript
public onUp(): void;
```

**Return type**

void

---

### ngOnInit()

```typescript
public ngOnInit(): void;
```

**Return type**

void

---

### update()

```typescript
public update(): void;
```

**Return type**

void

---

### ngOnDestroy()

```typescript
public ngOnDestroy(): void;
```

**Return type**

void

---

### updateElements()

```typescript
public updateElements(): void;
```

**Return type**

void

---

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

---

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

---

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

---

### model

```typescript
public model: any;
```

**Type**

any

---

### dropZones

```typescript
public get dropZones: any;
```

**Type**

any

---

### dropZones

```typescript
public set dropZones: any;
```

**Type**

any

---

### \_moves

```typescript
public _moves: boolean | ((args: any[]) => any);
```

**Type**

boolean | ((args: any[]) => any)

---

### handles

```typescript
public handles: any[];
```

**Type**

any[]

---

### hasHandle

```typescript
public get hasHandle: boolean;
```

**Type**

boolean

---

### drag

```typescript
public drag: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### dragDelay

```typescript
public dragDelay: number;
```

**Type**

number

---

### dragDelayed

```typescript
public dragDelayed: boolean;
```

**Type**

boolean

---

### touchTimeout

```typescript
public touchTimeout: any;
```

**Type**

any

---

### element

```typescript
public get element: any;
```

**Type**

any

---

### \_dropZones

```typescript
public _dropZones: string[];
```

**Type**

string[]

---

### \_parentDropzones

```typescript
public _parentDropzones: string[];
```

**Type**

string[]

[classdeclaration-1]: draggabledirective.md#draggabledirective
[constructor-0]: draggabledirective.md#constructor
[methoddeclaration-0]: draggabledirective.md#onmovee
[methoddeclaration-1]: draggabledirective.md#ondown
[methoddeclaration-2]: draggabledirective.md#onup
[methoddeclaration-3]: draggabledirective.md#ngoninit
[methoddeclaration-4]: draggabledirective.md#update
[methoddeclaration-5]: draggabledirective.md#ngondestroy
[methoddeclaration-6]: draggabledirective.md#updateelements
[methoddeclaration-7]: draggabledirective.md#canmovesource-handle-sibling
[methoddeclaration-8]: draggabledirective.md#movessource-handle-sibling
[methoddeclaration-9]: draggabledirective.md#ngdocheck
[propertydeclaration-0]: draggabledirective.md#ngxdraggable
[propertydeclaration-1]: draggabledirective.md#model
[getaccessor-0]: draggabledirective.md#dropzones
[setaccessor-0]: draggabledirective.md#dropzones
[propertydeclaration-2]: draggabledirective.md#_moves
[propertydeclaration-3]: draggabledirective.md#handles
[getaccessor-1]: draggabledirective.md#hashandle
[propertydeclaration-4]: draggabledirective.md#drag
[propertydeclaration-5]: draggabledirective.md#dragdelay
[propertydeclaration-6]: draggabledirective.md#dragdelayed
[propertydeclaration-7]: draggabledirective.md#touchtimeout
[getaccessor-2]: draggabledirective.md#element
[propertydeclaration-8]: draggabledirective.md#_dropzones
[propertydeclaration-9]: draggabledirective.md#_parentdropzones
