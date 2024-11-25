import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router'; // Import necesario para routerLink
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule // Habilitar routerLink
  ],
})
export class UsuariosComponent implements OnInit {
  usuarios: Partial<Usuario>[] = []; // Mostrar solo nombre, apellido y correo

  constructor(private bd: DataBaseService) {
    addIcons({ trash }); // Agregar icono de eliminar
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      // Asegúrate de que `leerUsuarios` devuelva una promesa de un arreglo
      const usuariosCompletos: Usuario[] = await this.bd.leerUsuarios();

      // Mapea los datos para mostrar solo los campos necesarios y manejar valores indefinidos
      this.usuarios = usuariosCompletos.map((user) => ({
        nombre: user?.nombre || '',
        apellido: user?.apellido || '',
        correo: user?.correo || '',
        cuenta: user?.cuenta || '',
      }));
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      showToast('Error al cargar los usuarios');
    }
  }

  async eliminarUsuario(usuario: Partial<Usuario>) {
    try {
      if (!usuario.cuenta) {
        showToast('Usuario no válido para eliminar');
        return;
      }

      // Eliminar el usuario en la base de datos
      await this.bd.eliminarUsuarioUsandoCuenta(usuario.cuenta);

      // Actualizar la lista de usuarios eliminando al usuario
      this.usuarios = this.usuarios.filter((u) => u.cuenta !== usuario.cuenta);
      showToast('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      showAlertDUOC('Error: no se pudo eliminar el usuario');
    }
  }
}
