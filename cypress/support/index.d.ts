/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      visitStory(storyId: string): Chainable;
    }
  }
}

export {};
