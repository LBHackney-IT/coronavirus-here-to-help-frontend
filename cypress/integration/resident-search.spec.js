beforeEach(() => {
    cy.visit(`http://localhost:3000/resident-search`);
});

describe('View resident lookup page', () => {
    it('User can view the title', () => {
        cy.get('h1').should('contain', 'Resident lookup');
    });
});

export {};