import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent],
  templateUrl: './root-layout.html',
})
export class RootLayout {

}
