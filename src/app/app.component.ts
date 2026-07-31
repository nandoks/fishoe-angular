import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FontAwesomeModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fishoe-angular';
}
