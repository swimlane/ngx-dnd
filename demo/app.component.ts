import { Component, ViewEncapsulation } from '@angular/core';

declare var APP_VERSION: string;

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
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
    { label: 'Item 1', children: [] as any[] },
    { label: 'Item 2', children: [
        { label: 'Item 2a', children: [] as any[] },
        { label: 'Item 2b', children: [] as any[] },
        { label: 'Item 2c', children: [] as any[] },
      ]
    },
    { label: 'Item 3', children: [
        { label: 'Item 3a', children: [] as any[] },
        { label: 'Item 3b', children: [] as any[] },
        { label: 'Item 3c', children: [] as any[] },
      ]
    },
  ];

  sourceItems = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' }
  ];
  targetItems: any[] = [];
  targetItemsA: any[] = [];
  targetItemsB: any[] = [];

  sourceNestedItems = [
    { label: 'Item 1, no children', children: [] as any[] },
    { label: 'Item 2', children: [
        { label: 'no' },
        { label: 'children' }
      ]
    },
    { label: 'Item 3, can\'t have children' }
  ];
  targetNestedItems: any[] = [];

  sourceBuilderTools = [
    { name: 'Section', children: [] as any[], inputType: 'section', icon: 'section', class: 'wide' },
    { name: 'A String', inputType: 'string', icon: 'field-text', class: 'half' },
    { name: 'A Number', inputType: 'number', icon: 'field-numeric', class: 'half' }
  ];
  targetBuilderTools: any[] = [];

  droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

  builderDrag(e: any) {
    const item = e.value;
    item.data = item.inputType === 'number' ?
      (Math.random() * 100) | 0 :
      Math.random().toString(36).substring(20);
  }

  log(e: any) {
    console.log(e.type, e);
  }

  canMove(e: any): boolean {
    return e.indexOf('Disabled') === -1;
  }
}
