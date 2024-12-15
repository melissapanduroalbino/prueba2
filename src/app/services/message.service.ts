import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private nextId = 1;

  constructor() {
    this.addMessage('Welcome to Gemini Clone! This is a sample message.');
    this.addMessage('You can edit, delete, and restore messages.');
  }

  addMessage(content: string) {
    const message: Message = {
      id: this.nextId++,
      content,
      isEditing: false,
      isDeleted: false,
      timestamp: new Date()
    };
    this.messages.push(message);
    this.updateMessages();
  }

  toggleEdit(message: Message) {
    message.isEditing = !message.isEditing;
    this.updateMessages();
  }

  deleteMessage(message: Message) {
    message.isDeleted = true;
    this.updateMessages();
  }

  restoreMessage(message: Message) {
    message.isDeleted = false;
    this.updateMessages();
  }

  private updateMessages() {
    this.messagesSubject.next([...this.messages]);
  }
}