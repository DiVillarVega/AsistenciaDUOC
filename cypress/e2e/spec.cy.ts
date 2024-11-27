describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

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
        cy.wait(3000);
        cy.contains(`Publicación de prueba`).should('exist');
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
        cy.get('#foro').click()
        cy.get('#eliminar').click();
        cy.wait(3000);
        cy.contains(`Publicación de prueba`).should('not.exist');
        cy.get('#misdatos').click();
        cy.get('#salir').click();
      });
    });
  });

  it('verificar validación de campos misdatos', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {;
      cy.get('#cuenta').type('atorres');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#misdatos').click()

        //VALIDAR NOMBRE
        cy.get('#nombre').invoke('val', ' ');
        cy.get('#nombre').type(' ');
        cy.get('#nombre').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Nombre"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#nombre').type('Anaa');

        //VALIDAR APELLIDO
        cy.get('#apellido').invoke('val', ' ');
        cy.get('#apellido').type(' ');
        cy.get('#apellido').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Apellido"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#apellido').type('Torress');

        //VALIDAR DIRECCION
        cy.get('#direccion').invoke('val', ' ');
        cy.get('#direccion').type(' ');
        cy.get('#direccion').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Direccion"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#direccion').type('Santiagoo');

        //VALIDAR PREGUNTA
        cy.get('#preguntaSecreta').invoke('val', ' ');
        cy.get('#preguntaSecreta').type(' ');
        cy.get('#preguntaSecreta').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Pregunta secreta"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#preguntaSecreta').type('¿Cuál es tu animal favoritoo?');

        //VALIDAR RESPUESTA
        cy.get('#respuestaSecreta').invoke('val', ' ');
        cy.get('#respuestaSecreta').type(' ');
        cy.get('#respuestaSecreta').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Respuesta secreta"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#respuestaSecreta').type('gatoo');

        //VALIDAR CONTRASEÑA
        cy.get('#password1').invoke('val', ' ');
        cy.get('#password1').type(' ');
        cy.get('#password1').click();
        cy.get('#guardar').click();
        cy.contains('Debe ingresar un valor para el campo "Contraseña"').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#password1').type('1234');

        //VALIDAR REPETICION CONTRASEÑA
        cy.get('#password2').invoke('val', ' ');
        cy.get('#password2').type(' ');
        cy.get('#password2').click();
        cy.get('#guardar').click();
        cy.contains('Las contraseñas escritas deben ser iguales').should('exist');
        cy.get('ion-alert button').should('exist').contains('Aceptar').click();
        cy.get('#password2').type('1234');

        cy.get('#guardar').click();
        cy.get('#salir').click();
      });
      cy.get('#cuenta').type('atorres');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#misdatos').click()
        cy.contains(`Anaa`).should('exist');
        cy.wait(3000);
        cy.get('#salir').click();
      });
    });
  });

});