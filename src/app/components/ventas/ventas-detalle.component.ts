import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {

  titulo = 'Detalle Venta';
  venta: Venta = new Venta();

  constructor(private ventaService: VentaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.ventaService.ver(id).subscribe(venta => this.venta = venta);
      }
    });
  }

  descargarPDF():void{
    const opciones ={
      filename: 'factura',
      image: {type:'jpeg'},
      html2canvas:{},
      jsPDF: {orientation: 'landspace'}
    };

    const contenido: Element = document.getElementById('facturapdf');

    html2pdf()
    .from(contenido)
    .set(opciones)
    .save();
  }
}
