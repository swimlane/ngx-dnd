import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { AlertService } from '@swimlane/ngx-ui';

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

  nestedLists = {
    label: 'root', 
    children: [
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
    ]
  };

  builder = {
    removeOnSpill: true,
    accepts(el, target) {
      return target.classList.contains('target');
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
    { name: 'Section', children: [], itemType: 'section', icon: 'section', class: 'wide' },
    { name: 'A String', itemType: 'string', icon: 'field-text', class: 'half' },
    { name: 'A Number', itemType: 'number', icon: 'field-numeric', class: 'half' }
  ];
  targetBuilderTools = [];
  builderClasses = {
    container: 'target',
    item: item => `${item.class} ${item.layoutType}`
  };

  constructor(
    private dragulaService: DragulaService,
    /* private alertService: AlertService */) {

  }

  builderDrag(e) {
    const item = e.value;
    item.data = Math.random();
    if (item.itemType !== 'number') {
      item.data = item.data.toString(36).substring(20);
    }
  }

  log(e) {
    console.log(e.type, e);
  }

  onPromptClick(model) {
    /* const subject = this.alertService.prompt({
      title: `Update ${model.name}`,
      content: `Enter a ${model.itemType}`
    }).subscribe(v => model.data = v.data); */
  }
}
