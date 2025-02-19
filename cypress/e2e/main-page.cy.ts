import { mainModule } from "process";
import { TEST_URL } from "../const-urls/urls";

const testObjects = {
  bun: '[data-test="bun"]',
  sauce: '[data-test="sauce"]',
  main: '[data-test="main"]',
  modal: '[data-test="modal"]',
  modalClose: '[data-test="modal-close-button"]',
  bunConstructor: '[data-test="bun-constructor"]',
  bunConstructorAdded: '[data-test="bun-constructor-added"]',
  mainConstructor: '[data-test="main-constructor"]',
  mainConstructorItem: '[data-test="main-constructor-item"]',
  modalIngredientName:'[data-test="modal-ingredient-name"]',
  modalCalories: '[data-test="modal-calories"]',
  modalProteins: '[data-test="modal-proteins"]',
  modalFat: '[data-test="modal-fat"]',
  modalCarbohydrates: '[data-test="modal-carbohydrates"]'
};

describe('template spec', () => {
  beforeEach(() => {
    window.localStorage.setItem('accessToken', 'testtoken');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' })
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' })
    cy.viewport(1920, 1000);
    cy.visit(TEST_URL);
    cy.get(testObjects.bun).as('bun');
    cy.get(testObjects.sauce).as('sauce');
    cy.get(testObjects.main).as('main');
  })
  it('Test modal', () => {
    /* Тест модалки ингредиента */
    cy.get('@bun').eq(0).click();
    cy.get(testObjects.modal).as('modal');
    cy.get(testObjects.modalClose).as('modal-close-button');
    cy.get('@modal').should('exist');

    cy.get(testObjects.modalIngredientName).as('modal-ingredient-name');
    cy.get(testObjects.modalCalories).as('modal-calories');
    cy.get(testObjects.modalProteins).as('modal-proteins');
    cy.get(testObjects.modalFat).as('modal-fat');
    cy.get(testObjects.modalCarbohydrates).as('modal-carbohydrates');

    cy.get('@modal-ingredient-name').contains('Краторная булка N-200i');
    cy.get('@modal-calories').contains("420");
    cy.get('@modal-proteins').contains("80");
    cy.get('@modal-fat').contains("24");
    cy.get('@modal-carbohydrates').contains("53");
    cy.get('@modal-close-button').click();
    cy.get('@modal').should('not.exist');

    cy.get('@bun').eq(1).click();
    cy.get('@modal').should('exist');
    cy.get('@modal-ingredient-name').contains('Флюоресцентная булка R2-D3');
    cy.get('@modal-calories').contains("643");
    cy.get('@modal-proteins').contains("44");
    cy.get('@modal-fat').contains("26");
    cy.get('@modal-carbohydrates').contains("85");
    cy.get('@modal-close-button').click();
    cy.get('@modal').should('not.exist');
    /* Тест модалки ингредиента конец */
  });
  it('Drag and drop and delete', () => {
    /* Тест проверка перетаскивания булки */ 
    cy.get('@bun').eq(0).trigger('dragstart');
    cy.get(testObjects.bunConstructor).trigger('drop');
    cy.get(testObjects.bunConstructorAdded).as('bun-constructor-added');
    cy.get('@bun-constructor-added').contains('Краторная булка N-200i');
    
    cy.get('@bun').eq(1).trigger('dragstart');
    cy.get('@bun-constructor-added').trigger('drop');
    cy.get('@bun-constructor-added').contains('Флюоресцентная булка R2-D3');
    /* Тест проверка перетаскивания конец */
    /* Тест проверка перетаскивания ингредиенты */
    cy.get(testObjects.mainConstructor).as("main-constructor");
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get(testObjects.mainConstructorItem).as('main-constructor-item');
    cy.get('@main-constructor-item').eq(0).should('exist').contains('Соус Spicy-X');
    cy.get('@main-constructor-item').eq(1).should('exist').contains('Соус Spicy-X');
    cy.get('@main-constructor-item').eq(2).should('exist').contains('Соус Spicy-X');
    /* Тест проверка перетаскивания ингредиенты конец*/
    /* Тест проверка перетаскивания начинки и проверка удаления*/
    cy.get('@main').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get('@main-constructor-item').eq(3).should('exist').contains('Биокотлета из марсианской Магнолии');
    cy.get('@main-constructor-item').eq(3).find('.constructor-element__action').click();
    cy.get('@main-constructor-item').eq(3).should('not.exist');
    cy.get('@main-constructor-item').eq(2).find('.constructor-element__action').click();
    cy.get('@main-constructor-item').eq(2).should('not.exist');
    cy.get('@main-constructor-item').eq(0).should('exist');
    cy.get('@main-constructor-item').eq(1).should('exist');
    /* Тест проверка перетаскивания начинки конец */
  });
  it('Test order', () => {
    cy.get('@bun').eq(0).trigger('dragstart');
    cy.get(testObjects.bunConstructor).trigger('drop');

    cy.get(testObjects.mainConstructor).as("main-constructor");
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');
    cy.get('@sauce').eq(0).trigger('dragstart');
    cy.get('@main-constructor').trigger('drop');

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' })
    cy.get('[data-test="submit"]').click();
    cy.get(testObjects.modal).should('exist');
    cy.get('[data-test="order-number"]').contains("68333");
    cy.get(testObjects.modalClose).click();
    cy.get(testObjects.modal).should('not.exist');
  })
  after(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  })
})