import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { SearchListingComponent } from "./components/search-listing/search-listing.component";
 

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FontAwesomeModule, RouterOutlet, SearchListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fishoe-angular';
}
