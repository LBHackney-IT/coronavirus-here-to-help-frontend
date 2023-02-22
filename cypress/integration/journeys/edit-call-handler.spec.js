beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit('/');
    cy.get('[data-testid=admin_button]').click();
    cy.get('[data-testid=manage-callhandlers_button]').click();
    cy.wait('@callHandlers');
});

describe('As a manager I can edit a call handler', () => {
    context('The screen only presents edit functionality', () => {
        it('Shows the correct label text and buttons for edit functionality', () => {
            cy.get('[data-testid=callhandler-edit_link-0]').click();
            cy.wait('@callHandler1');
            cy.get('[data-testid=addedit-header-container]').should('contain', 'Edit details');
            cy.get('[data-testid=addedit-header-container]').should(
                'not.contain',
                'Add a new call handler'
            );
            cy.get('[data-testid=remove-callhandler-button]').should('exist');
        });
    });

    context('Editing a call handler', () => {
        it('Shows validation errors', () => {
            cy.get('[data-testid=callhandler-edit_link-0]').click();
            cy.wait('@callHandler1');
            cy.get('[data-testid=name-error]').should('not.exist');
            cy.get('[data-testid=callhandler-name-input]').clear();
            cy.get('[data-testid=edit-callhandler-form-update-button]').click({ force: true });
            cy.get('[data-testid=name-error]').should('contain', 'Error');
        });

        // This test doesn't check whether it gets saved correctly, but instead whether
        // the page navigates back to the manage-callhandlers page.
        it('Saves the call handler if details are filled in correctly', () => {
            cy.get('[data-testid=callhandlers-table_row]').should(
                'not.contain',
                'New call handler'
            );
            cy.get('[data-testid=callhandler-edit_link-0]').click();
            cy.wait('@callHandler1');
            cy.get('[data-testid=callhandler-name-input]').clear();
            cy.get('[data-testid=callhandler-name-input]').type('Changed call handler');
            cy.get('[data-testid=edit-callhandler-form-update-button]').click({ force: true });
            cy.url().should('match', /\/manage-callhandlers$/);
        });
    });

    context('Deleting a call handler', () => {
        beforeEach(() => {
            cy.get('[data-testid=callhandler-edit_link-0]').click();
            cy.wait('@callHandler1');
        });

        it('Shows confirmation if delete clicked', () => {
            cy.get('[data-testid=delete-confirm-banner]').should('not.exist');
            cy.get('[data-testid=remove-callhandler-button]').click({ force: true });
            cy.get('[data-testid=delete-confirm-banner]').should('exist');
        });

        it('Hides the banner if no clicked on confirm message', () => {
            cy.get('[data-testid=delete-confirm-banner]').should('not.exist');
            cy.get('[data-testid=remove-callhandler-button]').click({ force: true });
            cy.get('[data-testid=delete-confirm-banner]').should('exist');
            cy.get('[data-testid=delete-callhandler-dont-confirm-button]').click({ force: true });
            cy.get('[data-testid=delete-confirm-banner]').should('not.exist');
        });

        it('Returns to call handler list once confirm delete clicked', () => {
            cy.get('[data-testid=remove-callhandler-button]').click({ force: true });
            cy.get('[data-testid=delete-callhandler-confirm-button]').click({ force: true });
            cy.url().should('match', /\/manage-callhandlers$/);
        });
    });
});
