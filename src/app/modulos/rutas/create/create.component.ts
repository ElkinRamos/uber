import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempo_estimado: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
    private rutaService: RutasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  store(){
    let ruta = new RutaModelo();
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;

    this.rutaService.store(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}