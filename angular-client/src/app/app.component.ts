import { Component, HostListener } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Boilerplate';
  viewTitle = this.title;

  showUserMenu = false;

  constructor(public authService: AuthService) {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logIn(event: MouseEvent) {
    event.preventDefault();

    this.authService.logIn();
  }

  logOut(event: MouseEvent) {
    event.preventDefault();

    this.authService.logOut();
  }

  // Changes the view title when a new route is activated in router-outlet
  onActivate(event: any) {
    if (event?.title && typeof event.title === 'string') {
      this.viewTitle = event.title;
    } else {
      this.viewTitle = 'Boilerplate';
    }
  }

  // Hides the user dropdown menu if the user clicks anywhere else on the page
  @HostListener('document:click', ['$event'])
  onClick = (e: any) => {
    const clickedElement = e.target as HTMLElement;
    if (
      !clickedElement ||
      !clickedElement.parentElement ||
      clickedElement.parentElement.getAttribute('id') !== 'user-menu-button'
    ) {
      this.showUserMenu = false;
    }
  };
}
