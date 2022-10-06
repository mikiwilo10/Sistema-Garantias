import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  public previsualizacion: string;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
    };
  }

  // capturarFile(event): any {
  //   const archivoCapturado = event.target.files[0];
  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //     console.log(this.previsualizacion);
      
  //   });

  // }


  // extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafeImg = window.URL.createObjectURL($event);
  //     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         base: reader.result
  //       });
  //     };
  //     reader.onerror = error => {
  //       resolve({
  //         base: null
  //       });
  //     };

  //   } catch (e) {
  //     return null;
  //   }
  // });
}
