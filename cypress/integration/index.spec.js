beforeEach(() => {
    cy.login();
});

describe('View start page', () => {
    it('User can view the title', () => {
        cy.visit(`http://localhost:3000/dashboard`);

        cy.get('h1').should('contain', 'Here to help');
    });
});

export {};