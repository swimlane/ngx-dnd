describe('Demo', () => {
  beforeEach(function() {
    cy.visit('http://localhost:4200/');
  });

  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'ngx-dnd - Angular2+ Drag and Drop');
  });

  const dragAndDrop = (fromElement, toElement, location = 'bottomRight') => {
    return cy
      .get(fromElement)
      .should('be.visible')
      .first()
      .trigger('mousedown', { which: 1 })
      .get(toElement)
      .should('be.visible')
      .trigger('mousemove', location)
      .trigger('mouseup');
  };

  const matchOrder = order => {
    return $p => {
      const texts = $p
        .map((i, el) =>
          Cypress.$(el)
            .text()
            .trim()
        )
        .get();
      expect(texts).to.deep.eq(order);
    };
  };

  describe('Sortables', () => {
    describe('No Model', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Sortable - No model"]')
          .as('section')
          .contains('Sortable - No model');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .as('container');
      });

      it('Intial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));
      });

      it('should drag first item to bottom', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));
      });

      it('should drag last item to top', () => {
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
          .should(matchOrder(['Item 3', 'Item 1', 'Item 2']));
      });
    });

    describe('No model - Disabled Item', () => {
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

      it('Intial State', () => {
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
    });

    describe('Simple Sortable - from array model', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Simple Sortable - from array model"]')
          .as('section')
          .contains('Simple Sortable - from array model');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .as('container');

        cy
          .get('@section')
          .find('pre code')
          .first()
          .as('model');
      });

      it('Intial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));

        cy.get('@model').contains('orderableList = [\n  "Item 1",\n  "Item 2",\n  "Item 3"\n]');
      });

      it('should drag first item to bottom', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));

        cy.get('@model').contains('orderableList = [\n  "Item 2",\n  "Item 3",\n  "Item 1"\n]');
      });

      it('should drag last item to top', () => {
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
          .should(matchOrder(['Item 3', 'Item 1', 'Item 2']));

        cy.get('@model').contains('orderableList = [\n  "Item 3",\n  "Item 1",\n  "Item 2"\n]');
      });
    });

    describe('Simple Sortable - with drag handle', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Simple Sortable - with drag handle"]')
          .as('section')
          .contains('Simple Sortable - with drag handle');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .as('container');

        cy
          .get('@section')
          .find('pre code')
          .first()
          .as('model');
      });

      it('Intial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));

        cy.get('@model').contains('orderableList = [\n  "Item 1",\n  "Item 2",\n  "Item 3"\n]');
      });

      it('cannot drag without using handle', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3']));

        cy.get('@model').contains('orderableList = [\n  "Item 1",\n  "Item 2",\n  "Item 3"\n]');
      });

      it('can drag with handle', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1');

        cy
          .get('@item1')
          .find('[ngxdraghandle]')
          .as('handle');

        dragAndDrop('@handle', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 1']));

        cy.get('@model').contains('orderableList = [\n  "Item 2",\n  "Item 3",\n  "Item 1"\n]');
      });
    });
  });

  describe('Orderables', () => {
    describe('With fxLayout', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Orderable - With fxLayout"]')
          .as('section')
          .contains('Orderable - With fxLayout');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .as('container');
      });

      it('Intial State', () => {
        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']));
      });

      it('should drag first item to end', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1');

        dragAndDrop('@item1', '@container');

        cy.get('@container').find('.ngx-dnd-item');
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 1']));
      });

      it('should drag last item to front', () => {
        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .last()
          .as('item5')
          .contains('Item 5');

        dragAndDrop('@item5', '@container', 'topLeft');

        cy
          .get('@container')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 5', 'Item 1', 'Item 2', 'Item 3', 'Item 4']));
      });
    });
  });

  describe('Drag-and-Drop', () => {
    describe('No model', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Simple Drag-and-Drop - No model"]')
          .as('section')
          .contains('Simple Drag-and-Drop - No model');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .first()
          .as('containerA');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .last()
          .as('containerB');
      });

      it('Intial State', () => {
        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });

      it('should drag from first container to second', () => {
        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1a');

        dragAndDrop('@item1', '@containerB');

        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b', 'Item 1a']));
      });

      it('should drag from second container to first', () => {
        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .last()
          .as('item5')
          .contains('Item 3b');

        dragAndDrop('@item5', '@containerA', 'topLeft');

        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 3b', 'Item 1a', 'Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b']));
      });
    });

    describe('Restricted - No model', () => {
      beforeEach(function() {
        cy
          .get('[sectiontitle="Restricted Drag-and-Drop - No model"]')
          .as('section')
          .contains('Restricted Drag-and-Drop - No model');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .first()
          .as('containerA');

        cy
          .get('@section')
          .find('.ngx-dnd-container')
          .last()
          .as('containerB');
      });

      it('Intial State', () => {
        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });

      it('should drag from first container to second', () => {
        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .first()
          .as('item1')
          .contains('Item 1a');

        dragAndDrop('@item1', '@containerB');

        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b', 'Item 1a']));
      });

      it('cannot drag from second container to first', () => {
        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .last()
          .as('item5')
          .contains('Item 3b');

        dragAndDrop('@item5', '@containerA', 'topLeft');

        cy
          .get('@containerA')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1a', 'Item 2a', 'Item 3a']));

        cy
          .get('@containerB')
          .find('.ngx-dnd-item')
          .should(matchOrder(['Item 1b', 'Item 2b', 'Item 3b']));
      });
    });
  });

  describe('Builder', () => {
    beforeEach(() => {
      cy
        .get('[sectiontitle="Builder Demo"]')
        .as('section')
        .contains('Builder Demo');

      cy
        .get('@section')
        .find('.builder-source .ngx-dnd-container')
        .first()
        .as('source');

      cy
        .get('@section')
        .find('.builder-target .ngx-dnd-container')
        .first()
        .as('target');

      cy
        .get('@source')
        .find('.ngx-dnd-item.section')
        .as('sourceSection')
        .contains('Section');

      cy
        .get('@source')
        .find('.ngx-dnd-item.string')
        .as('sourceString')
        .contains('A String');

      cy
        .get('@source')
        .find('.ngx-dnd-item.number')
        .as('sourceNumber')
        .contains('A Number');
    });

    it('Intial State', () => {
      cy
        .get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'A String', 'A Number']));

      cy
        .get('@target')
        .find('.ngx-dnd-item')
        .should(matchOrder([]));
    });

    it('should add a string item', () => {
      dragAndDrop('@sourceString', '@target', 'topLeft');

      cy
        .get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'A String', 'A Number']));

      cy
        .get('@target')
        .find('.ngx-dnd-item')
        .should(matchOrder(['A String']));
    });

    it('should add a section item', () => {
      dragAndDrop('@sourceSection', '@target', 'topLeft');

      cy
        .get('@source')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section', 'A String', 'A Number']));

      cy
        .get('@target')
        .find('.ngx-dnd-item')
        .should(matchOrder(['Section']));

      cy
        .get('@target')
        .find('.ngx-dnd-item .ngx-dnd-container')
        .first()
        .as('targetSectionContainer');

      dragAndDrop('@sourceNumber', '@targetSectionContainer', 'topLeft');

      cy
        .get('@target')
        .find('> .ngx-dnd-item')
        .should('has.length', 1)
        .contains('Section');

      cy
        .get('@targetSectionContainer')
        .find('.ngx-dnd-item')
        .should(matchOrder(['A Number']));
    });
  });
});
