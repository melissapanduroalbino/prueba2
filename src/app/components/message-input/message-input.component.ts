import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="input-area">
      <textarea [(ngModel)]="newMessage" 
                placeholder="Type your message..."
                class="message-input"
                rows="3"></textarea>
      <button (click)="sendMessage()"
              class="btn btn-primary"
              [disabled]="!newMessage.trim()">
        Send
      </button>
    </div>
  `,
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  newMessage = '';

  constructor(private messageService: MessageService) {}

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messageService.addMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}