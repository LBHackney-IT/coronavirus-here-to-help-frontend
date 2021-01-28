beforeEach(() => {
    cy.login();
    cy.setIntercepts()
    cy.visit(`http://localhost:3000/dashboard`);
});

describe('As a call handler, I want to search for a resident', () => {
    context('When you search by first name', () => {
        it('displays an existing resident on the results page', () => {
            cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
            cy.get('input[name="firstName"]').type('Cydney');
            cy.get('.govuk-button').click();
            cy.get('[data-testid=residents-search-table]')
                .find('tbody > tr')
                .its('length')
                .should('be.gte', 1);
            cy.get('[data-testid=residents-search-table]')
                .contains('td', 'Cydney')
                .should('be.visible');
            cy.contains('Displaying 1 record(s)');
        });

        it('does not display anything for a non existing resident on the results page', () => {
            cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
            cy.get('input[name="firstName"]').type('rsdkjasbsf');
            cy.get('.govuk-button').click();
            cy.contains('Displaying 0 record(s)');
        });
    });

    context('When you search by last name', () => {
        it('displays an existing resident on the results page', () => {
            cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
            cy.get('input[name="lastName"]').type('Nader');
            cy.get('.govuk-button').click();
            cy.get('[data-testid=residents-search-table]')
                .find('tbody > tr')
                .its('length')
                .should('be.gte', 1);
            cy.get('[data-testid=residents-search-table]')
                .contains('td', 'Cydney Nader')
                .should('be.visible');
            cy.contains('Displaying 1 record(s)');
        });
        it('does not display anything for a non existing resident on the results page', () => {
            cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
            cy.get('input[name="lastName"]').type('rsdkjasbsf');
            cy.get('.govuk-button').click();
            cy.contains('Displaying 0 record(s)');
        });
    });

    context('When you search by  postcode', () => {
        it('displays an existing resident on the results page', () => {
            cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
            cy.get('input[name="postcode"]').type('EW6');
            cy.get('.govuk-button').click();
            cy.get('[data-testid=residents-search-table]')
                .find('tbody > tr')
                .its('length')
                .should('be.gte', 1);
            cy.get('[data-testid=residents-search-table]')
                .contains('td', 'Cydney Nader')
                .should('be.visible');
            cy.contains('Displaying 1 record(s)');
        });
        it('does not display anything for a non existing resident on the results page', () => {
            it('does not display anything for a non existing resident on the results page', () => {
                cy.get('[data-testid=search-for-residents_button]').contains('Go').click();
                cy.get('input[name="postcode"]').type('rsdkjasbsf');
                cy.get('.govuk-button').click();
                cy.contains('Displaying 0 record(s)');
            });
        });
    });
    context('searching without any search options', () => {
        it('validation errors and does not redirect you', () => {});
    });

    context('On the Resident lookup page', () => {
        it('User clicks "Search" and is redirected to a list of residents matching the search', () => {
            cy.contains('Search').click();
            cy.on('url:changed', (newUrl) => {
                expect(newUrl).to.contain('residents-list');
            });
        });
    });
});

export {};
