import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas;
  error;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.peticionExterna();
  }
  actualizar(): void {
    this.peticionExterna();
  }
  peticionExterna(): void {
    this.http.get('http://localhost:3009/pacientes/lista').subscribe(
      (respuesta) => this.tareas = respuesta,
      (error) => this.error = error

    )
  }
  crearRegistro(nuevoNombre, rut, fechaNacimiento, nuevoIngreso, nuevoDireccion, nuevoTelefono) {
    var parametros = {
      nombre: nuevoNombre.value,
      rut: rut.value,
      edad: fechaNacimiento.value,
      ingreso: nuevoIngreso.value,
      direccion: nuevoDireccion.value,
      telefono: nuevoTelefono.value
     };

    this.http.post('http://localhost:3009/pacientes/lista', parametros).subscribe(respuesta => {
      this.peticionExterna()
    })
  }

}
