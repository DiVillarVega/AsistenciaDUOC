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
  imports: [IonContent, IonLabel, IonTitle, CommonModule, TranslateModule, IonButton]
})
export class CodigoqrComponent {
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() scanned: EventEmitter<string> = new EventEmitter<string>();
  @Output() stopped: EventEmitter<void> = new EventEmitter<void>();

  public usuario: Usuario = new Usuario();
  qrData: string = '';
  mediaStream: MediaStream | null = null;

  constructor(private authService: AuthService) {
    this.authService.usuarioAutenticado.subscribe((usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuario = usuarioAutenticado;
        this.comenzarEscaneoWeb();
      }
    });
  }

  // Comienza el escaneo desde la cámara
  async comenzarEscaneoWeb() {
    try {
      this.detenerCamara(); // Detiene cualquier flujo existente

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      this.video.nativeElement.srcObject = this.mediaStream;
      this.video.nativeElement.setAttribute('playsinline', 'true');

      // Verifica si el video no está reproduciéndose antes de llamar play()
      if (this.video.nativeElement.paused || this.video.nativeElement.ended) {
        await this.video.nativeElement.play();
      }

      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
      console.error('Error al iniciar el escaneo de QR:', error);
    }
  }

  // Verifica continuamente si el video tiene datos y si se ha escaneado un QR
  async verificarVideo() {
    if (this.video.nativeElement.readyState >= this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR()) {
        return; // Si se obtiene el QR, detiene el ciclo de verificación
      }
    }
    requestAnimationFrame(this.verificarVideo.bind(this)); // Sigue verificando si no se ha escaneado
  }

  // Obtiene los datos del QR escaneado y detiene el escaneo
  obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;

    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);

    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, {
      inversionAttempts: 'dontInvert',
    });

    if (qrCode) {
      const data = qrCode.data;
      if (data !== '') {
        this.detenerCamara(); // Detener la cámara después de escanear
        this.scanned.emit(qrCode.data); // Emitir el resultado del escaneo
        return true; // Detener el ciclo de verificación
      }
    }
    return false; // Si no se obtiene un QR válido, continúa verificando
  }

  // Método para detener el escaneo y emitir que se ha detenido
  public detenerEscaneoQR(): void {
    this.detenerCamara();
    this.stopped.emit(); // Emitir evento de detención
  }

  // Limpiar recursos cuando el componente se destruye
  ngOnDestroy() {
    this.detenerCamara();
  }

  // Detener la cámara
  detenerCamara() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }
}