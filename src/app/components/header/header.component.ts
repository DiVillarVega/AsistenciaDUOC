import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('titulo',{ read: ElementRef }) itemTitulo!: ElementRef

  constructor(private navCtrl: NavController, private authService: AuthService, private animationController: AnimationController) { 
    addIcons({ logOutOutline });
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    if (this.itemTitulo) {
      this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .keyframes([
          { offset: 0, transform: 'translateX(-100%)', opacity: 0.4 },  // Fuera de la pantalla por la izquierda
          { offset: 0.5, transform: 'translateX(0)', opacity: 1 },      // Completamente visible en el centro
          { offset: 1, transform: 'translateX(100%)', opacity: 0.4 }    // Fuera de la pantalla por la derecha
        ])
        .play();
    }
}

}
