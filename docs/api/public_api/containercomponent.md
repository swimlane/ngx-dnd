# Table of contents

* [ContainerComponent][ClassDeclaration-5]
    * Methods
        * [ngOnInit()][MethodDeclaration-13]
        * [ngAfterViewInit()][MethodDeclaration-14]
    * Properties
        * [model][PropertyDeclaration-29]
        * [copy][PropertyDeclaration-30]
        * [removeOnSpill][PropertyDeclaration-31]
        * [droppableItemClass][PropertyDeclaration-32]
        * [dropZone][PropertyDeclaration-33]
        * [dropZones][GetAccessor-14]
        * [dropZones][SetAccessor-7]
        * [moves][PropertyDeclaration-34]
        * [template][PropertyDeclaration-35]
        * [droppable][PropertyDeclaration-36]
        * [drop][PropertyDeclaration-37]
        * [drag][PropertyDeclaration-38]
        * [over][PropertyDeclaration-39]
        * [out][PropertyDeclaration-40]
        * [remove][PropertyDeclaration-41]
        * [cancel][PropertyDeclaration-42]
        * [_dropZones][PropertyDeclaration-43]
        * [_defaultZones][PropertyDeclaration-44]

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

----------

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

----------

### copy

```typescript
public copy: boolean;
```

**Type**

boolean

----------

### removeOnSpill

```typescript
public removeOnSpill: boolean;
```

**Type**

boolean

----------

### droppableItemClass

```typescript
public droppableItemClass: string | ((o: any) => any);
```

**Type**

string | ((o: any) => any)

----------

### dropZone

```typescript
public dropZone: string;
```

**Type**

string

----------

### dropZones

```typescript
public get dropZones: string[];
```

**Type**

string[]

----------

### dropZones

```typescript
public set dropZones: string[];
```

**Type**

string[]

----------

### moves

```typescript
public moves: (model: any, source: any, handle: any, sibling: any) => boolean;
```

**Type**

(model: any, source: any, handle: any, sibling: any) => boolean

----------

### template

```typescript
public template: TemplateRef<any>;
```

**Type**

TemplateRef<any>

----------

### droppable

```typescript
public droppable: any;
```

**Type**

any

----------

### drop

```typescript
public drop: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### drag

```typescript
public drag: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### over

```typescript
public over: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### out

```typescript
public out: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### remove

```typescript
public remove: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### cancel

```typescript
public cancel: EventEmitter<any>;
```

**Type**

EventEmitter<any>

----------

### _dropZones

```typescript
public _dropZones: string[];
```

**Type**

string[]

----------

### _defaultZones

```typescript
public _defaultZones: string[];
```

**Type**

string[]

[ClassDeclaration-5]: containercomponent.md#containercomponent
[MethodDeclaration-13]: containercomponent.md#ngoninit
[MethodDeclaration-14]: containercomponent.md#ngafterviewinit
[PropertyDeclaration-29]: containercomponent.md#model
[PropertyDeclaration-30]: containercomponent.md#copy
[PropertyDeclaration-31]: containercomponent.md#removeonspill
[PropertyDeclaration-32]: containercomponent.md#droppableitemclass
[PropertyDeclaration-33]: containercomponent.md#dropzone
[GetAccessor-14]: containercomponent.md#dropzones
[SetAccessor-7]: containercomponent.md#dropzones
[PropertyDeclaration-34]: containercomponent.md#moves
[PropertyDeclaration-35]: containercomponent.md#template
[PropertyDeclaration-36]: containercomponent.md#droppable
[PropertyDeclaration-37]: containercomponent.md#drop
[PropertyDeclaration-38]: containercomponent.md#drag
[PropertyDeclaration-39]: containercomponent.md#over
[PropertyDeclaration-40]: containercomponent.md#out
[PropertyDeclaration-41]: containercomponent.md#remove
[PropertyDeclaration-42]: containercomponent.md#cancel
[PropertyDeclaration-43]: containercomponent.md#_dropzones
[PropertyDeclaration-44]: containercomponent.md#_defaultzones