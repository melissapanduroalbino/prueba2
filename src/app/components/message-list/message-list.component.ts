import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="messages">
      <div *ngFor="let message of messages$ | async" 
           class="message"
           [class.deleted]="message.isDeleted">
        
        <div *ngIf="!message.isEditing && !message.isDeleted" class="message-content">
          <p>{{ message.content }}</p>
          <small class="timestamp">{{ message.timestamp | date:'medium' }}</small>
        </div>

        <div *ngIf="message.isEditing" class="edit-form">
          <textarea [(ngModel)]="message.content" 
                    class="edit-input"
                    rows="3"></textarea>
        </div>

        <div class="message-actions">
          <ng-container *ngIf="!message.isDeleted">
            <button *ngIf="!message.isEditing" 
                    (click)="toggleEdit(message)"
                    class="btn btn-outline">
              Edit
            </button>
            <button *ngIf="message.isEditing" 
                    (click)="toggleEdit(message)"
                    class="btn btn-primary">
              Save
            </button>
            <button (click)="deleteMessage(message)"
                    class="btn btn-outline">
              Delete
            </button>
          </ng-container>
          <button *ngIf="message.isDeleted" 
                  (click)="restoreMessage(message)"
                  class="btn btn-primary">
            Restore
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages$ = this.messageService.messages$;

  constructor(private messageService: MessageService) {}

  toggleEdit(message: Message) {
    this.messageService.toggleEdit(message);
  }

  deleteMessage(message: Message) {
    this.messageService.deleteMessage(message);
  }

  restoreMessage(message: Message) {
    this.messageService.restoreMessage(message);
  }
}