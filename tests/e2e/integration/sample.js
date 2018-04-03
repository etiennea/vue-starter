/* eslint-disable */

describe('Sample tests', () => {
  it('Visits index page', () => {
    cy.visit('/');
    cy.contains('h1', 'Bienvenue');
  });

  it('Go to about page', () => {
    cy.visit('/#/about');
    cy.contains('h1', 'About Page');
  });
});
