import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Abogado } from '../../core/models/abogado';
import { AbogadoService } from '../../core/services/abogado.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormAbogadoComponent } from './form-abogado/form-abogado.component';
import { DIalogDeleteAbogadoComponent } from './dialog-delete-abogado/dialog-delete-abogado.component';

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
    MatProgressSpinnerModule,
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

  constructor(private abogadoService: AbogadoService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargarAbogados();
  }

  cargarAbogados() {
    this.abogadoService.getAbogados().subscribe(
      (abogados) => {
        this.dataSource.data = abogados;
        this.loading = false;
      },
      (error) => console.error('Error cargando abogados', error)
    );
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
  openDialog(abogado?: Abogado) {
    this.dialog.open(FormAbogadoComponent, {
      data: { abogado: abogado },
    });
  }

  openDialogDelete(id: any) {
    this.dialog.open(DIalogDeleteAbogadoComponent, {
      data: { id: id }
    });
  }

  printPreview(): void {
    // Crear una nueva ventana de impresión
    const printWindow = window.open('', '', 'height=800,width=1000');
    
    // Obtener el contenido HTML de la tabla
    const tableElement = document.getElementById('printableTable');
    
    if (tableElement) {
      // Clonar la tabla para no modificar la original
      const clonedTable = tableElement.cloneNode(true) as HTMLElement;
  
      // Eliminar la columna de opciones CRUD de la tabla clonada
      const rows = clonedTable.querySelectorAll('tr'); // Obtener todas las filas de la tabla clonada
      
      rows.forEach(row => {
        // Encontrar la celda de la columna CRUD (por ejemplo, la última columna)
        const crudCell = row.querySelector('td:last-child, th:last-child'); // Cambia esto si no es la última columna
        if (crudCell) {
          crudCell.remove(); // Eliminar la celda de la columna CRUD
        }
      });
      
      // Crear el contenido HTML de la ventana de impresión con la tabla clonada modificada
      const modifiedTableContent = clonedTable.outerHTML;
  
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
            ${modifiedTableContent}
          </body>
        </html>
      `);
      
      // Cerrar el documento y enfocar la ventana antes de imprimir
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    }
  }

  exportToCSV(): void {
    // Definir las columnas que queremos exportar (excluyendo la columna "acciones")
    const header = this.displayedColumns.filter((col) => col !== 'acciones');

    // Mapeamos los datos para formar las filas
    const rows = this.dataSource.data.map((row: Abogado) => {
      return header
        .map((col) => {
          // Aquí usamos as keyof Abogado para hacer la afirmación de tipo
          const value = row[col as keyof Abogado] || ''; // Accedemos de forma segura a las propiedades
          return value;
        })
        .join(',');
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
