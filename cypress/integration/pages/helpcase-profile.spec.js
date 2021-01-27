beforeEach(() => {
    cy.login();

    cy.intercept('GET', `/api/proxy/v4/residents/3/help-requests`, {
        fixture: 'helpRequests/resident3'
    });

    cy.intercept('GET', `/api/proxy/v4/residents/3`, {
        fixture: 'residents/3'
    });

    cy.visit('/');
});

describe('View helpcase profile page', () => {
    it('displays resident key information', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=resident-name_header]').should('contain', 'Cydney Nader');
        cy.get('[data-testid=key-information_phone-number]').should('contain', '02075333654');
        cy.get('[data-testid=key-information_mobile-phone-number]').should(
            'contain',
            '07416238354'
        );
        cy.get('[data-testid=key-information_resident-address]').should('contain', 'Flat 2');
        cy.get('[data-testid=key-information_resident-address]').should(
            'contain',
            '8627 Satterfield Parkway'
        );
        cy.get('[data-testid=key-information_resident-address]').should('contain', 'EW6 5WD');
    });

    it('displays support requested', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=support-requested-table_row]').should('have.length', 5);
        cy.get('[data-testid=support-requested-table-help-needed]').first().should('contain', "Help Request");
        cy.get('[data-testid=support-requested-table-calls-count]').first().should('contain', "2");

    });
});
