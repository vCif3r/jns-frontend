import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Abogado } from '../../core/models/abogado';
import { AbogadoService } from '../../core/services/abogado.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewAbogadoComponent } from './new-abogado/new-abogado.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-abogados',
  imports: [
    RouterLink,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './abogados.component.html',
  styleUrl: './abogados.component.css',
})
export class AbogadosComponent implements AfterViewInit {
  loading = true;
 
  // TABLE
  displayedColumns: string[] = [
    'foto',
    'cedula',
    'especialidad',
    'nombre',
    'email',
    'acciones',
  ]; //  columnas
  dataSource = new MatTableDataSource<Abogado>(); // Definir el origen de datos
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private abogadoService: AbogadoService) {}

  ngOnInit(): void {
    // Nos suscribimos al BehaviorSubject para recibir actualizaciones
    this.abogadoService.abogados$.subscribe((data) => {
      this.dataSource.data = data; // Actualizamos la lista de abogados con los datos recibidos
      this.loading = false;
    });
    // Cargamos inicialmente la lista de abogados
    this.abogadoService.findAll().subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si hay algún filtro, activa la paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // dialog agregar abogado
  readonly dialog = inject(MatDialog);
  openDialog() {
    this.dialog.open(NewAbogadoComponent);
  }


  printPreview(): void {
    // Crear una nueva ventana de impresión
    const printWindow = window.open('', '', 'height=800,width=1000');
    
    // Obtener el contenido HTML de la tabla
    const tableContent = document.getElementById('printableTable')?.outerHTML;
  
    // Crear el contenido HTML de la ventana de impresión
    printWindow?.document.write(`
      <html>
        <head>
          <title>Vista Previa de Impresión</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f4f4f4; }
            
            /* Estilo para ocultar los botones de sort en la vista de impresión */
            .mat-sort-header-arrow {
              display: none;
            }
          </style>
        </head>
        <body>
          <h2>Listado de Abogados</h2>
          ${tableContent}
        </body>
      </html>
    `);
    
    // Cerrar el documento y enfocar la ventana antes de imprimir
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  }
  
  exportToCSV(): void {
    // Definir las columnas que queremos exportar (excluyendo la columna "acciones")
    const header = this.displayedColumns.filter(col => col !== 'acciones');
  
    // Mapeamos los datos para formar las filas
    const rows = this.dataSource.data.map((row: Abogado) => {
      return header.map((col) => {
        // Aquí usamos as keyof Abogado para hacer la afirmación de tipo
        const value = row[col as keyof Abogado] || ''; // Accedemos de forma segura a las propiedades
        return value;
      }).join(',');
    });
  
    // Convertimos el contenido del CSV, agregamos el encabezado y las filas
    const csvContent = [header.join(','), ...rows].join('\n');
  
    // Creamos un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
  
    link.setAttribute('href', url);
    link.setAttribute('download', 'tabla_abogados.csv'); // Nombre del archivo
    document.body.appendChild(link);
    link.click(); // Iniciamos la descarga
    document.body.removeChild(link); // Limpiamos el DOM después de la descarga
  }
  
  
  
  
  
}
