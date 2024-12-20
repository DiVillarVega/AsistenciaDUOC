import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol, IonGrid, IonRow, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { addIcons } from 'ionicons';
import { colorWandOutline, personCircle, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonLabel, IonRow, IonGrid, IonCol, IonItem, IonCardSubtitle, IonCardContent, IonLoading, IonCard, IonIcon, IonButton, IonInput, IonContent,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonHeader, IonFooter, HeaderComponent, TranslateModule, LanguageComponent]
})
export class IngresoPage {
  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  cuenta: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { 
    addIcons({ personCircle, colorWandOutline });
  }

  ingresar() {
    this.authService.login(this.cuenta, this.password);
  }

  recuperarContrasena() {
    this.router.navigate(['/correo']);
  }

  async ionViewWillEnter() {
    this.cuenta = ''; // Limpiar el campo de cuenta
    this.password = ''; // Limpiar el campo de password
    this.selectLanguage.setCurrentLanguage(); // Configurar el idioma actual
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  ruta() {
    this.router.navigate(['/miruta']);
  }

  registrarme() {
    this.router.navigate(['/registrarme']);
  }
}
