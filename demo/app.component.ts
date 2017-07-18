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

  topics = [
    {
      title: 'Item title 1',
      content: 'some fake random content ' + Math.random(),
      children: [
        {
          title: 'Item title 3',
          content: 'some fake random content ' + Math.random(),
          children: []
        }, {
          title: 'Item title 4',
          content: 'some fake random content ' + Math.random(),
          children: [
            {
              title: 'Item title 7',
              content: 'some fake random content ' + Math.random(),
              children: [
                {
                  title: 'Item title 8',
                  content: 'some fake random content ' + Math.random(),
                  children: []
                }, {
                  title: 'Item title 9',
                  content: 'some fake random content ' + Math.random(),
                  children: []
                }
              ]
            }, {
              title: 'Item title 10',
              content: 'some fake random content ' + Math.random(),
              children: [
                {
                  title: 'Item title 11',
                  content: 'some fake random content ' + Math.random(),
                  children: []
                }, {
                  title: 'Item title 12',
                  content: 'some fake random content ' + Math.random(),
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Item title 2',
      content: 'some fake random content ' + Math.random(),
      children: [
        {
          title: 'Item title 5',
          content: 'some fake random content ' + Math.random(),
          children: []
        }, {
          title: 'Item title 6',
          content: 'some fake random content ' + Math.random(),
          children: []
        }
      ]
    }
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
    { name: 'Section', children: [], inputType: 'section', icon: 'section', class: 'wide' },
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
