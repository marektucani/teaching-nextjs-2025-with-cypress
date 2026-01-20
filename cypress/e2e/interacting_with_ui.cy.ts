

describe('Album Catalog - Interactions', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('looks for songs when searching via search bar', () => {
        cy.get('[data-cy="search-input"]').type('song');
        cy.get('[data-cy="search-button"]').click();
        cy.url().should('include', '/search');
        cy.url().should('include', 'q=song');
        cy.get('[data-cy="songs-header"]').should('be.visible');
        cy.get('[data-cy="songs-header"]').should('contain.text', 'Songs');
    });

    it('navigates to the first album detail', () => {
        cy.get('[data-cy="album-card"]').first().within(() => {
            cy.get('[data-cy="album-detail-link"]').click();
        });
        cy.url().should('include', '/album/');
    });

    it('navigates to home page after clicking on Spotify logo', () => {
        cy.get('[data-cy="search-input"]').type('test');
        cy.get('[data-cy="search-button"]').click();
        cy.url().should('include', '/search');
        cy.get('[data-cy="spotify-logo"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
        cy.get('[data-cy="title"]').should('be.visible');
    });

    it('search input accepts user input and maintains state', () => {
        const searchTerm = 'metallica';
        cy.get('[data-cy="search-input"]').type(searchTerm);
        cy.get('[data-cy="search-input"]').should('have.value', searchTerm);
    });

    it('displays search results for albums, songs and authors', () => {
        cy.get('[data-cy="search-input"]').type('a');
        cy.get('[data-cy="search-button"]').click();
        cy.get('[data-cy="songs-header"]').should('be.visible');
        cy.get('[data-cy="albums-header"]').should('be.visible');
        cy.get('[data-cy="authors-header"]').should('be.visible');
    });

    it('navigates to author page when clicking author link', () => {
        cy.get('[data-cy="album-card"]').first().within(() => {
            cy.get('[data-cy="album-author-link"]').click();
        });
        cy.url().should('include', '/author/');
    });

    it('maintains search input value when navigating back from search', () => {
        const searchTerm = 'test search';
        cy.get('[data-cy="search-input"]').type(searchTerm);
        cy.get('[data-cy="search-button"]').click();
        cy.get('[data-cy="spotify-logo"]').click();
        cy.get('[data-cy="search-input"]').should('have.value', searchTerm);
    });

    it('navigate to non existent album', () => {
        cy.visit('/album/99999');
        cy.contains('Album not foundd').should('be.visible');
    });

});