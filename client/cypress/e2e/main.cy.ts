describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.contains('Упс');
    cy.contains('перейти на страницу авторизации').click();
    cy.get('[id=":r1:"]').type('kaimangeek');
    cy.get('[id=":r3:"]').type('qwerty');
    cy.get('[id=":r5:"]').click();
    cy.url().should('include', '/applications');
    cy.contains('Мои заявления');
  })
})
