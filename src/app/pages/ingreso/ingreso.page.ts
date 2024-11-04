import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol, IonGrid, IonRow, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';


@Component({
    selector: 'app-ingreso',
    templateUrl: './ingreso.page.html',
    styleUrls: ['./ingreso.page.scss'],
    standalone: true,
    imports: [IonLabel, IonRow, IonGrid, IonCol, IonItem, IonCardSubtitle, IonCardContent, IonLoading, IonCard, IonIcon, IonButton, IonInput, IonContent,
       IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonHeader, IonFooter, HeaderComponent, TranslateModule, LanguageComponent]
})
export class IngresoPage{

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;
    
  cuenta: string= 'atorres';
  password: string= '1234';

  constructor(private authService: AuthService, private router: Router) { 
    addIcons({personOutline})
  }

  ingresar(){
    this.authService.login(this.cuenta,this.password);
  }

  recuperarContrasena(){
    this.router.navigate(['/correo']);
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }
  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  ruta(){
    this.router.navigate(['/miruta']);
  }

}
