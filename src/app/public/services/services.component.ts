import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-services',
  imports: [CommonModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  // Variables para controlar si se muestra más información para CASOS 
  showMoreInfo1: boolean = false;
  showMoreInfo2: boolean = false;
  showMoreInfo3: boolean = false;

  // Variables para controlar si se muestra más información para SERVICIOS 
  showMoreService1: boolean = false;
  showMoreService2: boolean = false;
  showMoreService3: boolean = false;
  showMoreService4: boolean = false;

  // Función para alternar el estado de 'showMoreInfo' para cada CASO 
  toggleMoreInfo(section: number): void {
    if (section === 1) {
      this.showMoreInfo1 = !this.showMoreInfo1;
    } else if (section === 2) {
      this.showMoreInfo2 = !this.showMoreInfo2;
    } else if (section === 3) {
      this.showMoreInfo3 = !this.showMoreInfo3;
    }
  }

  // Función para alternar el estado de 'showMoreService' para cada SERVICIO
  toggleServiceInfo(service: number): void {
    if (service === 1) {
      this.showMoreService1 = !this.showMoreService1;
    } else if (service === 2) {
      this.showMoreService2 = !this.showMoreService2;
    } else if (service === 3) {
      this.showMoreService3 = !this.showMoreService3;
    } else if (service === 4) {
      this.showMoreService4 = !this.showMoreService4;
    }
  }
  // Función para alternar la alineación del textoo
  toggleTextAlignment(service: number): void {
    const textContainer = document.getElementById(`service-text-container-${service}`);
    if (textContainer) {
      if (service === 1 && this.showMoreService1) {
        textContainer.classList.add('justified');
        textContainer.classList.remove('centered');
      } else if (service === 2 && this.showMoreService2) {
        textContainer.classList.add('justified');
        textContainer.classList.remove('centered');
      } else if (service === 3 && this.showMoreService3) {
        textContainer.classList.add('justified');
        textContainer.classList.remove('centered');
      } else {
        textContainer.classList.add('centered');
        textContainer.classList.remove('justified');
      }
    }
  }
}
