describe('Visits zochova.sk and finds kontact of school', () => {
    beforeEach(() => {
        cy.visit('https://zochova.sk/');

    });

    it('finds kontact page', () => {
        cy.get('div[id="hamburger"]').click();
        cy.contains('Kontakt').click();
        cy.url().should('include', '/kontakt');
        cy.contains('Zochova 9').should('be.visible');
    });
});