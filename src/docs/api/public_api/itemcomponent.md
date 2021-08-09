# Table of contents

- [ItemComponent][classdeclaration-4]
  - Constructor
    - [constructor(container, draggableDirective)][constructor-2]
  - Methods
    - [ngOnInit()][methoddeclaration-15]
  - Properties
    - [model][propertydeclaration-22]
    - [dropZone][getaccessor-5]
    - [dropZone][setaccessor-2]
    - [dropZones][getaccessor-6]
    - [dropZones][setaccessor-3]
    - [droppableItemClass][getaccessor-7]
    - [droppableItemClass][setaccessor-4]
    - [removeOnSpill][getaccessor-8]
    - [removeOnSpill][setaccessor-5]
    - [copy][getaccessor-9]
    - [copy][setaccessor-6]
    - [\_copy][propertydeclaration-23]
    - [\_dropZone][propertydeclaration-24]
    - [\_dropZones][propertydeclaration-25]
    - [\_droppableItemClass][propertydeclaration-26]
    - [\_removeOnSpill][propertydeclaration-27]
    - [data][propertydeclaration-28]
    - [hasHandle][getaccessor-10]
    - [moveDisabled][getaccessor-11]
    - [classString][getaccessor-12]
    - [type][getaccessor-13]

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
| container          | [ContainerComponent][classdeclaration-5] |
| draggableDirective | [DraggableDirective][classdeclaration-1] |

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

---

### dropZone

```typescript
public get dropZone: any;
```

**Type**

any

---

### dropZone

```typescript
public set dropZone: any;
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

### droppableItemClass

```typescript
public get droppableItemClass: any;
```

**Type**

any

---

### droppableItemClass

```typescript
public set droppableItemClass: any;
```

**Type**

any

---

### removeOnSpill

```typescript
public get removeOnSpill: boolean;
```

**Type**

boolean

---

### removeOnSpill

```typescript
public set removeOnSpill: boolean;
```

**Type**

boolean

---

### copy

```typescript
public get copy: boolean;
```

**Type**

boolean

---

### copy

```typescript
public set copy: boolean;
```

**Type**

boolean

---

### \_copy

```typescript
public _copy: boolean;
```

**Type**

boolean

---

### \_dropZone

```typescript
public _dropZone: any;
```

**Type**

any

---

### \_dropZones

```typescript
public _dropZones: any;
```

**Type**

any

---

### \_droppableItemClass

```typescript
public _droppableItemClass: any;
```

**Type**

any

---

### \_removeOnSpill

```typescript
public _removeOnSpill: boolean;
```

**Type**

boolean

---

### data

```typescript
public data: any;
```

**Type**

any

---

### hasHandle

```typescript
public get hasHandle: boolean;
```

**Type**

boolean

---

### moveDisabled

```typescript
public get moveDisabled: boolean;
```

**Type**

boolean

---

### classString

```typescript
public get classString: string;
```

**Type**

string

---

### type

```typescript
public get type: "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array";
```

**Type**

"string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array"

[classdeclaration-4]: itemcomponent.md#itemcomponent
[constructor-2]: itemcomponent.md#constructorcontainer-draggabledirective
[classdeclaration-5]: containercomponent.md#containercomponent
[classdeclaration-1]: draggabledirective.md#draggabledirective
[methoddeclaration-15]: itemcomponent.md#ngoninit
[propertydeclaration-22]: itemcomponent.md#model
[getaccessor-5]: itemcomponent.md#dropzone
[setaccessor-2]: itemcomponent.md#dropzone
[getaccessor-6]: itemcomponent.md#dropzones
[setaccessor-3]: itemcomponent.md#dropzones
[getaccessor-7]: itemcomponent.md#droppableitemclass
[setaccessor-4]: itemcomponent.md#droppableitemclass
[getaccessor-8]: itemcomponent.md#removeonspill
[setaccessor-5]: itemcomponent.md#removeonspill
[getaccessor-9]: itemcomponent.md#copy
[setaccessor-6]: itemcomponent.md#copy
[propertydeclaration-23]: itemcomponent.md#_copy
[propertydeclaration-24]: itemcomponent.md#_dropzone
[propertydeclaration-25]: itemcomponent.md#_dropzones
[propertydeclaration-26]: itemcomponent.md#_droppableitemclass
[propertydeclaration-27]: itemcomponent.md#_removeonspill
[propertydeclaration-28]: itemcomponent.md#data
[getaccessor-10]: itemcomponent.md#hashandle
[getaccessor-11]: itemcomponent.md#movedisabled
[getaccessor-12]: itemcomponent.md#classstring
[getaccessor-13]: itemcomponent.md#type
