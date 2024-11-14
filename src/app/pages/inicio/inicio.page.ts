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
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CodigoqrComponent, MiclaseComponent, ForoComponent, MisdatosComponent,
            IonIcon, IonButton, IonSegmentButton, IonSegment, IonFooter, IonContent, 
            IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, TranslateModule]
})
export class InicioPage {

  selectedComponent = 'codigoqr'

  constructor() { 
    addIcons({ homeOutline,schoolOutline, pencilOutline, gridOutline});
  }

  segmentChange($event: any){
    this.selectedComponent = $event.detail.value; 
  }

}
