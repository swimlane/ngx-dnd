describe('Demo', () => {
  const dragAndDrop = (fromElement, toElement, location = 'bottomRight') => {
    cy.get(fromElement).first().trigger('mousedown', { which: 1 });
    cy.get(toElement).trigger('mousemove', location).trigger('mouseup');
  };

  const matchOrder = order => {
    return $p => {
      const texts = $p.map((i, el) => Cypress.$(el).text().trim()).get();
      expect(texts).to.deep.eq(order);
    };
  };

  describe('Sortables', () => {
    before(function () {
      cy.visit('http://localhost:4200/sortables');
    });

    describe('No Model', () => {
      beforeEach(() => {
        cy.get('[data-cy="sortable-no-model"]').as('section');

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
        cy.get('@container').find('.ngx-dnd-item').last().as('item1').contains('Item 1');

        dragAndDrop('@item1', '@container', 'topLeft');

        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
      });
    });

    /* describe('No model - Disabled Item', () => {
      beforeEach(() => {
        cy
          .get('[sectiontitle="Sortable - No model - Disabled Item"]')
          .as('section')
          .contains('Sortable - No model - Disabled Item');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .as('container');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1 - Move Disabled', 'Item 2', 'Item 3']));
      });

      it('cannot drag first item', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1 - Move Disabled');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1 - Move Disabled', 'Item 2', 'Item 3']));
      });

      it('should drag to last item to top', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .last()
          .as('item3')
          .contains('Item 3');

        dragAndDrop('@item3', '@container', 'topLeft');

        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 3', 'Item 1 - Move Disabled', 'Item 2']));
      });
    }); */

    describe('Simple Sortable - from array model', () => {
      beforeEach(() => {
        cy.get('[data-cy="simple-sortable-from-array-model"]').as('section');

        cy.get('@section').find('.ngx-dnd-container').as('container');

        cy.get('[data-cy="simple-sortable-from-array-model-json"').as('model');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));

        cy.get('@model').contains('orderableList = [\n  "Item 1",\n  "Item 2",\n  "Item 3"\n]');
      });

      it('should drag first item to bottom', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));

        cy.get('@model').contains('orderableList = [\n  "Item 2",\n  "Item 3",\n  "Item 1"\n]');
      });

      it('should drag last item to top', () => {
        cy.get('@container').find('.ngx-dnd-item').last().as('item1').contains('Item 1');

        dragAndDrop('@item1', '@container', 'topLeft');

        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));

        cy.get('@model').contains('orderableList = [\n  "Item 1",\n  "Item 2",\n  "Item 3"\n]');
      });
    });

    describe('Simple Sortable - with drag handle', () => {
      beforeEach(() => {
        cy.get('[data-cy="simple-sortable-with-drag-handle"]').as('section');

        cy.get('@section').find('.ngx-dnd-container').as('container');
      });

      it('Initial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
      });

      it('cannot drag without using handle', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
      });

      it('can drag with handle', () => {
        cy.get('@container').find('.ngx-dnd-item').first().as('item1').contains('Item 1');

        cy.get('@item1').find('[ngxdraghandle]').as('handle');

        dragAndDrop('@handle', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy.get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));
      });
    });
  });

  describe('Drag-and-Drop', () => {
    before(() => {
      cy.visit('http://localhost:4200/dnd');
    });

    describe('No model', () => {
      beforeEach(() => {
        cy.get('[data-cy="simple-drag-and-drop-no-model"]').as('section');

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

        cy.get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2a', 'Item 3a']));

        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2b', 'Item 3b', 'Item 1a']));
      });
    });

    describe('Restricted - No model', () => {
      beforeEach(() => {
        cy.get('[data-cy="restricted-drag-and-Drop-no-model"]').as('section');

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
          .should(matchOrder(['Item 2a', 'Item 3a']));

        cy.get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b', 'Item 1a']));
      });
    });
  });

  describe('Builder', () => {
    before(() => {
      cy.visit('http://localhost:4200/builder#builder-demo');
    });

    beforeEach(() => {
      cy.get('.builder-container').as('section');

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

      cy.get('@target').find('.ngx-dnd-item').should(matchOrder([]));
    });

    it('should add a string item', () => {
      dragAndDrop('@sourceString', '@target', 'topLeft');

      cy.get('@source')
        .find('ngx-dnd-item')
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

      cy.get('@target')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'String']));

      cy.get('@target').find('.ngx-dnd-item .ngx-dnd-container').first().as('targetSectionContainer');

      dragAndDrop('@sourceNumber', '@targetSectionContainer', 'topLeft');

      cy.get('@targetSectionContainer')
        .find('ngx-dnd-item')
        .should(matchOrder(['Number']));
    });
  });
});
