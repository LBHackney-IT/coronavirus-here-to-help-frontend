import jwt from 'jsonwebtoken';

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
});

export const defaultUser = {
    email: 'test@hackney.gov.uk',
    name: 'Test User',
    groups: ['development-team-staging'],
};

Cypress.Commands.add('login', (userData) => {
    if(userData === void 0) { userData = defaultUser; }
    const jwtSecret = Cypress.env('HACKNEY_JWT_SECRET');
    const cookieName = Cypress.env('RUNTIME_HACKNEY_COOKIE_NAME');

    console.error(cookieName);
    console.error(jwtSecret);
    console.error("Yup");

    const token = jwt.sign(userData, jwtSecret);

    cy.setCookie(cookieName, token);
    cy.wrap(defaultUser).as('defaultUser');
    cy.wrap(userData).as('user');
});