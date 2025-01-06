import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CasoService } from '../../core/services/caso.service';
import { Caso } from '../../core/models/caso';
import { CardCasoComponent } from '../components/card-caso/card-caso.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-casos',
  imports: [
    CardCasoComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './casos.component.html',
  styleUrl: './casos.component.css'
})
export class CasosComponent  {
  role: any;
  casos: Caso[] = []; // Lista de casos
  casosFiltrados: Caso[] = []; // Lista de casos filtrados
  isLoading = true;

  pageSize = 10;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 

  constructor(
    private authSerice: AuthService,  // Servicio de autenticación
    private casoService: CasoService) { }

  ngOnInit(): void {
    this.role = this.authSerice.getRole();
    if (this.role === 'Admin' || this.role === 'admin') {
      this.loadCasosAdmin();
    } else if (this.role === 'Abogado' || this.role === 'abogado') {
      this.loadCasosAbogado();
    }
  }

  loadCasosAdmin() {
    this.casoService.cargarCasosAdmin();
    this.casoService.casosAdmin$.subscribe((casos) => {
      this.isLoading = false;
      this.casos = casos;
      this.casosFiltrados = casos; 
      this.getEstadosEncontrados();
      this.updatePagination();
    });
  }

  loadCasosAbogado() {
    this.casoService.cargarCasosAbogado(this.authSerice.getID());
    this.casoService.casosAbogado$.subscribe((casos) => {
      this.isLoading = false;
      this.casos = casos;
      this.casosFiltrados = casos;
      this.getEstadosEncontrados();
      this.updatePagination();
    });
  }

  ordenarPorFecha(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    if (selectedValue === 'asc') {
      // Ordenar de forma ascendente
      this.casosFiltrados = this.casosFiltrados.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (selectedValue === 'desc') {
      // Ordenar de forma descendente
      this.casosFiltrados = this.casosFiltrados.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  estadosEncontrados:any[] = [];
  getEstadosEncontrados() {
    this.casos.forEach(caso => {
      if (!this.estadosEncontrados.includes(caso.estado)) {
        this.estadosEncontrados.push(caso.estado);
      }
    });
  }
  
  filtrarPorEstado(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (selectedValue === 'todos') {
      this.casosFiltrados = [...this.casos];
    } else {
      this.casosFiltrados = this.casos.filter(caso => caso.estado === selectedValue);
    }
  }


  updatePagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.casosFiltrados = this.casos.slice(startIndex, startIndex + this.pageSize);
  }

  // Método para manejar cambios en la paginación
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }
}