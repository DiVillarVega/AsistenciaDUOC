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
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonLabel, IonRow, IonGrid, IonCol, IonItem, IonCardSubtitle, IonCardContent, IonLoading,
    IonCard, IonIcon, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonHeader, IonFooter, HeaderComponent]
})
export class CorrectoPage {

  public password: string = '';
  public correo: string = '';

  constructor(private router: Router, private bd: DataBaseService,private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'];
      if (this.correo) {
        this.cargarUsuario();
      } else {
        console.error('Correo no proporcionado');
      }
    });
  }


  async cargarUsuario() {
    const usuario = await this.bd.buscarUsuarioPorCorreo(this.correo);
    if (usuario) {
      this.password = usuario.password;
    }
  }

  volverIngreso() {
    this.router.navigate(['/ingreso']);
  }

}
