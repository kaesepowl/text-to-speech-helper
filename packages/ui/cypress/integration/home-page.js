describe("list of already processed texts", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/processed",
      status: 200,
      response: [
        {
          id: "abcd1234".repeat(4),
          text: "Hallo Paul",
        },
      ],
    });
    localStorage.setItem("access-key-id", "A");
    localStorage.setItem("secret-access-key", "S");
    cy.visit("http://localhost:3000");
  });

  it("should find processed text", () => {
    cy.contains("Hallo Paul");
  });
  it("should find audio element", () => {
    cy.get(
      `[src="http://localhost:8080/processed/${"abcd1234".repeat(4)}/audio"]`
    );
  });
});

describe("list of already processed texts", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/processed",
      status: 201,
      response: {
        id: "ef056789".repeat(4),
      },
    }).as("addAudio");
    localStorage.setItem("access-key-id", "A");
    localStorage.setItem("secret-access-key", "S");
    cy.visit("http://localhost:3000");
  });

  it("should find add text input", () => {
    cy.get('[data-test-id="add-text-input"]');
  });
  it("should find add text button", () => {
    cy.get('[data-test-id="add-text-button"]');
  });
  it("should add new text", () => {
    cy.get('[data-test-id="add-text-input"]')
      .type("Cypress Text")
      .trigger("change");
    cy.get('[data-test-id="add-text-button"]').click();
    cy.wait("@addAudio");
    cy.contains("Cypress Text");
    cy.get(
      `[src="http://localhost:8080/processed/${"ef056789".repeat(4)}/audio"]`
    );
    cy.get('[data-test-id="add-text-input"]').should("have.value", "");
  });
});
