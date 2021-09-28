/// <reference types="cypress" />

describe('The Main Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('What are your plans for today?');
  });
});
