describe('view residents to contact', () => {
    beforeEach(() => {
        cy.login();
        cy.setIntercepts();
        cy.visit('/');
    });

    it('can navigate to the first resident page', () => {
        cy.get('[data-testid=view-callback-list_button]').click();
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.get('[data-testid=resident-name_header]').should('contain', 'Cydney Nader');
    });
});
