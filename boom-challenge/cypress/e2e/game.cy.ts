export const extractEmojiIndexes = (board: string) => {
  const boardArray = JSON.parse(board);

  const smileyIndexes: number[] = [];
  const bombIndexes: number[] = [];
  const resetIndexes: number[] = [];

  boardArray.forEach((tile: { value: string }, index: number) => {
    switch (tile.value) {
      case '😃':
        smileyIndexes.push(index);
        break;
      case '💥':
        bombIndexes.push(index);
        break;
      case '🌀':
        resetIndexes.push(index);
        break;
      default:
        break;
    }
  });

  return { smileyIndexes, bombIndexes, resetIndexes };
};

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

  it('should win the game and start new one', () => {
    // Flip a tile to ensure state is initialized
    cy.get('.tile').first().click({ force: true });

    cy.window().then((win) => {
      // first we find state and board loaded to be sure what we are clicking on
      const serializedState = win.localStorage.getItem('persist:root');
      const state = serializedState ? JSON.parse(serializedState) : undefined;

      if (state && state.board) {
        const { smileyIndexes, bombIndexes, resetIndexes } =
          extractEmojiIndexes(state.board);

        cy.get('.tile').eq(smileyIndexes[0]).click({ force: true });
        cy.get('.tile').eq(smileyIndexes[1]).click({ force: true });
        cy.get('.tile').eq(smileyIndexes[2]).click({ force: true });

        cy.get('.modal-content')
          .find('p')
          .should('have.length', 1)
          .should('have.text', '😃YOU WON!😃');

        cy.get('.modal-content', { timeout: 6000 }).should('not.exist');
        cy.get('.board').find('.tile').should('have.text', ''); // board emtpy
      } else {
        console.log('No board state found in localStorage.');
      }
    });
  });
});
