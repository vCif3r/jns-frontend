import { Component } from '@angular/core';
import { CasoService } from '../../core/services/caso.service';
import { Caso } from '../../core/models/caso';
import { CardCasoComponent } from '../components/card-caso/card-caso.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-casos',
  imports: [
    CardCasoComponent,
    MatIconModule
  ],
  templateUrl: './casos.component.html',
  styleUrl: './casos.component.css'
})
export class CasosComponent {
  role: any;
  casos: Caso[] = []; //

  constructor(
    private authSerice: AuthService,  //
    private casoService: CasoService) { }

  ngOnInit(): void {
    this.role = this.authSerice.getRole();
    if(this.role === 'Admin' || this.role === 'admin') {
      this.loadCasosAdmin();
    } else if (this.role === 'Abogado' || this.role === 'abogado') {
      this.loadCasosAbogado();
    }

    this.casoService.findAll().subscribe(casos => {
      this.casos = casos
      console.log(casos);
    });
  }

  loadCasosAdmin(){
    this.casoService.cargarCasosAdmin();
    this.casoService.casosAbogado$.subscribe((casos)=>{
      this.casos = casos;
    })
  }

  loadCasosAbogado(){
    this.casoService.cargarCasosAbogado(this.authSerice.getID());
    this.casoService.casosAbogado$.subscribe((casos)=>{
      this.casos = casos;
    })
  }


}
