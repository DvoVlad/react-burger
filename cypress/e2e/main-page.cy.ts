describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1920, 1000);
    cy.visit('http://localhost:3000/');
    /* Тест модалки ингредиента */
    cy.get('[data-test="bun"]').eq(0).click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal-ingredient-name"]').contains('Краторная булка N-200i');
    cy.get('[data-test="modal-close-button"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
    /* Тест модалки ингредиента конец */
    /* Тест проверка перетаскивания булки */ 
    cy.get('[data-test="bun"]').eq(0).trigger('dragstart');
    cy.get('[data-test="bun-constructor"]').trigger('drop');
    cy.get('[data-test="bun-constructor-added"]').contains('Краторная булка N-200i');
    /* Тест проверка перетаскивания конец */
    /* Тест проверка перетаскивания ингредиенты */
    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="main-constructor-item"]').eq(0).should('exist').contains('Соус Spicy-X');
    cy.get('[data-test="main-constructor-item"]').eq(1).should('exist').contains('Соус Spicy-X');
    cy.get('[data-test="main-constructor-item"]').eq(2).should('exist').contains('Соус Spicy-X');
    /* Тест проверка перетаскивания ингредиенты конец*/
    /* Тест проверка перетаскивания начинки */
    cy.get('[data-test="main"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="main-constructor-item"]').eq(3).should('exist').contains('Биокотлета из марсианской Магнолии');
    /* Тест проверка перетаскивания начинки конец */
  })
})