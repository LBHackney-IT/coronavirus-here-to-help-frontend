beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/');
    cy.get('[data-testid=admin_button]').click();
    cy.get('[data-testid=manage-callhandlers_button]').click();
    cy.get('[data-testid=add-call-handler]').click();
});

describe('As a manager I can add a call handler', () => {
    context('The screen only presents add functionality', () => {
        it('Shows the correct label text and buttons for Add functionality', () => {
            cy.get('[data-testid=addedit-header-container]').should(
                'contain',
                'Add a new call handler'
            );
            cy.get('[data-testid=addedit-header-container]').should('not.contain', 'Edit details');
            cy.get('[data-testid=remove-callhandler-button]').should('not.exist');
        });
    });

    context('Creating a new call handler', () => {
        it('Shows validation errors', () => {
            cy.get('[data-testid=name-error]').should('not.exist');
            cy.get('[data-testid=add-callhandler-form-update-button]').click({ force: true });
            cy.get('[data-testid=name-error]').should('contain', 'Error');
        });

        it('Saves the call handler if details are filled in correctly', () => {
            cy.get('[data-testid=callhandlers-table_row]').should(
                'not.contain',
                'New call handler'
            );
            cy.get('[data-testid=callhandler-name-input]').type('New call handler');
            cy.get('[data-testid=add-callhandler-form-update-button]').click({ force: true });
            cy.url().should('match', /\/manage-callhandlers$/);
        });
    });
});
