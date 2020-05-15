const apiKey = "THE_KEY";

describe("key not set", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
  });

  it("should show key input field", () => {
    cy.get('[data-test-id="api-key-input"]');
  });
  it("should set key to localstorage if input blurs", () => {
    cy.get('[data-test-id="api-key-input"]')
      .type(apiKey)
      .trigger("change")
      .blur()
      .should(() => {
        expect(localStorage.getItem("api-key")).to.eq(apiKey);
      });
  });
});
describe("key is set", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
    localStorage.setItem("api-key", apiKey);
  });
  it("should hide key input field", () => {
    cy.get('[data-test-id="api-key-input"]').should("not.exist");
  });
});
