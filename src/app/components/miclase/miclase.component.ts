import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { IonContent, IonCard, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { Asistencia } from 'src/app/interfaces/asistencia';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonContent,IonCard,IonCardHeader,IonCardContent, CommonModule, TranslateModule],
})
export class MiclaseComponent {
  public usuario: Usuario = new Usuario();
  public asistencia: Asistencia | undefined;

  constructor(private authService: AuthService) {
    this.authService.usuarioAutenticado.subscribe((usuarioAutenticado)=>{
      if(usuarioAutenticado){
        this.usuario=usuarioAutenticado;
      }
    });
   }


}
