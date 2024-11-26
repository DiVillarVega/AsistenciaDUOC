describe('Verificar mi aplicación', () => {

  beforeEach(() =>{
    cy.viewport(435, 865);
  })

  it('verificar login con credenciales incorrectas', () => {
    cy.intercept('GET', '/inicio', { statusCode: 404 });
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').invoke('val', 'cuenta-inexistente');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc');
        cy.get('#cuenta').should('contain.text', 'Cuenta')
      });
    });
  });

  it('verificar login con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').type('atorres');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc');
        cy.get('#misdatos').click();
        cy.get('#salir').click();
      });
    });
  });

  it('verificar agregar publicación', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').type('atorres');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        // cy.get('ion-title').should('contain.text', 'Sistema de Asistencia Duoc');
        cy.get('#foro').click();
        cy.get('#titulo').type('Publicación de prueba');
        cy.get('#contenido').type('Contenido de prueba');
        cy.get('#guardar').click();
      });
    });
  });






});