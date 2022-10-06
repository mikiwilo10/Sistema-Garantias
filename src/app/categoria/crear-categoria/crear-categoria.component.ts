import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Categoria } from '../../model/TODO';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {


  categoria: Categoria[] = [];
  formularioCategoria: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor(private serviceCategoria: CategoriaService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarCategoria();
  }

  ValidarCampos(campo: string) {
    return this.formularioCategoria.controls[campo].errors
      && this.formularioCategoria.controls[campo].touched;
  }

  crearCategoria() {
    if (this.formularioCategoria.invalid) {
      Swal.fire('Error, Campos Vacios', 'Por favor, Llene los Campos', 'error')
    } else {
      const { nombre }=this.formularioCategoria.value;
      const cat: Categoria = {
        "nombre": nombre
      };
      this.serviceCategoria.crearCategoria(cat).subscribe(
        data => {
          console.log(data);
          this.formularioCategoria.reset();
          this.listarCategoria();
        }
      );
    }

  }

  listarCategoria() {
    this.serviceCategoria.listaCategoria().subscribe(
      data => {
        this.categoria = data;
      }
    );
  }

  cancelar(){
    this.formularioCategoria.reset();
  }


}
