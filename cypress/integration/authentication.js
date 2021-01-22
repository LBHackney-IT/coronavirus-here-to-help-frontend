describe('authentication', () => {
    context('when logged out', () => {
        it('protected pages redirect to login', () => {
            cy.visit('/dashboard?test=param');
            cy.url().should(
                'eq',
                `${
                    Cypress.config().baseUrl
                }/login?redirect=%2Fdashboard%3Ftest%3Dparam`
            );
        });
    });
});