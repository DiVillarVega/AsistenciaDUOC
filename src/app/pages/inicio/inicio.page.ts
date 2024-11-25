
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonSegment, IonSegmentButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { gridOutline, homeOutline, pencilOutline, schoolOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CodigoqrComponent, MiclaseComponent, ForoComponent, MisdatosComponent,
            IonIcon, IonButton, IonSegmentButton, IonSegment, IonFooter, IonContent, 
            IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, TranslateModule, UsuariosComponent]
})
export class InicioPage {

  public selectedComponent = 'codigoqr';
  usuarioAutenticado: Usuario | null = null; // Variable para el usuario autenticado

  onQrScanSuccess() {
    this.selectedComponent = 'miclase';
  }

  constructor(private authService: AuthService) { 
    addIcons({ homeOutline, schoolOutline, pencilOutline, gridOutline });

    this.authService.usuarioAutenticado.subscribe(usuario => {
      this.usuarioAutenticado = usuario;
    });
    // Inicializar selectedComponent basado en el rol del usuario
    if (this.usuarioAutenticado?.cuenta === 'admin') {
      this.selectedComponent = 'usuarios';
    } else {
      this.selectedComponent = 'codigoqr';
    }

  }

  segmentChange($event: any){
    this.selectedComponent = $event.detail.value; 
  }

    // Método para verificar si el usuario autenticado es 'admin'
  isAdmin(): boolean {
    return this.usuarioAutenticado?.cuenta === 'admin'; // Asegúrate de que 'cuenta' sea la propiedad correcta
  }

}
