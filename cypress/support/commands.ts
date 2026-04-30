/**
 * Open a story in the Storybook preview iframe (matches ids in dist/storybook/.../index.json).
 */
Cypress.Commands.add('visitStory', (storyId: string) => {
  cy.visit(`/iframe.html?id=${storyId}&viewMode=story`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      visitStory(storyId: string): Chainable<void>;
    }
  }
}

export {};
