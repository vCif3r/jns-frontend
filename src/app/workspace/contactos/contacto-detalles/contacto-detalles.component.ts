import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ContactoService } from '../../../core/services/contacto.service';
import { Contacto } from '../../../core/models/contacto';
import { MatButtonModule } from '@angular/material/button';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-contacto-detalles',
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule,TimeAgoPipe],
  templateUrl: './contacto-detalles.component.html',
  styleUrl: './contacto-detalles.component.css',
})
export class ContactoDetallesComponent {
  contacto: Contacto | undefined
  private contactoService = inject(ContactoService)
  
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ){
    this.contactoService.findOne(data.id).subscribe((data)=>{
      this.contacto = data
    })
  }
}
