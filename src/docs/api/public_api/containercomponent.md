# Table of contents

- [ContainerComponent][classdeclaration-5]
  - Methods
    - [ngOnInit()][methoddeclaration-13]
    - [ngAfterViewInit()][methoddeclaration-14]
  - Properties
    - [model][propertydeclaration-29]
    - [copy][propertydeclaration-30]
    - [removeOnSpill][propertydeclaration-31]
    - [droppableItemClass][propertydeclaration-32]
    - [dropZone][propertydeclaration-33]
    - [dropZones][getaccessor-14]
    - [dropZones][setaccessor-7]
    - [moves][propertydeclaration-34]
    - [template][propertydeclaration-35]
    - [droppable][propertydeclaration-36]
    - [drop][propertydeclaration-37]
    - [drag][propertydeclaration-38]
    - [over][propertydeclaration-39]
    - [out][propertydeclaration-40]
    - [remove][propertydeclaration-41]
    - [cancel][propertydeclaration-42]
    - [\_dropZones][propertydeclaration-43]
    - [\_defaultZones][propertydeclaration-44]

# ContainerComponent

Component that allows nested ngxDroppable and ngxDraggables

```typescript
class ContainerComponent implements OnInit, AfterViewInit
```

## Methods

### ngOnInit()

```typescript
public ngOnInit(): void;
```

**Return type**

void

---

### ngAfterViewInit()

```typescript
public ngAfterViewInit(): void;
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

### copy

```typescript
public copy: boolean;
```

**Type**

boolean

---

### removeOnSpill

```typescript
public removeOnSpill: boolean;
```

**Type**

boolean

---

### droppableItemClass

```typescript
public droppableItemClass: string | ((o: any) => any);
```

**Type**

string | ((o: any) => any)

---

### dropZone

```typescript
public dropZone: string;
```

**Type**

string

---

### dropZones

```typescript
public get dropZones: string[];
```

**Type**

string[]

---

### dropZones

```typescript
public set dropZones: string[];
```

**Type**

string[]

---

### moves

```typescript
public moves: (model: any, source: any, handle: any, sibling: any) => boolean;
```

**Type**

(model: any, source: any, handle: any, sibling: any) => boolean

---

### template

```typescript
public template: TemplateRef<any>;
```

**Type**

TemplateRef<any>

---

### droppable

```typescript
public droppable: any;
```

**Type**

any

---

### drop

```typescript
public drop: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### drag

```typescript
public drag: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### over

```typescript
public over: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### out

```typescript
public out: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### remove

```typescript
public remove: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### cancel

```typescript
public cancel: EventEmitter<any>;
```

**Type**

EventEmitter<any>

---

### \_dropZones

```typescript
public _dropZones: string[];
```

**Type**

string[]

---

### \_defaultZones

```typescript
public _defaultZones: string[];
```

**Type**

string[]

[classdeclaration-5]: containercomponent.md#containercomponent
[methoddeclaration-13]: containercomponent.md#ngoninit
[methoddeclaration-14]: containercomponent.md#ngafterviewinit
[propertydeclaration-29]: containercomponent.md#model
[propertydeclaration-30]: containercomponent.md#copy
[propertydeclaration-31]: containercomponent.md#removeonspill
[propertydeclaration-32]: containercomponent.md#droppableitemclass
[propertydeclaration-33]: containercomponent.md#dropzone
[getaccessor-14]: containercomponent.md#dropzones
[setaccessor-7]: containercomponent.md#dropzones
[propertydeclaration-34]: containercomponent.md#moves
[propertydeclaration-35]: containercomponent.md#template
[propertydeclaration-36]: containercomponent.md#droppable
[propertydeclaration-37]: containercomponent.md#drop
[propertydeclaration-38]: containercomponent.md#drag
[propertydeclaration-39]: containercomponent.md#over
[propertydeclaration-40]: containercomponent.md#out
[propertydeclaration-41]: containercomponent.md#remove
[propertydeclaration-42]: containercomponent.md#cancel
[propertydeclaration-43]: containercomponent.md#_dropzones
[propertydeclaration-44]: containercomponent.md#_defaultzones
