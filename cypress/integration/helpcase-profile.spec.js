describe('View helpcase profile page', () => {
    it('User can view the title', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/1`);
        cy.get('[data-testid=resident-name_header]').should('contain', "Firstname Lastname");
    });
});