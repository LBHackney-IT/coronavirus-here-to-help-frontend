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

    it('displays support requested and support recieved', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=support-requested-table_row]').should('have.length', 4);
        cy.get('[data-testid=support-requested-table-help-needed]').first().should('contain', "Contact Tracing");
        cy.get('[data-testid=support-requested-table-calls-count]').first().should('contain', "1");

        cy.get('[data-testid=support-received-tab]').click({force: true})
        cy.get('[data-testid=support-received-table_row]').should('have.length', 1);
        cy.get('[data-testid=support-received-table-help-needed]').first().should('contain', "Welfare Call");
        cy.get('[data-testid=support-received-table-calls-count]').first().should('contain', "1");
    });

    it('displays a call history', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=call-history-entry]').should('have.length', 9);
        cy.get('[data-testid=call-history-entry]').first().should('contain', "2021-01-26 15:12 by Bart Simpson");
        cy.get('[data-testid=call-history-entry]').first().should('contain', "outbound Welfare Call: Wrong number");
    });
    it.only('displays JSON and string case notes ordered by date', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=case-note-entry]').should('have.length', 4);
        cy.get('[data-testid=case-note-entry]').first().scrollIntoView()
        cy.get('[data-testid=case-note-entry]').first().should('contain', "by Professor Umbridge");
        cy.get('[data-testid=case-note-entry]').first().should('contain', "2020-09-10");
        cy.get('[data-testid=case-note-entry]').first().should('contain', "Contact Tracing:");
        cy.get('[data-testid=case-note-entry]').first().should('contain', "CREATED");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "by Ronald Weasley");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "2020-09-06");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "Welfare Call: *** CREATED ***");
    })
    it('displays filtered case notes ordered by date', () => {
        cy.visit(`http://localhost:3000/helpcase-profile/3`);
        cy.get('[data-testid=select-dropdown]').select("Welfare Call", {force: true})
        cy.get('[data-testid=case-note-entry]').should('have.length', 2);
        cy.get('[data-testid=case-note-entry]').first().scrollIntoView()
        cy.get('[data-testid=case-note-entry]').first().should('contain', "by Harry Potter");
        cy.get('[data-testid=case-note-entry]').first().should('contain', "2020-09-08");
        cy.get('[data-testid=case-note-entry]').first().should('contain', "Welfare Call: *** CREATED ***");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "by Ronald Weasley");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "2020-09-06");
        cy.get('[data-testid=case-note-entry]').last().should('contain', "Welfare Call: *** CREATED ***");
    })
});
