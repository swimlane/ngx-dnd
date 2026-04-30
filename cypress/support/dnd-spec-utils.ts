/// <reference types="cypress" />

/** Story ids from Storybook manifest (see `dist/storybook/ngx-dnd/index.json` after build). */
export const SB = {
  sortablesNoModel: 'examples-sortables--no-model',
  sortablesFromArrayModel: 'examples-sortables--from-array-model',
  sortablesDragHandle: 'examples-sortables--drag-handle',
  dndNoModel: 'examples-drag-and-drop--no-model',
  dndRestricted: 'examples-drag-and-drop--restricted',
  builderDemo: 'examples-builder-demo--builder-demo'
} as const;

export function dragAndDrop(
  fromElement: string,
  toElement: string,
  location: 'bottomRight' | 'topLeft' = 'bottomRight'
): void {
  cy.get(fromElement).first().trigger('mousedown', { which: 1 });
  cy.get(toElement).trigger('mousemove', location).trigger('mouseup');
}

export function matchOrder(order: string[]): ($p: JQuery<HTMLElement>) => void {
  return $p => {
    const texts = $p.map((_i, el) => Cypress.$(el).text().trim()).get();
    expect(texts).to.deep.eq(order);
  };
}

/** Compare item labels when a drag handle adds extra visible text (e.g. ⋮). */
export function matchOrderIgnoringHandle(order: string[]): ($p: JQuery<HTMLElement>) => void {
  return $p => {
    const texts = $p
      .map((_i, el) => {
        const $el = Cypress.$(el).clone();
        $el.find('[ngxDragHandle], .ngx-dnd-drag-handle-demo').remove();
        return $el.text().replace(/\s+/g, ' ').trim();
      })
      .get();
    expect(texts).to.deep.eq(order);
  };
}
