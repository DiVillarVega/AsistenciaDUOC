import { AuthService } from 'src/app/services/auth.service';
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol,
  IonGrid, IonRow, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

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
  

  constructor(private router: Router) { }

  volverIngreso(){
    this.router.navigate(['/ingreso']);
  }

}
