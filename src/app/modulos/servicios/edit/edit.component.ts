import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      dinero: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
    });
  
    id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  edit(){
     let servicio = new ServicioModelo();
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa = this.fgValidacion.controls["placa"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero = this.fgValidacion.controls["dinero"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;

    this.servicioService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  buscarRegistro(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha)
      this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio)
      this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin)
      this.fgValidacion.controls["placa"].setValue(data.placa)
      this.fgValidacion.controls["nombre_conductor"].setValue(data.nombre_conductor)
      this.fgValidacion.controls["dinero"].setValue(data.dinero)
      this.fgValidacion.controls["ruta"].setValue(data.ruta)
      })
  }
}
