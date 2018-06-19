# ngx-dnd [![Codacy Badge](https://api.codacy.com/project/badge/Grade/06120385a7c84f18801b7b7c36e9fc82)](https://www.codacy.com/app/hypercubed/ngx-dnd?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-dnd&utm_campaign=Badge_Grade)

🕶 Drag, Drop and Sorting Library for Angular4 and beyond!

_Note: This project is under heavy construction. As such, the API may change dramatically between major releases and documentation is lacking._

## Features

* Drag and Drop
* Sorting
* Events (drag, drop, over, out)
* Nesting
* Touch support
* Templating

## Install

To use ngx-dnd in your project install it via [npm](https://www.npmjs.com/package/@swimlane/ngx-dnd):

* `npm i @swimlane/ngx-dnd @swimlane/dragula --save`
* Add `NgxDnDModule` to your application module
* If using directives you will need to BYO styles or include `@swimlane/ngx-dnd/release/index.css`.

## Quick intro and examples

### Directives

`ngx-dnd` provides a base set of directives to enable drag-and-drop. By default all children of a `ngxDroppable` element may be dragged and dropped. Add the `ngxDraggable` to restrict drag-and-drop to the parent container. In general prefer using the base directives to the help components introduced later.

```html
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable>Item 1</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3</div>
</div>
```

Give multiple containers the same `dropZone` name to allow drag-and-drop between these containers.

```html
<div class="ngx-dnd-container" ngxDroppable="example">
  <div class="ngx-dnd-item" ngxDraggable>Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

`ngxDraggable` items can be restricted to specific containers:

```html
<div class="ngx-dnd-container" ngxDroppable>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 1a</div>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 2a</div>
  <div class="ngx-dnd-item" ngxDraggable="['example-target']">Item 3a</div>
</div>
<div class="ngx-dnd-container" ngxDroppable="example-target">
  <div class="ngx-dnd-item" ngxDraggable>Item 1b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 2b</div>
  <div class="ngx-dnd-item" ngxDraggable>Item 3b</div>
</div>
```

### Components

`ngx-dnd` provides a set of helper components that encapsulates the directives mentioned and adds capability for data driven structures. In general you should prefer directives to components.

```js
orderableLists = [['Item 1a', 'Item 2a', 'Item 3a'], ['Item 1b', 'Item 2b', 'Item 3b']];
```

```html
<ngx-dnd-container
  [model]="orderableLists">
</ngx-dnd-container>
```

This component is effectively equivalent to:

```html
<div class="ngx-dnd-container" ngxDroppable [model]="orderableLists">
  <div
    class="ngx-dnd-item"
    ngxDraggable
    [model]="item"
    *ngFor="let item of orderableLists">{{item}}</div>
</div>
```

Including nested containers:

```html
<ngx-dnd-container
  [model]="nestedLists">
</ngx-dnd-container>
```

```js
nestedLists = [
  {
    label: 'Item 1',
    children: []
  },
  {
    label: 'Item 2',
    children: [
      {
        label: 'Item 2a',
        children: []
      },
      {
        label: 'Item 2b',
        children: []
      },
      {
        label: 'Item 2c',
        children: []
      }
    ]
  },
  {
    label: 'Item 3',
    children: [
      {
        label: 'Item 3a',
        children: []
      },
      {
        label: 'Item 3b',
        children: []
      },
      {
        label: 'Item 3c',
        children: []
      }
    ]
  }
];
```

See [https://swimlane.github.io/ngx-dnd/](https://swimlane.github.io/ngx-dnd/) for more lives examples. Demo code is at [https://github.com/swimlane/ngx-dnd/tree/master/demo](https://github.com/swimlane/ngx-dnd/tree/master/demo).

## Development

* `git clone git@github.com:swimlane/ngx-dnd.git`
* `cd ngx-dnd`
* `ng build @swimlane/ngx-dnd`
* `ng serve`
* Browse to [http://localhost:4200](http://localhost:4200)

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## [CHANGELOG](https://github.com/swimlane/ngx-dnd/blob/master/CHANGELOG.md)

This project uses [heff/chg](https://github.com/heff/chg), a simple changelog/release history manager. When contributing to this project please add change notes (manually or using the [heff/chg](https://github.com/heff/chg) cli) to the `## HEAD (Unreleased)` section.

## Release

This project uses [sindresorhus/np](https://github.com/sindresorhus/np), a better `npm publish`. To publish a new version to npm, first ensure all entries in the `## HEAD (Unreleased)` section of the changelog are appropriate, commit changes, and push changes to github (if not already done). Then use `npm run np` to launch an interactive UI that will guide you through publishing a new version. `sindresorhus/np` and `heff/chg` will perform various pre-publish checks, run tests, bump the version number, update the changelog, then publish to npm and push to github.

<details>
  <summary>Manual process</summary>

* `rm -rf node_modules`
* `npm i`
* `npm version {version_number}`
* `git push --tags`
* `npm run publish:lib`

</details>

## Credits

`ngx-dnd` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.
