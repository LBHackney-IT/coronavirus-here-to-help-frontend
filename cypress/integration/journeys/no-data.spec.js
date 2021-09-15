beforeEach(() => {
    cy.login();
    cy.visit(`http://localhost:3000/dashboard`);
});

//Search doesn't break
describe('The resident search with no data', () => {
    it('displays an empty list when there are no residents', () => {
        cy.get('[data-testid=search-for-residents_button]').click();
        cy.get('.govuk-button').click();
        cy.get('[data-testid=residents-search-table]').find('tbody > tr').should('have.length', 0);
        cy.get('[data-testid=resident-search-result-count]').should(
            'contain',
            'Displaying 0 record(s)'
        );
    });
});

// Callback list doesn't break
// Filtering is still possible but returns nothing
describe('The callback list with no data', () => {
    it('displays an empty list when there are no callbacks', () => {
        cy.get('[data-testid=view-callback-list_button]').click();
    });
});

// Assign calls doesn't break
//go to assign calls page, assume it will be possible to submit the page but no calls will be assigned

// Add a new resident
// Check their profile is fine / no error when there is no data 
// Filtering case notes is still possible but returns nothing

describe('A new resident profile with no additional data', () => {});
