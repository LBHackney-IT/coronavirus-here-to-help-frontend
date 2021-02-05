import jwt from 'jsonwebtoken';

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
});

export const defaultUser = {
    email: 'test@hackney.gov.uk',
    name: 'Test User',
    groups: ['development-team-staging']
};

Cypress.Commands.add('login', (userData) => {
    if (userData === void 0) {
        userData = defaultUser;
    }
    const jwtSecret = Cypress.env('HACKNEY_JWT_SECRET');
    const cookieName = Cypress.env('NEXT_PUBLIC_HACKNEY_COOKIE_NAME');

    console.error(cookieName);
    console.error(jwtSecret);
    console.error('Yup');

    const token = jwt.sign(userData, jwtSecret);

    cy.setCookie(cookieName, token);
    cy.wrap(defaultUser).as('defaultUser');
    cy.wrap(userData).as('user');
});

Cypress.Commands.add('setIntercepts', () => {
    cy.intercept('GET', '/api/proxy/v3/help-requests/callbacks', {
        fixture: 'callbacks'
    });

    cy.intercept('GET', `/api/proxy/v4/residents/3/help-requests/12`, {
        fixture: 'residents/3/helpRequests/12'
    });
    cy.intercept('GET', `/api/proxy/v4/residents/3/help-requests`, {
        fixture: 'residents/3/helpRequests'
    });

    cy.intercept('PATCH', `/api/proxy/v3/help-requests/12`, {
        statusCode: 201
    });

    cy.intercept(
        { pathname: '/api/proxy/v4/residents', query: { FirstName: 'Cydney' } },
        { fixture: 'searchResult' }
    );
    cy.intercept(
        { pathname: '/api/proxy/v4/residents', query: { LastName: 'Nader' } },
        { fixture: 'searchResult' }
    );
    cy.intercept(
        { pathname: '/api/proxy/v4/residents', query: { Postcode: 'EW6' } },
        { fixture: 'searchResult' }
    );

    cy.intercept({ pathname: '/api/proxy/v4/residents' }, { statusCode: 200, body: [] });

    cy.intercept('POST', '/api/proxy/v4/residents/3/help-requests', {
        statusCode: 201,
        body: { Id: 1 }
    });

    cy.intercept('GET', `/api/proxy/v4/residents/3`, {
        fixture: 'residents/3/resident'
    });

    cy.intercept('PATCH', `/api/proxy/v4/residents/3`, {
        statusCode: 201
    });

    cy.intercept('GET', `/api/proxy/addresses/*`, {
        fixture: 'addresses'
    });
});
