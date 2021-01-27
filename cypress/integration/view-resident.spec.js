describe('view residents to contact', () => {
    beforeEach(() => {
        cy.login();

        cy.intercept('GET', '/api/proxy/v3/help-requests/callbacks', {
            fixture: 'callbacks'
        });
        cy.intercept('GET', `/api/proxy/v4/residents/3/help-requests`, {
            fixture: 'helpRequests/resident3'
        });

        cy.intercept('GET', `/api/proxy/v4/residents/3`, {
            fixture: 'residents/3'
        });

        cy.visit('/');
    });

    //agent first searches to see if the resident already exists
    it('can navigate to the first resident page', () => {
        cy.get('[data-testid=view-callback-list_button]').click();
        cy.get('[data-testid=callbacks-list-view_link-0]').click();
        cy.get('[data-testid=resident-name_header]').should('contain', 'Cydney Nader');
    });
});
