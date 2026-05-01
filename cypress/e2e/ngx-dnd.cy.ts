import { SB, dragAndDrop, matchOrder, matchOrderIgnoringHandle } from '../support/dnd-spec-utils';

describe('ngx-dnd (Storybook)', () => {
  describe('Sortables', () => {
    describe('No Model', () => {
      beforeEach(() => {
        cy.visitStory(SB.sortablesNoModel);
        cy.get('.ngx-dnd-story-demo').as('section');
        cy.get('@section').find('.ngx-dnd-container').as('container');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
      });

      it('should drag first item to bottom', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');
        dragAndDrop('@item1', '@container');
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));
      });

      it('should drag last item to top', () => {
        cy.get('@container').find('.ngx-dnd-item').last().as('item3').contains('Item 3');
        dragAndDrop('@item3', '@container', 'topLeft');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 3', 'Item 1', 'Item 2']));
      });
    });

    describe('Simple Sortable - from array model', () => {
      beforeEach(() => {
        cy.visitStory(SB.sortablesFromArrayModel);
        cy.get('.ngx-dnd-story-demo').as('section');
        cy.get('@section').find('.ngx-dnd-container').as('container');
        // Live bound markup lives in .ngx-dnd-story-demo; .ngx-dnd-story-source shows static template text only.
        cy.get('@section').find('pre code').as('model');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
        cy.get('@model').contains('Item 1');
        cy.get('@model').contains('Item 2');
        cy.get('@model').contains('Item 3');
      });

      it('should drag first item to bottom', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');
        dragAndDrop('@item1', '@container');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));
        cy.get('@model').contains('Item 2');
        cy.get('@model').contains('Item 1');
      });

      it('should drag last item to top', () => {
        cy.get('@container').find('.ngx-dnd-item').last().as('item3').contains('Item 3');
        dragAndDrop('@item3', '@container', 'topLeft');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 3', 'Item 1', 'Item 2']));
      });
    });

    describe('Simple Sortable - with drag handle', () => {
      beforeEach(() => {
        cy.visitStory(SB.sortablesDragHandle);
        cy.get('.ngx-dnd-story-demo').as('section');
        cy.get('@section').find('.ngx-dnd-container').as('container');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrderIgnoringHandle(['Item 1', 'Item 2', 'Item 3']));
      });

      it('cannot drag without using handle', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');
        dragAndDrop('@item1', '@container');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrderIgnoringHandle(['Item 1', 'Item 2', 'Item 3']));
      });

      it('can drag with handle', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');
        cy.get('@item1').find('[ngxdraghandle]').as('handle');
        dragAndDrop('@handle', '@container');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrderIgnoringHandle(['Item 2', 'Item 3', 'Item 1']));
      });
    });
  });

  describe('Drag-and-drop', () => {
    describe('No model', () => {
      beforeEach(() => {
        cy.visitStory(SB.dndNoModel);
        cy.get('.ngx-dnd-story-demo').as('section');
        cy.get('@section').find('.ngx-dnd-container').first().as('containerA');
        cy.get('@section').find('.ngx-dnd-container').last().as('containerB');
      });

      it('Initial State', () => {
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });

      it('should drag from first container to second', () => {
        cy.get('@containerA').find('.ngx-dnd-item').first().as('item1').contains('Item 1a');
        dragAndDrop('@item1', '@containerB');
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b', 'Item 1a']));
      });

      it('should drag from second container to first', () => {
        cy.get('@containerB').find('.ngx-dnd-item').first().as('item1b').contains('Item 1b');
        dragAndDrop('@item1b', '@containerA', 'topLeft');
        // Dropping at top of A inserts 1b before existing items (1a stays in A; B loses 1b).
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 1a', 'Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2b', 'Item 3b']));
      });
    });

    describe('Restricted - No model', () => {
      beforeEach(() => {
        cy.visitStory(SB.dndRestricted);
        cy.get('.ngx-dnd-story-demo').as('section');
        cy.get('@section').find('.ngx-dnd-container').first().as('containerA');
        cy.get('@section').find('.ngx-dnd-container').last().as('containerB');
      });

      it('Initial State', () => {
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });

      it('should drag from first container to second', () => {
        cy.get('@containerA').find('.ngx-dnd-item').first().as('item1').contains('Item 1a');
        dragAndDrop('@item1', '@containerB');
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b', 'Item 1a']));
      });

      it('cannot drag from second container to first', () => {
        cy.get('@containerB').find('.ngx-dnd-item').first().as('item1b').contains('Item 1b');
        dragAndDrop('@item1b', '@containerA', 'topLeft');
        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));
        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });
    });
  });

  describe('Builder', () => {
    beforeEach(() => {
      cy.visitStory(SB.builderDemo);
      cy.get('.ngx-dnd-story-demo .builder-container').as('section');
      cy.get('@section').find('.builder-source .ngx-dnd-container').first().as('source');
      cy.get('@section').find('.builder-target .ngx-dnd-container').first().as('target');
      cy.get('@source').find('.ngx-dnd-item.section').as('sourceSection').contains('Section');
      cy.get('@source').find('.ngx-dnd-item.string').as('sourceString').contains('String');
      cy.get('@source').find('.ngx-dnd-item.number').as('sourceNumber').contains('Number');
    });

    it('Initial State', () => {
      cy.get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'String', 'Number']));
      cy.get('@target').find('.ngx-dnd-item').should('have.length', 0);
    });

    it('should add a string item', () => {
      dragAndDrop('@sourceString', '@target', 'topLeft');
      cy.get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'String', 'Number']));
      cy.get('@section')
        .find('.builder-target ngx-dnd-container')
        .find('ngx-dnd-item')
        .should(matchOrder(['String']));
    });

    it('should add a section item', () => {
      dragAndDrop('@sourceSection', '@target', 'topLeft');
      cy.get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'String', 'Number']));
      // Target root lists one section row (inner fields are not separate root ngx-dnd-items).
      cy.get('@target')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section']));
      cy.get('@target').find('.ngx-dnd-item .ngx-dnd-container').first().as('targetSectionContainer');
      dragAndDrop('@sourceNumber', '@targetSectionContainer', 'topLeft');
      cy.get('@targetSectionContainer')
        .find('ngx-dnd-item')
        .should(matchOrder(['Number']));
    });
  });
});
