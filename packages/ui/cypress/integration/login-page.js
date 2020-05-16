const accessKeyId = "THE_ACCESS_KEY_ID";
const secretAccessKey = "THE_SECRET_ACCESS_KEY";

describe("should display of sessionStorage empty", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clearLocalStorage();
  });

  it("should show access-key-id input field", () => {
    cy.get('[data-test-id="access-key-id-input"]');
  });
  it("should show secret-access-key input field", () => {
    cy.get('[data-test-id="secret-access-key-input"]');
  });
  it("should set credentials to sessionStorage if login button clicked", () => {
    cy.get('[data-test-id="access-key-id-input"]')
      .type(accessKeyId)
      .trigger("change");
    cy.get('[data-test-id="secret-access-key-input"]')
      .type(secretAccessKey)
      .trigger("change");
    cy.get('[data-test-id="login-button"]')
      .click()
      .should(() => {
        expect(localStorage.getItem("access-key-id")).to.eq(accessKeyId);
        expect(localStorage.getItem("secret-access-key")).to.eq(
          secretAccessKey
        );
      });
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });
});

describe("should not display is session is set", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    localStorage.setItem("access-key-id", accessKeyId);
    localStorage.setItem("secret-access-key", secretAccessKey);
  });

  it("should hide access-key-id input field", () => {
    cy.get('[data-test-id="access-key-id-input"]').should("not.exist");
  });
  it("should hide secret-access-key input field", () => {
    cy.get('[data-test-id="secret-access-key-input"]').should("not.exist");
  });
});
