beforeEach(() => {
    cy.login();
    cy.setIntercepts();
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

    it('displays a call history', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=call-history-entry]').should('have.length', 7);
        cy.get('[data-testid=call-history-entry]').first().should('contain', "2021-01-26 15:12 by Bart Simpson");
        cy.get('[data-testid=call-history-entry]').first().should('contain', "outbound Welfare: Wrong number");
    });
});
