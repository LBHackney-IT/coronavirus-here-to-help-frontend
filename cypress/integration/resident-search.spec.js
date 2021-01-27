beforeEach(() => {
    cy.login();

    cy.intercept('/api/proxy/v4/residents?', (req) => {
        req.reply((res) => {
            if (req.url.includes('Cydney') || req.url.includes('Nade')) {
                res.send({ fixture: 'searchByName' });
            } else {
                res.send({ statusCode: 200, body: [] });
            }
        });
    });

    cy.visit(`http://localhost:3000/dashboard`);
});

describe('As a call handler, I want to search for a resident', () => {
    context('When you search by first name', () => {
        it('displays an existing resident on the results page', () => {
            cy.visit(`http://localhost:3000/resident-search`);
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
            cy.visit(`http://localhost:3000/resident-search`);
            cy.get('input[name="firstName"]').type('rsdkjasbsf');
            cy.get('.govuk-button').click();
            cy.contains('Displaying 0 record(s)');
        });
    });

    context('When you search by last name', () => {
        it('displays an existing resident on the results page', () => {
            cy.visit(`http://localhost:3000/resident-search`);
            cy.get('input[name="lastName"]').type('Nade');
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
            cy.visit(`http://localhost:3000/resident-search`);
            cy.get('input[name="lastName"]').type('rsdkjasbsf');
            cy.get('.govuk-button').click();
            cy.contains('Displaying 0 record(s)');
        });
    });
    // context("When you search by  postcode", () => {
    //     it("displays an existing resident on the results page", () => {
    //     })
    //     it("does not display anything for a non existing resident on the results page", () => {
    //     })
    // })
    // context("searching without any search options", () => {
    //     it("validation errors and does not redirect you", () => {
    //     })
    // })

    context('From the start page', () => {
        it('User clicks the "Go" button to get to the Resident lookup page', () => {
            cy.get('a').contains('Go').eq(0).click();
        });
    });

    context('On the Resident lookup page', () => {
        it('User enters a postcode in the "Postcode" input field', () => {
            cy.visit(`http://localhost:3000/resident-search`);
            cy.get('input[name="postcode"]').type('E7 0DE');
        });

        it('User clicks "Search" and is redirected to a list of residents matching the search', () => {
            cy.contains('Search').click();
            cy.on('url:changed', (newUrl) => {
                expect(newUrl).to.contain('residents-list');
            });
        });
    });
});

export {};
