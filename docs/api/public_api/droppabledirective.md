# Table of contents

* [DroppableDirective][ClassDeclaration-2]
    * Constructor
        * [constructor()][Constructor-1]
    * Methods
        * [ngOnInit()][MethodDeclaration-10]
        * [ngAfterViewInit()][MethodDeclaration-11]
        * [ngOnDestroy()][MethodDeclaration-12]
    * Properties
        * [model][PropertyDeclaration-10]
        * [copy][PropertyDeclaration-11]
        * [removeOnSpill][PropertyDeclaration-12]
        * [ngxDroppable][PropertyDeclaration-13]
        * [drop][PropertyDeclaration-14]
        * [drag][PropertyDeclaration-15]
        * [over][PropertyDeclaration-16]
        * [out][PropertyDeclaration-17]
        * [remove][PropertyDeclaration-18]
        * [cancel][PropertyDeclaration-19]
        * [container][GetAccessor-3]
        * [dropZone][GetAccessor-4]
        * [dropZone][SetAccessor-1]
        * [defaultZone][PropertyDeclaration-20]
        * [_dropZone][PropertyDeclaration-21]

# DroppableDirective

Makes the container droppable and children draggable.

```typescript
class DroppableDirective implements OnInit, OnDestroy, AfterViewInit
```
## Constructor

### constructor()

```typescript
public constructor();
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

----------

### ngOnDestroy()

```typescript
public ngOnDestroy(): void;
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

### ngxDroppable

```typescript
public ngxDroppable: string;
```

**Type**

string

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

### container

```typescript
public get container: any;
```

**Type**

any

----------

### dropZone

```typescript
public get dropZone: string;
```

**Type**

string

----------

### dropZone

```typescript
public set dropZone: string;
```

**Type**

string

----------

### defaultZone

```typescript
public defaultZone: string;
```

**Type**

string

----------

### _dropZone

```typescript
public _dropZone: string;
```

**Type**

string

[ClassDeclaration-2]: droppabledirective.md#droppabledirective
[Constructor-1]: droppabledirective.md#constructor
[MethodDeclaration-10]: droppabledirective.md#ngoninit
[MethodDeclaration-11]: droppabledirective.md#ngafterviewinit
[MethodDeclaration-12]: droppabledirective.md#ngondestroy
[PropertyDeclaration-10]: droppabledirective.md#model
[PropertyDeclaration-11]: droppabledirective.md#copy
[PropertyDeclaration-12]: droppabledirective.md#removeonspill
[PropertyDeclaration-13]: droppabledirective.md#ngxdroppable
[PropertyDeclaration-14]: droppabledirective.md#drop
[PropertyDeclaration-15]: droppabledirective.md#drag
[PropertyDeclaration-16]: droppabledirective.md#over
[PropertyDeclaration-17]: droppabledirective.md#out
[PropertyDeclaration-18]: droppabledirective.md#remove
[PropertyDeclaration-19]: droppabledirective.md#cancel
[GetAccessor-3]: droppabledirective.md#container
[GetAccessor-4]: droppabledirective.md#dropzone
[SetAccessor-1]: droppabledirective.md#dropzone
[PropertyDeclaration-20]: droppabledirective.md#defaultzone
[PropertyDeclaration-21]: droppabledirective.md#_dropzone