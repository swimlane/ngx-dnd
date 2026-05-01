import { ChangeDetectionStrategy, Component } from '@angular/core';

import introductionSource from './introduction.mx';

import type { IntroductionDoc } from './introduction.types';

@Component({
  selector: 'ngx-dnd-introduction-doc',
  standalone: true,
  templateUrl: './introduction-doc.component.html',
  styleUrl: './introduction-doc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionDocComponent {
  readonly doc: IntroductionDoc = JSON.parse(introductionSource) as IntroductionDoc;
}
