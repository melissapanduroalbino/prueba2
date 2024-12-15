import { Component } from '@angular/core';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { HistoryDrawerComponent } from './components/history-drawer/history-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageListComponent, MessageInputComponent, HistoryDrawerComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1>Gemini Clone</h1>
      </header>

      <app-message-list></app-message-list>
      <app-message-input></app-message-input>
      <app-history-drawer></app-history-drawer>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class App {}