import { AuthService } from 'src/app/services/auth.service';
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol,
  IonGrid, IonRow, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { showToast } from 'src/app/tools/message-routines';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonLabel, IonRow, IonGrid, IonCol, IonItem, IonCardSubtitle, IonCardContent, IonLoading,
   IonCard, IonIcon, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
   FormsModule, IonHeader, IonFooter, HeaderComponent]
})
export class CorreoPage {
  public correo: string = '';
  

  constructor(private router: Router, private bd: DataBaseService) {

  }

   //Probablemnete falte el @ViewChild para los lenguajes

   public async validarCorreo(form : NgForm){
      if(form.invalid){
        showToast('Ingresar correo en formato valido');
        return;
      }else if(form.valid){
        const encontrado = await this.bd.buscarUsuarioPorCorreo(this.correo);
        if(!encontrado){
          showToast('El correo ingresado no existe, intente nuevamente');
        } else {
          this.router.navigate(['/pregunta'], {queryParams: {correo: this.correo}})
        }
      }
    }
   

  volverIngreso() {
    this.router.navigate(['/ingreso']);
  }

}
