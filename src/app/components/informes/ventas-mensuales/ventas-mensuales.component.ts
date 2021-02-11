import { VentaService } from './../../../services/venta.service';
import { Venta } from './../../../models/venta';
import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-ventas-mensuales',
  templateUrl: './ventas-mensuales.component.html',
  styleUrls: ['./ventas-mensuales.component.css']
})
export class VentasMensualesComponent implements OnInit {

  titulo = 'Informe de Ventas Mensuales';
  ventas: Venta[]=[];
  ventasFiltrarMes: Venta[]=[];
  meses:any[]=[
    {'id': 1, 'nombre':'Enero'},
    {'id': 2, 'nombre':'Febrero'},
    {'id': 3, 'nombre':'Marzo'},
    {'id': 4, 'nombre':'Abril'},
    {'id': 5, 'nombre':'Mayo'},
    {'id': 6, 'nombre':'Junio'},
    {'id': 7, 'nombre':'Julio'},
    {'id': 8, 'nombre':'Agosto'},
    {'id': 9, 'nombre':'Septiembre'},
    {'id': 10, 'nombre':'Octubre'},
    {'id': 11, 'nombre':'Noviembre'},
    {'id': 12, 'nombre':'Diciembre'},
  ];
  mesSeleccionado: number;
  totalVentas:number=0;

  constructor(private ventasServicio: VentaService) {

   }

  ngOnInit(): void {
    this.ventasServicio.listar().subscribe(venta => this.ventas = venta);
  }

  buscarVentas(): void{
    if(this.mesSeleccionado){
      this.ventasFiltrarMes=[];
      this.ventasFiltrarMes = this.ventas.filter(venta => this.obtenerMes(venta.creationDate) == this.mesSeleccionado);
      if(this.ventasFiltrarMes.length>0){
        this.ventasFiltrarMes.forEach(venta => {
          this.totalVentas = venta.purchaseValue + this.totalVentas;
        });
      }
    }
  }

  obtenerMes(fechaString: string):number{
    return 1 + (new Date(fechaString).getMonth());
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
