describe('Verificar mi aplicación', () => {
  
  it('verificar login con credenciales correctas', () => {
    cy.intercept('GET', '/inicio', { statusCode: 404 });
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').invoke('val', 'jperez');
      cy.get('#password').invoke('val', '5678');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc');
        cy.get('#barra').should('contain.text', 'foro');
        cy.get('#salir').click();
      });
    });
  });


  it('verificar login con credenciales incorrectas', () => {
    cy.intercept('GET', '/inicio', { statusCode: 404 });
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').invoke('val', 'cuenta-inexistente');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc');
        cy.get('#saludo').should('contain.text', 'Bienvenido(a) Ana Torres')
      });
    });
  });



});