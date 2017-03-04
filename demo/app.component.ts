import { Component, ViewEncapsulation, Inject } from '@angular/core';

declare var APP_VERSION: string;

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  version = APP_VERSION;

  theme = 'dark';

  orderableList = ['Item 1', 'Item 2', 'Item 3'];
  orderableLists = [
    ['Item 1a', 'Item 2a', 'Item 3a'],
    ['Item 1b', 'Item 2b', 'Item 3b']
  ];

  nestedLists = [
    { label: 'Item 1', children: [] },
    { label: 'Item 2', children: [
        { label: 'Item 2a', children: [] },
        { label: 'Item 2b', children: [] },
        { label: 'Item 2c', children: [] },
      ]
    },
    { label: 'Item 3', children: [
        { label: 'Item 3a', children: [] },
        { label: 'Item 3b', children: [] },
        { label: 'Item 3c', children: [] },
      ]
    },
  ];

  builder = {
    removeOnSpill: true,
    accepts(el, target) {
      return true; // target.classList.contains('target');
    },
    copy(el, source) {
      return source.classList.contains('source');
    }
  };

  sourceItems = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' }
  ];
  targetItems = [];

  sourceNestedItems = [
    { label: 'Item 1, no children', children: [] },
    { label: 'Item 2', children: [
        { label: 'no' },
        { label: 'children' }
      ]
    },
    { label: 'Item 3, can\'t have children' }
  ];
  targetNestedItems = [];

  sourceBuilderTools = [
    { name: 'Section', children: [], inputType: 'section', icon: 'section', class: 'wide' },
    { name: 'A String', inputType: 'string', icon: 'field-text', class: 'half' },
    { name: 'A Number', inputType: 'number', icon: 'field-numeric', class: 'half' }
  ];
  targetBuilderTools = [];
  builderClasses = {
    container: 'target',
    item: item => `${item.class} ${item.inputType}`
  };

  builderDrag(e) {
    const item = e.value;
    item.data = item.inputType === 'number' ?
      (Math.random() * 100) | 0 :
      Math.random().toString(36).substring(20);
  }

  log(e) {
    console.log(e.type, e);
  }
}
