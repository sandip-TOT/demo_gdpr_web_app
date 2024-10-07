import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GDPRWebApp';
}
