import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout/logout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: LogoutService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
