beforeEach(() => {
    cy.login();
    cy.setIntercepts();
    cy.visit(`http://localhost:3000/dashboard`);
    cy.get('[data-testid=view-callback-list_button]').click();
    cy.get('[data-testid=callbacks-list-view_link-0]').click({ force: true });
    cy.get('[data-testid=add-support-button]').click({ force: true });
});

context('When adding new cev help request', () => {
    it('it display cev help needs form', () => {
        cy.get('[data-testid=cev-help-needs]').should('not.exist');
        cy.get('input#cev').click({ force: true });
        cy.get('[data-testid=cev-help-needs]').should('be.visible');
    })
});

context('When adding other type of help request', () => {
    it('it does not display the cev help needs form', () => {
        cy.get('input#contact-tracing').click({ force: true });
        cy.get('[data-testid=cev-help-needs]').should('not.exist');

        cy.get('input#welfare-call').click({ force: true });
        cy.get('[data-testid=cev-help-needs]').should('not.exist');

        cy.get('input#help-request').click({ force: true });
        cy.get('[data-testid=cev-help-needs]').should('not.exist');
    })
});

context('When required fields are not filled in at first', () => {
    it('it displays validation error', () => {

      cy.get('input#cev').click({ force: true });

      cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
      cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
      cy.get('[data-testid=callback-form-update_button]').click({ force: true });

      cy.get('[data-testid=callback-form-validation-error]').should('be.visible');

      cy.url().should('match', /\/add-support/);
    });
});

context('When adding new cev help request', () => {
    it('it display cev help needs form', () => {
        cy.get('input#cev').click({ force: true });
        cy.get('[data-testid=cev-help-needs] > :nth-child(3) > .govuk-checkboxes__input').click({ force: true });
        cy.get('[data-testid=call-type-no-radio-button]').click({ force: true });
        cy.get('[data-testid=followup-required-radio-button]').first().click({ force: true });
        cy.get('[data-testid=callback-form-update_button]').click({ force: true });
        cy.get('[data-testid=callback-form-validation-error]').should('not.exist');
        cy.url().should('match', /\/helpcase-profile\/\d+$/);

    })
});
