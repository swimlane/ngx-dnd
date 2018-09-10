# Table of contents

* [ItemComponent][ClassDeclaration-4]
    * Constructor
        * [constructor(container, draggableDirective)][Constructor-2]
    * Methods
        * [ngOnInit()][MethodDeclaration-15]
    * Properties
        * [model][PropertyDeclaration-22]
        * [dropZone][GetAccessor-5]
        * [dropZone][SetAccessor-2]
        * [dropZones][GetAccessor-6]
        * [dropZones][SetAccessor-3]
        * [droppableItemClass][GetAccessor-7]
        * [droppableItemClass][SetAccessor-4]
        * [removeOnSpill][GetAccessor-8]
        * [removeOnSpill][SetAccessor-5]
        * [copy][GetAccessor-9]
        * [copy][SetAccessor-6]
        * [_copy][PropertyDeclaration-23]
        * [_dropZone][PropertyDeclaration-24]
        * [_dropZones][PropertyDeclaration-25]
        * [_droppableItemClass][PropertyDeclaration-26]
        * [_removeOnSpill][PropertyDeclaration-27]
        * [data][PropertyDeclaration-28]
        * [hasHandle][GetAccessor-10]
        * [moveDisabled][GetAccessor-11]
        * [classString][GetAccessor-12]
        * [type][GetAccessor-13]

# ItemComponent

Component that allows nested ngxDroppable and ngxDraggables
Should only be use inside a ngx-dnd-container
Outside a ngx-dnd-container use ngxDroppable

```typescript
class ItemComponent implements OnInit
```
## Constructor

### constructor(container, draggableDirective)

```typescript
public constructor(container: ContainerComponent, draggableDirective: DraggableDirective);
```

**Parameters**

| Name               | Type                                     |
| ------------------ | ---------------------------------------- |
| container          | [ContainerComponent][ClassDeclaration-5] |
| draggableDirective | [DraggableDirective][ClassDeclaration-1] |

## Methods

### ngOnInit()

```typescript
public ngOnInit(): void;
```

**Return type**

void

## Properties

### model

```typescript
public model: any;
```

**Type**

any

----------

### dropZone

```typescript
public get dropZone: any;
```

**Type**

any

----------

### dropZone

```typescript
public set dropZone: any;
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

### droppableItemClass

```typescript
public get droppableItemClass: any;
```

**Type**

any

----------

### droppableItemClass

```typescript
public set droppableItemClass: any;
```

**Type**

any

----------

### removeOnSpill

```typescript
public get removeOnSpill: boolean;
```

**Type**

boolean

----------

### removeOnSpill

```typescript
public set removeOnSpill: boolean;
```

**Type**

boolean

----------

### copy

```typescript
public get copy: boolean;
```

**Type**

boolean

----------

### copy

```typescript
public set copy: boolean;
```

**Type**

boolean

----------

### _copy

```typescript
public _copy: boolean;
```

**Type**

boolean

----------

### _dropZone

```typescript
public _dropZone: any;
```

**Type**

any

----------

### _dropZones

```typescript
public _dropZones: any;
```

**Type**

any

----------

### _droppableItemClass

```typescript
public _droppableItemClass: any;
```

**Type**

any

----------

### _removeOnSpill

```typescript
public _removeOnSpill: boolean;
```

**Type**

boolean

----------

### data

```typescript
public data: any;
```

**Type**

any

----------

### hasHandle

```typescript
public get hasHandle: boolean;
```

**Type**

boolean

----------

### moveDisabled

```typescript
public get moveDisabled: boolean;
```

**Type**

boolean

----------

### classString

```typescript
public get classString: string;
```

**Type**

string

----------

### type

```typescript
public get type: "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array";
```

**Type**

"string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array"

[ClassDeclaration-4]: itemcomponent.md#itemcomponent
[Constructor-2]: itemcomponent.md#constructorcontainer-draggabledirective
[ClassDeclaration-5]: containercomponent.md#containercomponent
[ClassDeclaration-1]: draggabledirective.md#draggabledirective
[MethodDeclaration-15]: itemcomponent.md#ngoninit
[PropertyDeclaration-22]: itemcomponent.md#model
[GetAccessor-5]: itemcomponent.md#dropzone
[SetAccessor-2]: itemcomponent.md#dropzone
[GetAccessor-6]: itemcomponent.md#dropzones
[SetAccessor-3]: itemcomponent.md#dropzones
[GetAccessor-7]: itemcomponent.md#droppableitemclass
[SetAccessor-4]: itemcomponent.md#droppableitemclass
[GetAccessor-8]: itemcomponent.md#removeonspill
[SetAccessor-5]: itemcomponent.md#removeonspill
[GetAccessor-9]: itemcomponent.md#copy
[SetAccessor-6]: itemcomponent.md#copy
[PropertyDeclaration-23]: itemcomponent.md#_copy
[PropertyDeclaration-24]: itemcomponent.md#_dropzone
[PropertyDeclaration-25]: itemcomponent.md#_dropzones
[PropertyDeclaration-26]: itemcomponent.md#_droppableitemclass
[PropertyDeclaration-27]: itemcomponent.md#_removeonspill
[PropertyDeclaration-28]: itemcomponent.md#data
[GetAccessor-10]: itemcomponent.md#hashandle
[GetAccessor-11]: itemcomponent.md#movedisabled
[GetAccessor-12]: itemcomponent.md#classstring
[GetAccessor-13]: itemcomponent.md#type