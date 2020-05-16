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
