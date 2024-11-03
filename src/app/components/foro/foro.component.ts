import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  standalone: true,
})
export class ForoComponent  implements OnInit {


  @ViewChild("topOfPage") topOfPage!: ElementRef;

  usuario = new Usuario();
  publicacion: Publicacion = new Publicacion();
  publicaciones: any;


  constructor(private authService: AuthService, private api:APIClientService) { }

  ngOnInit() {
    this.api.listaPublicaciones.subscribe((publicaciones) => {
      publicaciones.reserve();
    this.publicaciones = publicaciones;
    });
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario? usuario : new Usuario();  
    });
  } // FALTA AVANZAR MIN 8:29 Video 13 Componente api para foro

}
