import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { IonContent, IonCard, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { Asistencia } from 'src/app/interfaces/asistencia';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonContent,IonCard,IonCardHeader,IonCardContent, CommonModule, TranslateModule],
})
export class MiclaseComponent implements OnDestroy {
  clase: any;
  private subscription: Subscription;

  constructor( private authService: AuthService) 
  { 
    this.subscription = this.authService.qrCodeData.subscribe((qr) =>{
      this.clase = qr? JSON.parse(qr): null;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
