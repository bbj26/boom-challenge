describe('Game Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the board with tiles', () => {
    cy.get('.board').find('.tile').should('have.length', 36);
  });

  it('should reveal a tile on click', () => {
    cy.get('.tile').first().click({ force: true });
    cy.get('.tile').first().should('not.be.empty');
  });

  it('should reset the game when the reset button is clicked', () => {
    // flip some of the tiles
    cy.get('.tile').first().click({ force: true });
    cy.get('.tile').last().click({ force: true });

    cy.get('.reset-button').click({ force: true });

    cy.get('.tile').each((tile) => {
      cy.wrap(tile).should('be.empty');
    });
  });
});
