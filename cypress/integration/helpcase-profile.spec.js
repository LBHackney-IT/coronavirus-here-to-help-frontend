describe('View helpcase profile page', () => {
    it('User can view the title', () => {
        cy.visit(`http://localhost:3000/helpcase-profile`);
        cy.get('h1').should('not.be.empty');
    });
});