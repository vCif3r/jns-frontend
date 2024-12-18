import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements AfterViewInit  {
  isChatOpen: boolean = false;
  userMessage: string = '';
  @ViewChild('chatbox') chatbox!: ElementRef;
  @ViewChild('userInput') userInput!: ElementRef;
  @ViewChild('optionButtons') optionButtons!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    // Asegúrate de que los elementos estén disponibles
    if (this.chatbox && this.userInput) {
      this.userInput.nativeElement.addEventListener('keydown', (event:any) => this.handleInput(event));
    }
  }

  addMessage(sender: string, message: string): void {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    this.chatbox.nativeElement.appendChild(messageElement);
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight; // Scroll
  }

  handleInput(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const userInput = this.userInput.nativeElement;
    if (userInput && userInput.value) {
      const message = userInput.value;
      console.log(message); // Aquí se manejaría el mensaje
      userInput.value = ''; // Limpiar el campo de entrada
    } else {
      console.error("El campo de entrada está vacío o no existe.");
    }
  }

  showOptionButtons(): void {
    const options = [
      'Derecho Laboral', 'Penal', 'Derecho de Familia', 'Civil', 'Administrativo', 
      'Registro de Marca', 'Derecho de Consumidores', 'Seguros'
    ];
    
    this.optionButtons.nativeElement.innerHTML = ''; // Limpiar los botones previos

    options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary');
      button.textContent = option;
      button.addEventListener('click', () => {
        this.generateBotResponse(option.toLowerCase());
      });
      this.optionButtons.nativeElement.appendChild(button);
    });
  }

  generateBotResponse(input: string): void {
    let response = '';
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('derecho laboral')) {
      response = 'Entiendo que tienes una consulta sobre Derecho Laboral. ¿Te interesa saber sobre despidos, contratos laborales, acoso laboral o derechos de los trabajadores?';
      setTimeout(() => {
        this.simulateUserOptions(['Despidos', 'Contratos laborales', 'Acoso laboral', 'Derechos de los trabajadores']);
      }, 1000);
    } else if (lowerInput.includes('penal')) {
      response = 'En Derecho Penal, ¿estás interesado en delitos, procedimientos legales, o defensa criminal?';
      setTimeout(() => {
        this.simulateUserOptions(['Delitos', 'Procedimientos legales', 'Defensa criminal']);
      }, 1000);
    } else {
      response = 'Lo siento, no entendí eso. ¿Podrías repetirlo o seleccionar una de las opciones disponibles?';
    }

    this.addMessage('bot', response);
  }

  simulateUserOptions(options: string[]): void {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('message', 'option-container');

    options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'mb-1');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        this.addMessage('user', option);
        optionContainer.remove();
        this.generateBotResponse(option.toLowerCase());
      });
      optionContainer.appendChild(button);
    });

    this.chatbox.nativeElement.appendChild(optionContainer);
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
  }

  toggleChat(): void {
    const chatContainer = this.chatbox.nativeElement.closest('.chat-container');
    const widgetPosition = document.querySelector('.widget-position-right') as HTMLElement;

    if (chatContainer.classList.contains('hidden')) {
      chatContainer.classList.remove('hidden');
      widgetPosition.classList.add('hidden');
      this.showOptionButtons(); // Muestra los botones al abrir el chat
    } else {
      chatContainer.classList.add('hidden');
      widgetPosition.classList.remove('hidden');
    }
  }

  minimizeChat(): void {
    const chatContainer = this.chatbox.nativeElement.closest('.chat-container');
    const buttonContainer = document.querySelector('.widget-position-right') as HTMLElement;

    chatContainer.classList.toggle('hidden');
    buttonContainer.classList.remove('hidden');

    if (!chatContainer.classList.contains('hidden')) {
      this.showOptionButtons();
    }
  }
}
