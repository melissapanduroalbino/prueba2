import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-history-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-drawer" [class.open]="isOpen">
      <button class="toggle-btn" (click)="toggleDrawer()">
        {{ isOpen ? '✕' : '☰' }} History
      </button>
      
      <div class="drawer-content">
        <h2>Message History</h2>
        <div class="history-list">
          <div *ngFor="let message of messages$ | async" 
               class="history-item"
               [class.deleted]="message.isDeleted">
            <p class="message-preview">{{ message.content | slice:0:50 }}{{ message.content.length > 50 ? '...' : '' }}</p>
            <small class="timestamp">{{ message.timestamp | date:'short' }}</small>
            <div class="item-actions">
              <button *ngIf="message.isDeleted"
                      (click)="restoreMessage(message)"
                      class="btn btn-primary btn-sm">
                Restore
              </button>
              <button *ngIf="!message.isDeleted"
                      (click)="deleteMessage(message)"
                      class="btn btn-outline btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./history-drawer.component.css']
})
export class HistoryDrawerComponent {
  isOpen = false;
  messages$ = this.messageService.messages$;

  constructor(private messageService: MessageService) {}

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  deleteMessage(message: Message) {
    this.messageService.deleteMessage(message);
  }

  restoreMessage(message: Message) {
    this.messageService.restoreMessage(message);
  }
}