describe('view residents to contact', () => {
    beforeEach(() => {
        cy.login();
        cy.setIntercepts();
        cy.visit('/');
    });

    it('can navigate to the first resident page', () => {
        cy.get('[data-testid=view-callback-list_button]').click();
        cy.wait(['@callbacksList', '@callHandlers']);
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.wait(['@resident3', '@resident3helpRequests', '@resident3caseNotes']);
        cy.get('[data-testid=resident-name_header]').should('contain', 'Cydney Nader');
    });
});
