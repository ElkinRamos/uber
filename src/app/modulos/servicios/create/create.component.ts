import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    fecha: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    placa: ['', [Validators.required]],
    nombre_conductor: ['', [Validators.required]],
    dinero: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  store(){
    let servicio = new ServicioModelo();
    servicio.fecha = new Date(this.fgValidacion.controls["fecha"].value).toString();
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa = this.fgValidacion.controls["placa"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero = this.fgValidacion.controls["dinero"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;

    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
