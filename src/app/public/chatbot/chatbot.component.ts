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
  messages: Array<{ sender: string, content: string }> = [];
  options: string[] = [];
  @ViewChild('userInput') userInput!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.userInput) {
      this.userInput.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => this.handleInput(event));
    }
  }

  addMessage(sender: string, message: string): void {
    this.messages.push({ sender, content: message });
    setTimeout(() => this.scrollToBottom(), 100);  // Ensure scroll works after rendering
  }

  handleInput(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const message = this.userInput.nativeElement.value;
    if (message.trim()) {
      this.addMessage('user', message);
      this.userInput.nativeElement.value = '';  // Clear input after sending
      this.generateBotResponse(message);
    }
  }

  generateBotResponse(input: string): void {
    let response = '';
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('derecho laboral')) {
      response = 'Entiendo que tienes una consulta sobre Derecho Laboral. ¿Te interesa saber sobre despidos, contratos laborales, acoso laboral o derechos de los trabajadores?';
      this.options = ['Despidos', 'Contratos laborales', 'Acoso laboral', 'Derechos de los trabajadores'];
    } else if (lowerInput.includes('penal')) {
      response = 'En Derecho Penal, ¿estás interesado en delitos, procedimientos legales, o defensa criminal?';
      this.options = ['Delitos', 'Procedimientos legales', 'Defensa criminal'];
    } else if (lowerInput.includes('hola') || lowerInput.includes('hi')) {
      response = 'Hola!! ¿Cómo puedo ayudarte?'
      this.options = []
    } else if (lowerInput.includes('adios')){
      response = '¡Adiós! ¡Que tengas un excelente día!'
      this.options = []
    } else if(lowerInput.includes('pueden ayudarme con la redacción de un contrato de franquicia')){
      response = '¡Hola! 👋 Claro que sí. Somos expertos en la redacción de contratos de franquicia. Nos aseguramos de que cumplan con las normativas vigentes y cubran todos los aspectos clave, como derechos de marca, regalías y obligaciones de las partes. ¿Te gustaría agendar una reunión para más detalles o recibir un presupuesto personalizado?'
      this.options = []
    } else if(lowerInput.includes('tipos de contratos redactan')){
      response = 'Ofrecemos servicios especializados en la redacción de: Contratos laborales, Contratos de consorcio, Contratos de franquicia, Contratos personalizados para el desarrollo empresarial. Dinos más sobre lo que necesitas, ¡estamos listos para ayudarte!' 
      this.options = [];
    } else if(lowerInput.includes('costo') && lowerInput.includes('contrato personalizado')){
      response = 'El costo depende de la complejidad y el alcance del contrato. Por ejemplo: Contratos simples: Desde S/ X. Contratos complejos o personalizados: Evaluamos tus necesidades para ofrecerte un presupuesto justo.'
      this.options = [];
    } else if (lowerInput.includes('pueden ayudarme') && lowerInput.includes('proceso judicial') && lowerInput.includes('despido arbitrario')){
      response = '¡Hola! 👋 Sí, tenemos amplia experiencia en procesos de despido arbitrario. Te ayudamos desde la revisión de pruebas hasta la representación en el Poder Judicial, asegurando la mejor estrategia para tu caso. ¿Quieres agendar una consulta inicial para analizar los detalles?'
      this.options = [];
    } else if (lowerInput.includes('documentos necesito') && lowerInput.includes('proceso judicial') && lowerInput.includes('incumplimiento de contrato')){
      response = "Para un proceso judicial por incumplimiento de contrato, generalmente necesitas: \nUna copia del contrato firmado.\nDocumentos que demuestren el incumplimiento (correos, facturas, etc.). \nIdentificación de ambas partes. \nSi necesitas apoyo en la revisión de documentos o para iniciar el proceso, estamos aquí para ayudarte. ¿Te gustaría más información?"
      this.options = [];
    } else if(lowerInput.includes('tiempo puede durar un proceso judicial')){
      response = 'La duración depende del tipo de proceso y la carga judicial. Por ejemplo: Procesos simples (como demandas laborales): 6-12 meses.Procesos complejos (como resolución de contratos): Puede extenderse a más de 2 años. Ofrecemos seguimiento constante para asegurarnos de que tu caso avance lo más rápido posible. ¿Quieres conocer cómo podemos ayudarte?'
      this.options = [];
    } else if (lowerInput.includes('pueden representarme en una conciliación previa')){
      response = '¡Por supuesto! 🏛️ Asistimos y representamos a nuestros clientes en conciliaciones previas, garantizando que tus derechos sean defendidos y logrando acuerdos favorables. ¿Te gustaría agendar una reunión para preparar tu caso?'
      this.options = [];
    } else {
      response = 'Lo siento, no entendí eso. ¿Podrías repetirlo o seleccionar una de las opciones disponibles?';
    }

    this.addMessage('bot', response);
  }

  showOptionButtons(): void {
    this.options = [
      'Derecho Laboral', 'Penal', 'Derecho de Familia', 'Civil', 'Administrativo', 
      'Registro de Marca', 'Derecho de Consumidores', 'Seguros'
    ];
  }

  onOptionSelect(option: string): void {
    this.addMessage('user', option);
    this.generateBotResponse(option);
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.showOptionButtons();  // Show options when the chat opens
    }
  }

  minimizeChat(): void {
    this.isChatOpen = false;
  }

  scrollToBottom(): void {
    const chatbox = document.querySelector('.chatbox') as HTMLElement;
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
}
