beforeEach(() => {
    cy.login();

    cy.intercept('GET', `/api/proxy/v4/residents/3/help-requests`, {
        fixture: 'helpRequests/resident3'
    });

    cy.intercept('GET', `/api/proxy/v4/residents/3`, {
        fixture: 'residents/3'
    });

    cy.visit(`http://localhost:3000/dashboard`);
});

context('When you view a helpcase profile', () => {
    it('it allows you to naviagte to the add support page', () => {
        cy.visit(`http://localhost:3000/callback-list`);
        cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
        cy.url().should('match', /\/helpcase-profile\/\d+$/);
        cy.getBySel('add-support-button').click({ force: true });
        cy.url().should('match', /\/add-support/);
    });
});

export {};
