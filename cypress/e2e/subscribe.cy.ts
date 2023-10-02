describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").type("jack@email.com");
    cy.getByData("submit-button").click();

    cy.getByData("success-message").should("exist").contains("jack@email.com");
  });

  it("displays an error message if the email is invalid", () => {
    cy.getByData("email-input").type("jack");
    cy.getByData("submit-button").click();

    cy.getByData("success-message").should("not.exist");
  });

  it("displays an error message if the email is already exists", () => {
    cy.getByData("email-input").type("john@example.com");
    cy.getByData("submit-button").click();

    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists");
  });
});
