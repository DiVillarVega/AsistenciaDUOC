import { mostrarEjemplosDeMensajes, showAlertDUOC, showToast } from './../../tools/message-routines';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
  ]
})
export class MisdatosComponent {

  usuario = new Usuario();
  repeticionPassword= '';
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(private authService: AuthService, private bd: DataBaseService) { 
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario)=>{
      this.usuario = usuario? usuario: new Usuario();
      this.repeticionPassword = usuario? usuario.password: '';
  });
  }

  validarCampo(nombreCampo: string, valor: string) {
    if(valor.trim() === ''){
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async actualizarPerfil() {
    if(!this.validarCampo('Nombre', this.usuario.nombre)) return;
    if(!this.validarCampo('Apellido', this.usuario.apellido)) return;
    if(!this.validarCampo('Correo', this.usuario.correo)) return;
    if(!this.validarCampo('Pregunta secreta', this.usuario.preguntaSecreta)) return;
    if(!this.validarCampo('Respuesta secreta', this.usuario.respuestaSecreta)) return;
    if(!this.validarCampo('Contraseña', this.usuario.password)) return;
    if(this.usuario.password !== this.repeticionPassword){
      showAlertDUOC('Las contraseñas escritas deben ser iguales.');
      return;
    }
    await this.bd.guardarUsuario(this.usuario);
    this.authService.guardarUsuarioAutenticado(this.usuario);
    showToast('Sus datos fueron actualizados correctamente.');
  }


  logout() {
    this.authService.logout();
  }

}
