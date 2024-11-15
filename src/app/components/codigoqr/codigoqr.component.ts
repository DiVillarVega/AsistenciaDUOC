import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonInput, IonButton, IonIcon, IonCard, IonLoading, IonCardContent, IonCardSubtitle, IonItem, IonCol,
  IonGrid, IonRow, IonLabel, IonItemDivider } from '@ionic/angular/standalone';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonTitle, CommonModule, TranslateModule]
})
export class CodigoqrComponent  implements OnInit {
  @ViewChild('titulo',{ read: ElementRef }) itemTitulo!: ElementRef
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() qrScanSuccess = new EventEmitter<void>(); // Evento de salida

  public usuario: Usuario = new Usuario();
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';


  constructor(private authService: AuthService) {
    this.authService.usuarioAutenticado.subscribe((usuarioAutenticado)=>{
      if(usuarioAutenticado){
        this.usuario=usuarioAutenticado;
      }
    });

  }
  ngOnInit() {
    if (!this.usuario.asistencia) {
      this.comenzarEscaneoQR();
    } else {
      console.log("Asistencia ya almacenada:", this.usuario.asistencia);
    }
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img = context.getImageData(0, 0, w, h);
    let qrCode = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    
    if (qrCode && qrCode.data !== '') {
      console.log("QR Data:", qrCode.data);
      
      this.escaneando = false;
      this.usuario.asistencia = JSON.parse(qrCode.data);
      this.authService.guardarUsuarioAutenticado(this.usuario);  
      console.log("Asistencia:", this.usuario.asistencia);  

      this.qrScanSuccess.emit(); // Emitir evento cuando se haya escaneado el QR

      return true;
    }
    
    return false;
  }
  
  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }
  

}

