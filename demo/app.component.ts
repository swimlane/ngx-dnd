import { Component, ViewEncapsulation } from '@angular/core';

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
}
