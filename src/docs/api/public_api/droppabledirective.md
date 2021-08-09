# Table of contents

- [DroppableDirective][classdeclaration-2]
  - Constructor
    - [constructor()][constructor-1]
  - Methods
    - [ngOnInit()][methoddeclaration-10]
    - [ngAfterViewInit()][methoddeclaration-11]
    - [ngOnDestroy()][methoddeclaration-12]
  - Properties
    - [model][propertydeclaration-10]
    - [copy][propertydeclaration-11]
    - [removeOnSpill][propertydeclaration-12]
    - [ngxDroppable][propertydeclaration-13]
    - [drop][propertydeclaration-14]
    - [drag][propertydeclaration-15]
    - [over][propertydeclaration-16]
    - [out][propertydeclaration-17]
    - [remove][propertydeclaration-18]
    - [cancel][propertydeclaration-19]
    - [container][getaccessor-3]
    - [dropZone][getaccessor-4]
    - [dropZone][setaccessor-1]
    - [defaultZone][propertydeclaration-20]
    - [\_dropZone][propertydeclaration-21]

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

---

### ngAfterViewInit()

```typescript
public ngAfterViewInit(): void;
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

### ngxDroppable

```typescript
public ngxDroppable: string;
```

**Type**

string

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

### container

```typescript
public get container: any;
```

**Type**

any

---

### dropZone

```typescript
public get dropZone: string;
```

**Type**

string

---

### dropZone

```typescript
public set dropZone: string;
```

**Type**

string

---

### defaultZone

```typescript
public defaultZone: string;
```

**Type**

string

---

### \_dropZone

```typescript
public _dropZone: string;
```

**Type**

string

[classdeclaration-2]: droppabledirective.md#droppabledirective
[constructor-1]: droppabledirective.md#constructor
[methoddeclaration-10]: droppabledirective.md#ngoninit
[methoddeclaration-11]: droppabledirective.md#ngafterviewinit
[methoddeclaration-12]: droppabledirective.md#ngondestroy
[propertydeclaration-10]: droppabledirective.md#model
[propertydeclaration-11]: droppabledirective.md#copy
[propertydeclaration-12]: droppabledirective.md#removeonspill
[propertydeclaration-13]: droppabledirective.md#ngxdroppable
[propertydeclaration-14]: droppabledirective.md#drop
[propertydeclaration-15]: droppabledirective.md#drag
[propertydeclaration-16]: droppabledirective.md#over
[propertydeclaration-17]: droppabledirective.md#out
[propertydeclaration-18]: droppabledirective.md#remove
[propertydeclaration-19]: droppabledirective.md#cancel
[getaccessor-3]: droppabledirective.md#container
[getaccessor-4]: droppabledirective.md#dropzone
[setaccessor-1]: droppabledirective.md#dropzone
[propertydeclaration-20]: droppabledirective.md#defaultzone
[propertydeclaration-21]: droppabledirective.md#_dropzone
