describe('template spec', () => {
  beforeEach(() => {
    window.localStorage.setItem('accessToken', 'testtoken');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' })
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' })
    cy.viewport(1920, 1000);
    cy.visit('http://localhost:3000/');
  })
  it('Test modal', () => {
    /* Тест модалки ингредиента */
    cy.get('[data-test="bun"]').eq(0).click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal-ingredient-name"]').contains('Краторная булка N-200i');
    cy.get('[data-test="modal-calories"]').contains("420");
    cy.get('[data-test="modal-proteins"]').contains("80");
    cy.get('[data-test="modal-fat"]').contains("24");
    cy.get('[data-test="modal-carbohydrates"]').contains("53");
    cy.get('[data-test="modal-close-button"]').click();
    cy.get('[data-test="modal"]').should('not.exist');

    cy.get('[data-test="bun"]').eq(1).click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal-ingredient-name"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-test="modal-calories"]').contains("643");
    cy.get('[data-test="modal-proteins"]').contains("44");
    cy.get('[data-test="modal-fat"]').contains("26");
    cy.get('[data-test="modal-carbohydrates"]').contains("85");
    cy.get('[data-test="modal-close-button"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
    /* Тест модалки ингредиента конец */
  });
  it('Drag and drop and delete', () => {
    /* Тест проверка перетаскивания булки */ 
    cy.get('[data-test="bun"]').eq(0).trigger('dragstart');
    cy.get('[data-test="bun-constructor"]').trigger('drop');
    cy.get('[data-test="bun-constructor-added"]').contains('Краторная булка N-200i');
    
    cy.get('[data-test="bun"]').eq(1).trigger('dragstart');
    cy.get('[data-test="bun-constructor-added"]').trigger('drop');
    cy.get('[data-test="bun-constructor-added"]').contains('Флюоресцентная булка R2-D3');
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
    /* Тест проверка перетаскивания начинки и проверка удаления*/
    cy.get('[data-test="main"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="main-constructor-item"]').eq(3).should('exist').contains('Биокотлета из марсианской Магнолии');
    cy.get('[data-test="main-constructor-item"]').eq(3).find('.constructor-element__action').click();
    cy.get('[data-test="main-constructor-item"]').eq(3).should('not.exist');
    cy.get('[data-test="main-constructor-item"]').eq(2).find('.constructor-element__action').click();
    cy.get('[data-test="main-constructor-item"]').eq(2).should('not.exist');
    cy.get('[data-test="main-constructor-item"]').eq(0).should('exist');
    cy.get('[data-test="main-constructor-item"]').eq(1).should('exist');
    /* Тест проверка перетаскивания начинки конец */
  });
  it('Test order', () => {
    cy.get('[data-test="bun"]').eq(0).trigger('dragstart');
    cy.get('[data-test="bun-constructor"]').trigger('drop');

    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');
    cy.get('[data-test="sauce"]').eq(0).trigger('dragstart');
    cy.get('[data-test="main-constructor"]').trigger('drop');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' })
    cy.get('[data-test="submit"]').click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="order-number"]').contains("68333");
    cy.get('[data-test="modal-close-button"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
  })
  after(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  })
})