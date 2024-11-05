import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol,
  IonGrid, IonRow, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { showToast } from 'src/app/tools/message-routines';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonLabel, IonRow, IonGrid, IonCol, IonItem, IonCardSubtitle, IonCardContent, IonLoading,
    IonCard, IonIcon, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonHeader, IonFooter, HeaderComponent]
})
export class PreguntaPage  {
  public pregunta: string = '';
  public inputRespuesta: string = '';
  private correo: string = '';


  constructor(private router: Router, private bd: DataBaseService,private route: ActivatedRoute ) {

   }

  ngOnInit() {
    // Usar queryParams para obtener el correo
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'];
      if (this.correo) {
        this.cargarDatosUsuario();
      } else {
        console.error('Correo no proporcionado');
      }
    });
  }

  async cargarDatosUsuario() {
    const usuario = await this.bd.buscarUsuarioPorCorreo(this.correo);

    if (usuario) {
      this.pregunta = usuario.preguntaSecreta;
      
    } else {
      console.error('Usuario no encontrado');
    }
  }

  async validarRespuesta() {
    const usuario = await this.bd.buscarUsuarioPorCorreo(this.correo);

    if (usuario && this.inputRespuesta === usuario.respuestaSecreta) {
      this.router.navigate(['/correcto'], { queryParams: { correo: this.correo } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
    
  }

  volverIngreso() {
    this.router.navigate(['/ingreso']);
  }


}
