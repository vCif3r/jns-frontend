import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
  @Input() currentState!: any; // El estado actual, recibido como string
  steps: string[] = [
    'Inicio',
    'En trámite',
    'Resuelto en Primera Instancia',
    'En Apelación',
    'Con Casación',
    'Resuelto'
  ];
  currentIndex: number = 1; // Índice actual (1-based)

  ngOnInit(): void {
    if (!this.currentState) {
      console.warn('El estado actual (currentState) es nulo o indefinido.');
      this.currentIndex = 1; // Mostrar "Inicio" como predeterminado
      return;
    }
  
    const normalize = (text: string) =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    const normalizedState = normalize(this.currentState); // Normaliza el estado recibido
    const normalizedSteps = this.steps.map(normalize); // Normaliza los pasos
  
    const index = normalizedSteps.indexOf(normalizedState); // Encuentra el índice
    if (index !== -1) {
      this.currentIndex = index + 1; // Ajusta a 1-based
    } else {
      console.warn(`Estado "${this.currentState}" no encontrado en los pasos.`);
      this.currentIndex = 1; // Valor predeterminado si no encuentra el estado
    }
  }
  
}
